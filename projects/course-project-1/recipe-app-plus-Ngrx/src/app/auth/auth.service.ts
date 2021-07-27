import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromAPP from "../global-ngrx-store/app.reducer"
import * as AuthActions from "./ngrx-store/auth.actions"

/**
 * This interface defines the object structure  returned form the Firebase sing up and login api requests
 */
export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
  registered?: boolean
}

@Injectable()
/**
 * this service class used to sing in an sing up user in the through firebase authentication API
 */
export class AuthService {


  private tokenExpirationTimer: any

  constructor(private store: Store<fromAPP.AppState>) {}


  setLogoutTimer(expirationDuration: number) {

    // cal the logout method after timeout reaches the set time
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout())
    }, expirationDuration)
  }

  clearLogoutTimer(){
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
      this.tokenExpirationTimer= null;
    }
  }
}
