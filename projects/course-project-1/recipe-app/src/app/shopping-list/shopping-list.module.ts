import {NgModule} from "@angular/core";
import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports:[

    SharedModule,
    FormsModule,
    RouterModule.forChild([
      // lazy loading is used here that why we have empty path
      {path: '', component: ShoppingListComponent},
    ])
    // no need to export RouterModule since we are using the shopping-list route here at shopping-list module and not
    // in a different routing module in separate .ts file like its done in recipes feature
  ]
})
export class ShoppingListModule {

}
