import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {exhaustMap, map, take} from "rxjs/operators";
import {UserModel} from "./user.model";
import * as fromApp from "../global-ngrx-store/app.reducer"
import {Store} from "@ngrx/store";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store:Store<fromApp.AppState>
  ) {}



  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {


    // here we are using and interceptor service which will add the firebase user token to any outgoing route
    // note  this.authService.user is set to return null as an initial value if it was never called


    // using store here to get current state of the user object
    return this.store.select('auth').pipe(
      take(1),
      map((authState)=>{
        return authState.user
      }),
      exhaustMap(
        (userObject: UserModel) => {


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
