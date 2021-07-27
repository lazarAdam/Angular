import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {IngredientModel} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping.list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('formRef',{static:false}) slForm:NgForm

  sub: Subscription
  editMode= false;
  editedItemIndex: number
  editedItem: IngredientModel


  constructor(private slService: ShoppingListService) {
  }

  ngOnInit(): void {

    this.sub = this.slService.startedEditing.subscribe(
      (index: number) => {

        this.editedItemIndex = index
        this.editMode = true
        this.editedItem = this.slService.getIngredient(index)

        this.slForm.setValue({
          name: this.editedItem.name,
          amount:this.editedItem.amount
        })
    })
  }

  onSubmitItem(form: NgForm) {


    const newIngredient = new IngredientModel(
      form.value.name,
      form.value.amount
    )

    if (this.editMode){
      this.slService.updateIngredient(
        this.editedItemIndex,
        newIngredient
      )
    }else{

      this.slService.addIngredient(newIngredient)
    }

    this.editMode = false
    this.slForm.reset()

  }

  ngOnDestroy(): void {

    this.sub.unsubscribe()
  }

  onClear() {
    this.slForm.reset()
    this.editMode = false
  }

  onDelete() {

    this.slService.deleteIngredient(this.editedItemIndex)
    this.onClear()

  }
}
