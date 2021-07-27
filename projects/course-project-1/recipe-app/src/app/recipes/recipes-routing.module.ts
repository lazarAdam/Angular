import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../auth/auth-guard.service";
import {RecipesComponent} from "./recipes.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipesDetailComponent} from "./recipes-detail/recipes-detail.component";
import {RecipesResolverService} from "./recipes-resolver";

const routes: Routes = [
  {
    canActivate:[AuthGuard],
    path: '', component: RecipesComponent, children:
      [
        // in lazy Loading we replace '/recipe' with '' since the route moved to the app-routing-module
        // where it is included there. See the app-routing-module for details
        {path: '', component: RecipeStartComponent},
        {path: 'new', component: RecipeEditComponent},
        {path: ':id', component: RecipesDetailComponent,resolve:[RecipesResolverService]},

        {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}
      ]
  },
]

@NgModule({

  imports:[RouterModule.forChild(routes)],

  // this will be imported in the recipes module as RecipesRoutingModule
  exports:[RouterModule]
})

export class RecipesRoutingModule{

 }
