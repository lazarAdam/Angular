import {Actions, Effect, ofType} from "@ngrx/effects";
import * as RecipesActions from './recipe.actions'
import {map, switchMap, withLatestFrom} from "rxjs/operators";
import {RecipeModel} from "../recipe.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import * as fromApp from "../../global-ngrx-store/app.reducer"
import {Store} from "@ngrx/store";

@Injectable()
export class RecipeEffects {

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {


      // return an an observable after all the bellow code in pipe is done which is the observable returned.
      // The calling method must subscribe to get the observable or use pipe
      return this.http.get<RecipeModel[]>(
        'https://ng-course-recipe-book-4474e-default-rtdb.firebaseio.com/recipes.json'
      )
    }),
    map((recipes) => {


      // map here is not the same method used with pipe this the native Js map function
      // which will create a new array of recipes where each recipe is an object where we check if
      // it has the property  ingredients which is an [] if so just add the same array otherwise add a new property
      // and set the value to an empty  array {...recipe} is a spread operator that adds new properties after ...
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
      })
    }),
    map(recipes => {
      return new RecipesActions.SetRecipes(recipes)
    })
  )

  @Effect({dispatch:false})
  storeRecipes = this.actions$.pipe(
    (ofType(RecipesActions.STORE_RECIPES)),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {

      return this.http.put(
        'https://ng-course-recipe-book-4474e-default-rtdb.firebaseio.com/recipes.json',
        recipesState.recipes
      )

      }
    )
  )


  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {

  }
}
