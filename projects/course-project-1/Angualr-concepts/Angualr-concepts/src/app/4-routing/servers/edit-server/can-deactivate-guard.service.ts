import {Observable} from "rxjs";
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from "@angular/router";

export interface CanComponentDeactivate{

  canDeactivate:()=>Observable<boolean> | Promise<boolean> | boolean;
}



// this class is a guard and it implements the Angular CanDeactivate which executes before leaving a route
// CanDeactivate  takes our CanComponentDeactivate interface as type argument
//  CanDeactivateGuard will enforce any component that is implanting  it to write an implementation of canDeactivate()
// with our canDeactivate defined in CanComponentDeactivate
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate>{

  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return component.canDeactivate()
  }
}
