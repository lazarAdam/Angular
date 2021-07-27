import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {map, take} from "rxjs/operators";
import {UserModel} from "./user.model";

@Injectable()
/**
 * this route guard protects routes that utilize it
 */
export class AuthGuard implements CanActivate{

  constructor(private authService:AuthService, private router: Router) {
  }

  // this will check before going to a protected rout if the user is logged and must return a boolean value or UrlTree
  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean|UrlTree> | Promise<boolean|UrlTree > | boolean|UrlTree  {

    // accessing the user BehaviorSubject and using map the determine the boolean value that it should be returned
    // we use take(1) to only take the latest object returned UserObject and unsubscribe so that we dont' have
    // an ongoing subscription  for this auth guard unless we access this guard again
    return this.authService.user.pipe(
      take(1),
      map((userObject:UserModel)=>{

        // save the boolean value
        const isAuth = userObject? true:false

        // return true of the user is logged in
        if (isAuth){
          return true
        }else{
          // other wise redirect he user using UrlTree
          return this.router.createUrlTree(['/auth'])
        }


      })
    )

  }

}
