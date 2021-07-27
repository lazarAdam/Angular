import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipeModel} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";
import {exhaustMap, map, take, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";
import {UserModel} from "../auth/user.model";

@Injectable()
export class DataStorageService {

  constructor(private http: HttpClient, private recipesService: RecipeService, private authService: AuthService) {
  }


  storeRecipes() {

    const recipes = this.recipesService.getRecipes()
    this.http.put(
      'https://ng-course-recipe-book-4474e-default-rtdb.firebaseio.com/recipes.json',
      recipes
    ).subscribe((resp) => {
      console.log(resp)
    })
  }

  fetchRecipes() {


    // return an an observable after all the bellow code in pipe is done which is the observable returned.
    // The calling method must subscribe to get the observable
    return this.http.get<RecipeModel[]>(
      'https://ng-course-recipe-book-4474e-default-rtdb.firebaseio.com/recipes.json'

    ).pipe(
      map((recipes) => {


        // map here is not the same method used with pipe this the native Js map function
        // which will create a new array of recipes where each recipe is an object where we check if
        // it has the property  ingredients which is an [] if so just add the same array otherwise add a new property
        // and set the value to an empty  array {...recipe} is a spread operator that adds new properties after ...
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
        })


      }),
      //after map is done transforming the response  run tap passing the result of map
      // and set the recipes in the recipesService

      tap((recipes) => {

        this.recipesService.setRecipes(recipes)
      })
    )
  }
}
