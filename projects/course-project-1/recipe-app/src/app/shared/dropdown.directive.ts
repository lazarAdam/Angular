import {Directive, ElementRef, HostBinding, HostListener} from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective{



  constructor(private elRef:ElementRef) {


  }

  @HostBinding('class.open') isOpen = false;


  @HostListener('document:click',['$event']) toggleOpen(event:Event){

    // check if the nativeElement(where the directive was placed) contains the target element
    // which will be true if the target element is a direct child of the nativeElement
    this.isOpen = this.elRef.nativeElement.contains(event.target)? !this.isOpen:false

  }



}
