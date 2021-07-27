import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {IngredientModel} from "../../shared/ingredient.model";

import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from "../ngrx-store/shopping-list.actions";
import * as fromApp from '../../global-ngrx-store/app.reducer'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('formRef', {static: false}) slForm: NgForm

  sub: Subscription
  editMode = false;
  editedItem: IngredientModel


  constructor(

    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit(): void {


   this.sub= this.store.select('shoppingList').subscribe(
      stateData => {
        if (stateData.editedIngredientIndex > -1) {

          this.editMode = true
          this.editedItem = stateData.editedIngredient
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })

        } else {

          this.editMode = false
        }
      }
    )

  }

  onSubmitItem(form: NgForm) {


    const newIngredient = new IngredientModel(
      form.value.name,
      form.value.amount
    )

    if (this.editMode) {
      // this.slService.updateIngredient(
      //   this.editedItemIndex,
      //   newIngredient
      // )

      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient( newIngredient)
      )

    } else {

      // this.slService.addIngredient(newIngredient)
      // with NgRx we are using dispatch of our store and passing new action object of AddIngredient
      // passing the newIngredient as payload data (watch section 24 video 351)
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
    }

    this.editMode = false
    this.slForm.reset()

  }

  ngOnDestroy(): void {

    this.sub.unsubscribe()
    this.store.dispatch(new ShoppingListActions.StopEdit())
  }

  onClear() {
    this.slForm.reset()
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit())
  }

  onDelete() {

    // this.slService.deleteIngredient(this.editedItemIndex)
    this.store.dispatch(new ShoppingListActions.DelIngredients())
    this.onClear()

  }
}
