import {Action} from "@ngrx/store";
import {RecipeModel} from "../recipe.model";

export const SET_RECIPES = 'SET_RECIPES'
export const FETCH_RECIPES = 'FETCH_RECIPES'
export const ADD_RECIPE = 'ADD_RECIPE'
export const DELETE_RECIPE = 'DELETE_RECIPE'
export const UPDATE_RECIPE = 'UPDATE_RECIPE'
export const STORE_RECIPES = 'STORE_RECIPES'


export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: RecipeModel[]) {
  }

}

export class fetchRecipes implements Action {
  readonly type = FETCH_RECIPES;

}

export class addRecipes implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: RecipeModel) {
  }
}

export class deleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) {
  }
}


export class updateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: { index: number, newRecipe:RecipeModel }) {
  }
}

export class storeRecipes implements Action {
  readonly type = STORE_RECIPES;


}


export type RecipesActionsTypes =
  | SetRecipes
  | fetchRecipes
  | addRecipes
  | deleteRecipe
  | updateRecipe
  |storeRecipes
