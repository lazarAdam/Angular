import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs"
import {UserModel} from "./user.model";
import {Router} from "@angular/router";
import {environment} from '../../environments/environment'

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

@Injectable()
/**
 * this service class used to sing in an sing up user in the through firebase authentication API
 */
export class AuthService {



  // this similar to Subject with difference that it gives access to the previous emitted value
  // even the subscriber didn't subscribe at the time next was called which makes it possible
  // to have multiple subscribers to same BehaviorSubject and have access to the previous emitted value in our
  // case a UserModel object long after it was emitted
  user = new BehaviorSubject<UserModel>(null)

  private tokenExpirationTimer: any


  constructor(private http: HttpClient, private router: Router) {
  }

  /**
   *  signup a user using http client and send a post request to the firebase auth api
   *  returns an observable which can be subscribed to
   * @param email
   * @param password
   */
  signup(email: String, password: string): Observable<any> {


    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FireBaseApikey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(respData => {

        // tap to the observable of signup and handle authentication
        this.handleAuthentication(respData.email, respData.localId, respData.idToken, +respData.expiresIn)
      }))
  }

  login(email: string, password: string) {

    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FireBaseApikey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(respData => {
        // tap to the observable of signup and handle authentication passing the response data from firebase
        this.handleAuthentication(respData.email, respData.localId, respData.idToken, +respData.expiresIn)
      })
    )

  }

  /**
   *  Handles the authentication of a user after login or signup
   * @param email
   * @param userId
   * @param token
   * @param expiresIn
   * @private
   */
  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {

    // expiration date converted to ms
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));

    const newUser = new UserModel(email, userId, token, expirationDate);

    //  emit an observable of type Subject informing the subscriber
    //  a new user  object was created and passing the created UserModel object
    this.user.next(newUser)
    // save the user data into the local storage for persistent login
    localStorage.setItem('userData', JSON.stringify(newUser))

    // start the session timer in ms by using firebase property named expiresIn which is in seconds but we multiply
    // by 1000 to convert to ms
    this.autoLogout(expiresIn*1000)

  }

  // this is a callback method for handling errors thrown from the login or sign up function, triggered from
  // the pipe function which uses catchError operator which then call this method passing the HttpErrorResponse
  private handleError(errorResp: HttpErrorResponse) {


    // initialize error to a generic error
    let errorMessage = " An error occurred!"

    // throw the generic error if the response error object doesn't have .error or .error.error properties
    if (!errorResp.error || !errorResp.error.error) {
      return throwError(errorMessage)
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

    return throwError(errorMessage)
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: Date
    }
      = JSON.parse(localStorage.getItem('userData'))

    // check if there is a localstorage of the userData first if not return
    if (!userData) {
      return
      // otherwise create the a UserModel object form the data we got in the localstorage
    } else {
      const loadedUser = new UserModel(userData.email, userData.id, userData._token, userData._tokenExpirationDate)
        // check if the user has a valid token using get token
      if (loadedUser.token){
        this.user.next(loadedUser)
        // this is sets the time left for the session to expire
        // new Date(userData._tokenExpirationDate).getTime() converts the firebase expiration time in ms
        // minus the current time gives us the time left
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()


        // start the logout timer
        this.autoLogout(expirationDuration)

      }
    }
  }



  logout() {

    // set the this.authService.user to null which  will trigger the subscribers
    //
    this.user.next(null);

    // clear local storage
    localStorage.removeItem('userData')

    // check if there is an ongoing tokenExpirationTimer clear it if  true
    if (this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }
    // redirect the user to auth
    this.router.navigate(['/auth'])

  }

  autoLogout(expirationDuration:number){

    // cal the logout method after timeout reaches the set time
   this.tokenExpirationTimer = setTimeout(()=>{
     this.logout()
   },expirationDuration)
  }
}
