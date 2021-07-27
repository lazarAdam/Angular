import * as fromShoppingList from "../shopping-list/ngrx-store/shopping-list.reducer"
import * as fromAuth from "../auth/ngrx-store/auth.reducer"
import * as fromRecipes from "../recipes/ngrx-store/recipe.reducer"
import {ActionReducerMap} from "@ngrx/store";

// holds the global states of this reducer
export interface AppState {
  shoppingList: fromShoppingList.State
  auth: fromAuth.State
  recipes:fromRecipes.State
}

/**
 * a global reducer is defined here which holds all the reducers of our app
 */
export const appReducer: ActionReducerMap<AppState>={
  shoppingList:fromShoppingList.shoppingListReducer,
  auth:fromAuth.authReducer,
  recipes:fromRecipes.recipeReducer
}
