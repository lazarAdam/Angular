import {IngredientModel} from "../shared/ingredient.model";
import {Subject} from "rxjs";


export class ShoppingListService {

  ingredientsChanged = new Subject<IngredientModel[]>()
  startedEditing = new Subject<number>()

  private ingredients: IngredientModel[] = [
    new IngredientModel('Apples', 5),
    new IngredientModel('tomatoes', 5)
  ]


  getIngredients(): IngredientModel[] {


    return this.ingredients.slice()

  }

  addIngredient(ing: IngredientModel) {
    this.ingredients.push(ing)
    // return an updated copy of the ingredients array after adding a new ingredient
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  addIngredients(ingredients: IngredientModel[]) {

    // using array spread operator [...]+[....]
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  getIngredient(index: number){

    return this.ingredients[index]
  }
  updateIngredient(index: number, newIngredient: IngredientModel){

    this.ingredients[index] = newIngredient
    this.ingredientsChanged.next(this.ingredients.slice())

  }

  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice())
  }
}
