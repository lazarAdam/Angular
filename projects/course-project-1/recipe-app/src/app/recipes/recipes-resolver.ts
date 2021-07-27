import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {RecipeModel} from "./recipe.model";
import {Observable} from "rxjs";
import {DataStorageService} from "../shared/data-storage.service";
import {RecipeService} from "./recipe.service";

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

  constructor(private dataStorageService:DataStorageService, private recipesService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

      const recipes = this.recipesService.getRecipes()
    if (recipes.length ===0){
      return this.dataStorageService.fetchRecipes()
    }return {
      recipes
    }



  }

}
