import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {


  // appUnless() will be called when the DOM input value changes
  @Input() set appUnless(condition: boolean){

    if(!condition){

      this.vcRef.createEmbeddedView(this.templateRef)

      console.log(this.templateRef)

    }else {
      this.vcRef.clear()

    }
  }
  constructor( private templateRef: TemplateRef<any>,private vcRef: ViewContainerRef) {

  }

}
