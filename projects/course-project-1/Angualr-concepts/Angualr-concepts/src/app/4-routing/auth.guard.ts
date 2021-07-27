import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthServices} from "./Auth.services";

@Injectable()

// this guard will be executed first before loading a route that is using it
// this guard must be added to route in the routing module in order to be utilized
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthServices, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    return this.authService.isAuthenticated().then(
      (authnticated: boolean) => {

        if (authnticated) {
          return true;
        } else {
          this.router.navigate(['']);
        }

      }
    )
  }

  // canActivateChild will activate with child routes only not the main route. must be added to
  // the route as  canActivateChild:[AuthGuard] in the routing module in order to be utilized
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // just reuse the canActivate by calling it form here instead of rewriting the same logic
    return this.canActivate(route,state);
  }
}
