import {Action} from "@ngrx/store";


export const AUTH_SUCCESS = '[AUTH] AUTH_SUCCESS'
export const AUTH_FAIL = '[AUTH] AUTH_FAIL'
export const LOGIN_START = '[AUTH] LOGIN_START'
export const SIGNUP_START = '[AUTH] SIGNUP_START'
export const LOGOUT = '[AUTH] LOGOUT'
export const CLEAR_ERROR = '[AUTH] CLEAR_ERROR'
export const AUTO_LOGIN = '[AUTH] AUTO_LOGIN'
/***
 * each or the actions bellow will get handled by the reducers of this app,
 * passing the action type and the payload data definition
 */
export class authSuccess implements Action {
  readonly type = AUTH_SUCCESS;

  constructor(
    public payload: {
      email: string,
      userId: string,
      token: string,
      expiresIn: Date
      redirect:boolean
    }
  ) {
  }
}

export class Logout implements Action {
  readonly type = LOGOUT;

}


export class loginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string, password: string }) {
  }

}

export class authFail implements Action {
  readonly type = AUTH_FAIL;

  constructor(public payload:string) {
  }
}


export class signupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload:{ email: string, password: string }) {
  }
}

export class clearError implements Action {
  readonly type = CLEAR_ERROR;


}

export class autoLogin implements Action {
  readonly type = AUTO_LOGIN  ;


}


export type AuthActions = authSuccess | Logout | loginStart | authFail | signupStart |clearError|autoLogin
