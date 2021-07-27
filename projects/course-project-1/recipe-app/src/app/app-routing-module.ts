import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";


const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  // lazy loading which will load recipes module on demand which part of app optimization
  // NOTE: we should delete RecipesModule from the imports in the app.module since we wil be importing it here
  {
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule),
  },
  {
    path:'shopping-list',
    loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
  },
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }

]

@NgModule({

  // preloadingStrategy:PreloadAllModules will allow to pre-load models that are loaded in the lazy mode
  // but not after the initial load during idle time so after a subsequent request  those modules will be ready
  imports: [RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules})],

  // export our configured RouterModule
  exports: [RouterModule]
})
export class AppRoutingModule {

}
