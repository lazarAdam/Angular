import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeModel} from "../recipe.model";
import * as fromApp from "../../global-ngrx-store/app.reducer"
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import * as RecipesActions from '../ngrx-store/recipe.actions'
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})


export class RecipeEditComponent implements OnInit, OnDestroy {

  id: number;
  editMode = false
  recipeForm: FormGroup

  storeSub: Subscription


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.editMode = params['id'] ? true : false;
      this.initForm()

    })
  }

  private initForm() {

    let recipeName = ''
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([])

    if (this.editMode) {
      // const recipe = this.recipeService.getRecipe(this.id);

      this.storeSub = this.store.select('recipes').pipe(
        map(recipesState => {
          return recipesState.recipes.find((rec, index) => {
            return index === this.id
          })
        })
      ).subscribe((recipe) => {


        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;

        if (recipe['ingredients']) {
          for (let ingr of recipe.ingredients) {

            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ingr.name, Validators.required),
                'amount': new FormControl(ingr.amount, [
                  Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            )
          }
        }
      })
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSubmit() {

    const newRecipe = new RecipeModel(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    )

    if (this.editMode) {

      // this.recipeService.updateRecipe(this.id, newRecipe)

      this.store.dispatch(new RecipesActions.updateRecipe(
        {index: this.id, newRecipe: newRecipe}
      ))

    } else {
      // this.recipeService.addRecipe(newRecipe)
      this.store.dispatch(new RecipesActions.addRecipes(newRecipe))
    }
    this.onCancel()
  }


  get Controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {

    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
      ]),
    }))

  }

  onCancel() {

    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  ngOnDestroy(): void {

    if (this.storeSub){
      this.storeSub.unsubscribe()
    }

  }
}

