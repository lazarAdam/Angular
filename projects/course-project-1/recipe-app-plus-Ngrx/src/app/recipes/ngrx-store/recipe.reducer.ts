import {RecipeModel} from "../recipe.model";
import * as RecipesActions from "./recipe.actions"

export interface State {
  recipes: RecipeModel[]
}

const initialState: State = {
  recipes: []
}

export function recipeReducer(state = initialState, action: RecipesActions.RecipesActionsTypes) {

  switch (action.type) {

    case "SET_RECIPES":

      return {
        ...state,
        recipes: [
          ...action.payload
        ]
      }

    case "ADD_RECIPE":

      return {
        ...state,
        recipes: [
          ...state.recipes,
          action.payload
        ]
      }

    case "UPDATE_RECIPE":

      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe
      }
      const updatedRecipes = [...state.recipes,]

      updatedRecipes[action.payload.index] = updatedRecipe

      return {
        ...state,
        recipes: updatedRecipes

      }
    case "DELETE_RECIPE":

      return {
        ...state,
        recipes: state.recipes.filter((rec, index) => {

          return index !== action.payload
        })
      }

    default:
      return state
  }
}
