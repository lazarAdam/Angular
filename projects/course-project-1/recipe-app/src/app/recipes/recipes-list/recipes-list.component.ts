import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {


  recipes: RecipeModel[] = [];
  eventSub : Subscription

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {


  }

  ngOnInit(): void {

    this.eventSub = this.recipeService.recipesChanged.subscribe(
      (recipes: RecipeModel[])=>{
        this.recipes = recipes
      }
    )
    this.recipes = this.recipeService.getRecipes()

  }

  onNewRecipe() {

    this.router.navigate(['new'],{relativeTo:this.route})

  }

  ngOnDestroy(): void {

    this.eventSub.unsubscribe()

  }
}
