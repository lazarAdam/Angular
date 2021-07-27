/**
 * This is the Ngrx Store containing the reducer and the data
 *
 * WATCH video 363 'Important Note on Actions' from section 24
 */

import {IngredientModel} from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";
import {Action} from "@ngrx/store";



export interface State {
  ingredients: IngredientModel[],
  editedIngredient: IngredientModel,
  editedIngredientIndex: number

}

const initialState: State = {

  ingredients: [
    new IngredientModel('Apples', 5),
    new IngredientModel('tomatoes', 5)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1

}

/**
 *
 * @param state
 * @param action
 */
export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActionsType
) {

  switch (action.type) {

    case ShoppingListActions.ADD_INGREDIENT:

      // return a new state since we MUST NOT mutate the old state
      return {
        // copy the old state object
        ...state,
        // adding to the old state object
        ingredients: [
          // copy the  old property ingredients on the old state
          ...state.ingredients,
          // action  contains the action type and the payload which is the data to be added
          action.payload

        ]
      }
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [
          // copy the original array
          ...state.ingredients,
          // add the elements in the array in payload to the elements in the original array
          ...action.payload
        ]
      }

    case ShoppingListActions.UPDATE_INGREDIENTS:

      const ingredient = state.ingredients[state.editedIngredientIndex]

      // this will result into the new updated object
      const updatedIngredient = {
        // copy of the original object
        ...ingredient,
        // updated object
        ...action.payload
      }
      // copy of the Ingredients
      const updatedIngredients = [...state.ingredients]
      // replace the old ingredient object with the new updated one
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient


      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient:null,
      };

    case ShoppingListActions.DEL_INGREDIENTS:


      return {
        ...state,
        ingredients: state.ingredients.filter((ig, index) => {
          return index !== state.editedIngredientIndex
        })
      };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,

        editedIngredient: {
          ...state.ingredients[action.payload]
        }
      }
    case ShoppingListActions.STOP_EDIT:

      return {
        ...state,
        editedIngredient:null,
        editedIngredientIndex:-1
      }

    default:
      // by default we return the original state if no action was matched above
      // this the action that gets sent by ngrx when app initializes
      return state

  }

}
