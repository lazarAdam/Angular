import {Component, EventEmitter, OnDestroy, OnInit, Output} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {UserModel} from "../auth/user.model";
import {Store} from "@ngrx/store";
import * as fromApp from "../global-ngrx-store/app.reducer";
import * as AuthAction from "../auth/ngrx-store/auth.actions"
import * as RecipesActions from '../recipes/ngrx-store/recipe.actions'
import {map} from "rxjs/operators";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(

    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {
  }

  private userSub: Subscription
  isAuthenticated = false

  @Output() featureSelected = new EventEmitter<string>();

  onSelect(feature: string) {

    this.featureSelected.emit(feature)
  }

  onSaveData() {

    this.store.dispatch(new RecipesActions.storeRecipes())
  }

  onFetchData() {
    // this.dataStorageService.fetchRecipes().subscribe()

    this.store.dispatch(new RecipesActions.fetchRecipes())
  }

  ngOnInit(): void {

    //1. user the store to select the auth store
    // 2. use pipe with map to return the user object from the auth state
    // 3. subscribe to the observable returned from pipe


    this.userSub = this.store.select('auth').pipe(
      (map(authState => {

        return authState.user
      })))
      .subscribe((userObject: UserModel) => {

      this.isAuthenticated = !userObject ? false : true

    })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

  onLogout() {
    // this.authService.logout()

    this.store.dispatch(new AuthAction.Logout())
  }
}
