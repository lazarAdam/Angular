import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";

@NgModule({

  declarations:[
    AuthComponent
  ],
  imports:[
    CommonModule,
    FormsModule,
    RouterModule.forChild(
      // using lazy loading that's why we have an empty path see app-routing-module
      [  {path:'', component:AuthComponent}]
    ),
    SharedModule
  ]
})

export class AuthModule {

}
