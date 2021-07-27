import {NgModule} from "@angular/core";
import {LoadingSpinnerCp} from "./loading-spinner/locading-spinner.cp";
import {AlertCp} from "./alert/alert.cp";
import {PlaceHolderDirective} from "./placeholde/placeHolderDirective";
import {DropdownDirective} from "./dropdown.directive";
import {CommonModule} from "@angular/common";

@NgModule({

  declarations:[
    LoadingSpinnerCp,
    AlertCp,
    PlaceHolderDirective,
    DropdownDirective,
  ],
  imports:[
    CommonModule
  ],

  exports:[
    LoadingSpinnerCp,
    AlertCp,
    PlaceHolderDirective,
    DropdownDirective,
    CommonModule
  ]

})
export class SharedModule{

}
