import {Component, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import * as fromApp from "../../global-ngrx-store/app.reducer"
import * as RecipesActions from '../ngrx-store/recipe.actions'
import * as ShoppingListActions from '../../shopping-list/ngrx-store/shopping-list.actions'
import {Store} from "@ngrx/store";
import {map, switchMap} from "rxjs/operators";


@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

  recipe: RecipeModel
  id: number

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit(): void {


    this.route.params.pipe(
      // get the id form the route obs and pass it to a new obs with help of switchMap
      map((params: Params) => {
        return +params['id']
      }),
      // pass the recipes store to the next map
      switchMap(id => {
        this.id = id
        return this.store.select('recipes')
      }),
      // use the passed recipes state  to find the traget recipe in recipesState.recipes
      map(recipesState => {
        return recipesState.recipes.find((recipe, index) => {
          return index === this.id
        })
      })
      // sub to the map above and set the returned recipe object
    ).subscribe(recipe => {
      this.recipe = recipe
    })
  }

  onAddToShoppingList() {

    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients))
  }

  onEditRecipe() {

    this.router.navigate(['edit'], {relativeTo: this.route})

  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipesActions.deleteRecipe(this.id))
    this.router.navigate(['/recipes'])
  }
}
