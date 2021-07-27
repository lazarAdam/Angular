import {Actions, Effect, ofType} from "@ngrx/effects";
import * as AuthActions from './auth.actions'
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {of, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {UserModel} from "../user.model";
import {AuthService} from "../auth.service";
import {environment} from '../../../environments/environment'


/**
 * this is class that where we handle all the side effects of the app such as Http request and local storage and such
 * this effect class will be called whenever we dispatch any action
 * we use  ofType(AuthActions.LOGIN_START) for example to respond to a specific action
 * WATCH 364 from section 24 for more details
 * also https://ngrx.io/guide/effects
 */


/**
 * This interface defines the object structure  returned form the Firebase sing up and login api requests
 */
export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
  registered?: boolean
}


const handleAuth = (expiresIn: number, email: string, userId: string, token: string) => {

  // expiration date converted to ms
  const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));


  const newUser = new UserModel(email, userId, token, expirationDate)

  // save the user data into the local storage for persistent login
  localStorage.setItem('userData', JSON.stringify(newUser))


  // as seen here the effect dispatches the action for us we just need to call  AuthActions.authSuccess which
  // an action and return it to effect where this function was called from
  return new AuthActions.authSuccess({
    email: email,
    userId: userId,
    token: token,
    expiresIn: expirationDate,
    redirect:true
  })
}


const handleError = (errorResp) => {

  // initialize error to a generic error
  let errorMessage = " An error occurred!"

  // throw the generic error if the response error object doesn't have .error or .error.error properties
  if (!errorResp.error || !errorResp.error.error) {

    // notice we can't use catchError() as that would terminate the effect instead we use of which
    // dispatch an action and returns an observable
    return of(new AuthActions.authFail(errorMessage))
  }

  // otherwise use a switch statement to extract the error form the response and throw it
  switch (errorResp.error.error.message) {
    case 'EMAIL_EXISTS':

      errorMessage = 'This email already exists'
      break;

    case 'EMAIL_NOT_FOUND':
      errorMessage = 'Invalid email!'
      break
    case 'INVALID_PASSWORD':
      errorMessage = 'Invalid password!'
      break
  }

  // notice we can't use catchError() as that would terminate the effect instead we use of which
  // dispatch an action and returns an observable
  return of(
    new AuthActions.authFail(errorMessage)
  )
}

@Injectable()
export class AuthEffects {



  // actions will contain all the actions dispatched form the app
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}


  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.signupStart) => {


      return this.http.post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.fireBase}`,
        {
          email: signupAction.payload.email,
          password: signupAction.payload.password,
          returnSecureToken: true
        }
      ).pipe(
        tap((respData)=>{
          this.authService.setLogoutTimer(+respData.expiresIn*1000)
        }),
        map((respData: AuthResponseData) => {

          return handleAuth(+respData.expiresIn, respData.email, respData.localId, respData.idToken)
        }),
        (catchError(errorResp => {
          return handleError(errorResp)
        })),
      )
    })
  )

  //(Watch video 366 for clarification)
  // use pipe which atomically sub for an observable
  @Effect()
  authLogin$ = this.actions$.pipe(
    //1.filter actions using ofType operator this effects will kick in on this action when any dispatcher is called
    ofType(AuthActions.LOGIN_START),
    // 2. use switch map to make an http request which returns an new observable
    switchMap((authData: AuthActions.loginStart) => {
      return this.http.post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.fireBase}`,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }
        // now we must add an inner pipe which is a observable in order to catch errors from the post above
        // we can't just add catchError() in the outer pipe because that would terminate the life cycle of the outer
        // observable which returned in the outer pipe (Watch video 366)
      ).pipe(

        tap((respData)=>{
          this.authService.setLogoutTimer(+respData.expiresIn*1000)
        }),
        map((respData: AuthResponseData) => {

          return handleAuth(+respData.expiresIn, respData.email, respData.localId, respData.idToken)
        }),
        (catchError(errorResp => {
          return handleError(errorResp)
        })),
      )
    })
  );

  @Effect({dispatch: false})

  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTH_SUCCESS),
    tap((AuthSuccessAction:AuthActions.authSuccess) => {
      if(AuthSuccessAction.payload.redirect){
        this.router.navigate(['/'])
      }


    })
  )

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(()=>{
      this.authService.clearLogoutTimer()
      localStorage.removeItem('userData');
      this.router.navigate(['/auth'])
    })
  )

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(()=>{
      const userData: {
        email: string,
        id: string,
        _token: string,
        _tokenExpirationDate: Date
      }
        = JSON.parse(localStorage.getItem('userData'))

      // check if there is a localstorage of the userData first if not return an action with type:dummy
      if (!userData) {

        // returning
        return {type:'DUMMY'}
        // otherwise create the a UserModel object form the data we got in the localstorage
      } else {
        const loadedUser = new UserModel(userData.email, userData.id, userData._token, userData._tokenExpirationDate)
        // check if the user has a valid token using get token
        if (loadedUser.token) {

          // this is sets the time left for the session to expire
          // new Date(userData._tokenExpirationDate).getTime() converts the firebase expiration time in ms
          // minus the current time gives us the time left
          const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
          this.authService.setLogoutTimer(expirationDuration)

          // as seen here the effect dispatches the action for us we just need to call  AuthActions.authSuccess which
          // an action
          return new AuthActions.authSuccess(
            {
              email: loadedUser.email,
              userId: loadedUser.id,
              token: loadedUser.token,
              expiresIn: new Date(userData._tokenExpirationDate),
              redirect:false


            }
          )
          // // this is sets the time left for the session to expire
          // // new Date(userData._tokenExpirationDate).getTime() converts the firebase expiration time in ms
          // // minus the current time gives us the time left
          // const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
          //
          //
          // // start the logout timer
          // this.autoLogout(expirationDuration)

        }

        return {
          type:'Dummy'
        }
      }
    })
  )

}


