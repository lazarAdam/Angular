import {Component, OnDestroy, OnInit} from '@angular/core';
import {IngredientModel} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping.list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: IngredientModel[] = []

  private igChangeSub: Subscription

  constructor(private slService: ShoppingListService) {
  }

  ngOnInit(): void {

    this.ingredients = this.slService.getIngredients()

    this.igChangeSub = this.slService.ingredientsChanged.subscribe((ingredients: IngredientModel[]) => {

      this.ingredients = ingredients
    })
  }

  ngOnDestroy(): void {

    this.igChangeSub.unsubscribe();
  }


  onEditItem(index: number) {

    this.slService.startedEditing.next(index)
  }
}
