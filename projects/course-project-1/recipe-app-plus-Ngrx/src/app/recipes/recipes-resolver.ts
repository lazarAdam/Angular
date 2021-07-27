import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";

import {Observable, of} from "rxjs";

import * as RecipesActions from '../recipes/ngrx-store/recipe.actions'
import * as fromApp from "../global-ngrx-store/app.reducer"
import {Store} from "@ngrx/store";

import {Actions, ofType} from "@ngrx/effects";
import {map, switchMap, take} from "rxjs/operators";

@Injectable()

/**
 * This is resolver guard is used in case we access a route the needs to fetch data before loading it's component
 * for example  accessing  http://localhost:4200/recipes/2/edit will require data to be fetched otherwise the
 *  recipes component will fail. The resolver is perfect solution since it will run before a route is accessed and
 *  the component is executed. Here we can instruct the resolve() methode to fetch data for us using
 *  dataStorageService.fetchRecipes() call. Notice that we dont subscribe to fetchRecipes angular already
 *  does that for us when using resolve
 */
export class RecipesResolverService implements Resolve<any> {

  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


    return  this.store.select('recipes').pipe(
      take(1),
      map((recipeState)=>{
        return recipeState.recipes
      }),
      switchMap((recipes)=>{
        if (recipes.length ===0){
          this.store.dispatch(new RecipesActions.fetchRecipes())

          return this.actions$.pipe(
            ofType(RecipesActions.SET_RECIPES),
            take(1)
          )
        }else{
          return of(recipes)
        }
      })
    )


  }

}
