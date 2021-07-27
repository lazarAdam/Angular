import {RecipeModel} from "./recipe.model";
import {Injectable} from '@angular/core'
import {IngredientModel} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping.list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService {

  private recipes: RecipeModel[] = []
  recipesChanged = new Subject<RecipeModel[]>()

  // private recipes: RecipeModel[] = [
  //   // new RecipeModel(
  //   //   'Avocado omelet',
  //   //   'tasty Avocado omelet recipe ',
  //   //   'https://www.simplyrecipes.com/thmb/RUyN7O2JwQZze14Jzj6C65eFiNs=/3000x2000/filters:fill(auto,1)/Simply-Recipes-Chilaquiles-LEAD-4-4d958c229da9459c935577d31779d6fa.jpg',
  //   //   [
  //   //     new IngredientModel('eggs', 3),
  //   //     new IngredientModel('avocado', 1)
  //   //   ]
  //   // ),
  //   // new RecipeModel(
  //   //   'Xl burger',
  //   //   'extra large burger recipe',
  //   //   'https://images.immediate.co.uk/production/volatile/sites/2/2015/08/12812.jpg?quality=45&resize=620,413',
  //   //   [
  //   //     new IngredientModel('buns', 2),
  //   //     new IngredientModel('meat patties', 2)
  //   //   ]
  //   // ),
  // ];


  constructor(private slService: ShoppingListService) {
  }

  // this does only return a copy of the array not a pointer to it using slice. Hence enforcing proper encapsulation
  getRecipes(): RecipeModel[] {
    return this.recipes.slice();
  }

  addIngToShpList(ingredients: IngredientModel[]) {
    this.slService.addIngredients(ingredients)

  }

  getRecipe(index: number) {
    return this.recipes[index]


  }

  addRecipe(recipe: RecipeModel) {
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: RecipeModel) {

    this.recipes[index] = newRecipe
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: RecipeModel[]) {
    this.recipes = recipes
    this.recipesChanged.next(this.recipes.slice())
  }
}
