import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
  selector:'[appPlaceholder]'
})
export class PlaceHolderDirective {

  // expose the ViewContainerRef for components outside
  constructor(public viewContRef:ViewContainerRef) {
  }
}
