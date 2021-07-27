/**
 * This the auth reducer containing a reducer function and the data store
 *
 * ngrx will call all the reducers when the app initializes
 //sending one action to each reducer which is the default action we handle at each of the reducer's switch statement
 * * WATCH video 363 'Important Note on Actions' from section 24
 */
import {UserModel} from "../user.model";
import {Action} from "@ngrx/store";
import * as AuthAction from "./auth.actions";


export interface State {
  user: UserModel
  authError: string
  loading: boolean
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
}

export function authReducer(state: State = initialState, action: AuthAction.AuthActions) {



  switch (action.type) {

    case AuthAction.AUTH_SUCCESS:

      const newUser = new UserModel(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expiresIn,
      );

      return {
        ...state,
        authError: null,
        user: newUser,
        loading: false
      }


    case AuthAction.LOGOUT:

      return {
        ...state,
        user: null
      }


    case AuthAction.LOGIN_START:
    case AuthAction.SIGNUP_START:

      return {
        ...state,
        authError: null,
        loading: true,
      }


    case AuthAction.AUTH_FAIL:

      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      }

    case AuthAction.CLEAR_ERROR:

      return {
        ...state,
        authError: null
      }



    // by default we return the original state if no action was matched above
    // this the action that gets sent by ngrx when app initializes
    // also when we dispatch an action somewhere in the app since ngrx dispatcher sends the action to all the reducers
    // so if an action doesn't match in case above we still need to return the current unchanged state
    default:
      return state;
  }

}
