import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {exhaustMap, take} from "rxjs/operators";
import {UserModel} from "./user.model";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }



  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {


    // here we are using and interceptor service which will add the firebase user token to any outgoing route
    // note  this.authService.user is set to return null as an initial value if it was never called

    // DETAILS IN ORDER inside the  pipe()
    // 1. take() will take the last emitted object of BehaviorSubject observable which return a userModel object
    // 2. exhaust Map will wait for the first observable in take() to return take its emitted value and then unsubscribe
    // 3. in the next step exhaustMap will assign the next observable to final returned observable at the bottom
    // inside  of  the function in exhaustMap
    //So this basically we creating a chain of observables, utilizing then and finally returning one last observable


    return this.authService.user.pipe(
      take(1),
      exhaustMap(
        (userObject: UserModel) => {
          
          //  this.authService.user is BehaviorSubject and has an initial value  set to null
          // this.authService.user will have a value other then null only when .next() is called
          // which happens when handleAuthentication(after a login or a signup) is called so we must check first if there is a userObject
          // otherwise don't modify the request

          if (!userObject) {
            return next.handle(req);
          }

          // modify the request by adding the token
          const modifiedReq = req.clone(
            {params: new HttpParams().set('auth', userObject.token)}
          );

          // return the modified request
          return next.handle(modifiedReq);
        })
    );


  }

}
