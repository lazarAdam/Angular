import {Component, OnDestroy, OnInit} from '@angular/core';
import {IngredientModel} from "../shared/ingredient.model";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from '../global-ngrx-store/app.reducer'
import * as ShoppingListActions from './ngrx-store/shopping-list.actions'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ingredients: IngredientModel[]}>

  private igChangeSub: Subscription

  constructor(
    // define the type of store which we named shoppingList as we setup in the app.module in the import of StoreModule
    // and it has an object with a property named ingredients of type IngredientModel[]
    private store:Store<fromApp.AppState>
  ) {
  }

  ngOnInit(): void {

    // select the shopping list slice of the global store
    // and set the ingredients = to the ingredients returned from the shoppingList reducer
    this.ingredients = this.store.select('shoppingList')

    // We can subscribe to shoppingList after selecting it since its an observable now
    // added just as a note we dont need it here
    // this.store.select('shoppingList').subscribe()


    // OLD CODE
    // this.ingredients = this.slService.getIngredients()
    //
    // this.igChangeSub = this.slService.ingredientsChanged.subscribe((ingredients: IngredientModel[]) => {
    //
    //   this.ingredients = ingredients
    // })
  }

  ngOnDestroy(): void {


    // ngrx does manage observables on it own no need to this here
    // this.igChangeSub.unsubscribe();
  }


  onEditItem(index: number) {

    // this.slService.startedEditing.next(index)

    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }
}
