import {NgModule} from '@angular/core';
import {StoreModule} from "@ngrx/store";
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HeaderComponent} from "./header/header.component";
import {AppRoutingModule} from "./app-routing-module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RecipesResolverService} from "./recipes/recipes-resolver";
import {AuthService} from "./auth/auth.service";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import {AuthGuard} from "./auth/auth-guard.service";
import {SharedModule} from "./shared/shared.module";
import * as fromApp from  "./global-ngrx-store/app.reducer"
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "./auth/ngrx-store/auth.effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {RecipeEffects} from "./recipes/ngrx-store/recipe.effects";




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    // we define the store which contain the reducers  used for each store
    // NOTE:by defining the global store of reducers ngrx will call all the reducers when the app initializes
    //sending one action to each reducer which is the default action we handle at each of the reducer's switch statement
    // WATCH video 363 'Important Note on Actions' from section 24
    StoreModule.forRoot(fromApp.appReducer),

    // register the effects classes
    EffectsModule.forRoot([
      AuthEffects,
      RecipeEffects
    ]),

    // this is for redux dev tool in the browser
    StoreDevtoolsModule.instrument({logOnly:environment.production}),
    StoreRouterConnectingModule.forRoot(),

  ],
  providers: [
    RecipesResolverService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
