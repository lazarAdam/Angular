import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import * as fromApp from "../../global-ngrx-store/app.reducer"
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {


  recipes: RecipeModel[] = [];
  eventSub: Subscription

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {


  }

  ngOnInit(): void {

    this.eventSub = this.store.select('recipes')
      .pipe(
        map((recipesState) => {

          return recipesState.recipes

        }))
      .subscribe(
        (recipes: RecipeModel[]) => {
          this.recipes = recipes
        }
      )

  }

  onNewRecipe() {

    this.router.navigate(['new'], {relativeTo: this.route})

  }

  ngOnDestroy(): void {

    this.eventSub.unsubscribe()

  }
}
