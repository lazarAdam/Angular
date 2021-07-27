import {Component, OnInit} from '@angular/core';
import {RecipeModel} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

  recipe: RecipeModel
  id: number
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {

   this.route.params.subscribe((params:Params)=>{

     this.id = +params['id']

     this.recipe = this.recipeService.getRecipe(this.id)

   })
  }

  onAddToShoppingList() {
    this.recipeService.addIngToShpList(this.recipe.ingredients)
  }

  onEditRecipe() {

    this.router.navigate(['edit'],{relativeTo:this.route})
    // this.router.navigate(['../',this.id],{relativeTo:this.route})
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(['/recipes'])
  }
}
