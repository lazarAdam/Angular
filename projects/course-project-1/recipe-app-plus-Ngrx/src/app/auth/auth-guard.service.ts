import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {map, take} from "rxjs/operators";
import {UserModel} from "./user.model";
import {Store} from "@ngrx/store";
import * as fromApp from "../global-ngrx-store/app.reducer";

@Injectable()
/**
 * this route guard protects routes that utilize it
 */
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {
  }

  // this will check before going to a protected rout if the user is logged and must return a boolean value or UrlTree
  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // accessing the user BehaviorSubject and using map the determine the boolean value that it should be returned
    // we use take(1) to only take the latest object returned UserObject and unsubscribe so that we dont' have
    // an ongoing subscription  for this auth guard unless we access this guard again
    return this.store.select('auth').pipe(
      take(1),

      // we first map the user object from the auth state to the next map function
      map(authState => {

        return authState.user
      }),
      // then handle the user object from the auth state
      map((userObject: UserModel) => {

        // save the boolean value
        const isAuth = userObject ? true : false

        // return true of the user is logged in
        if (isAuth) {
          return true
        } else {
          // other wise redirect he user using UrlTree
          return this.router.createUrlTree(['/auth'])
        }


      })
    )

  }

}
