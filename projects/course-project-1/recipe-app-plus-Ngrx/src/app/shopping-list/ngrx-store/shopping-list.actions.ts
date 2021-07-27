import {Action} from "@ngrx/store";
import {IngredientModel} from "../../shared/ingredient.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENTS = 'UPDATE_INGREDIENTS';
export const DEL_INGREDIENTS = 'DEL_INGREDIENTS';
export const START_EDIT ='START_EDIT'
export const STOP_EDIT ='STOP_EDIT'

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public payload: IngredientModel) {
  }
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: IngredientModel[]) {
  }
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENTS;

  constructor(public payload: IngredientModel ) {
  }
}

export class DelIngredients implements Action {
  readonly type = DEL_INGREDIENTS;

}

export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: number) {
  }
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;


}


// we define our own type containing a union of types of action classes
export type ShoppingListActionsType =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DelIngredients
  | StartEdit
  | StopEdit
