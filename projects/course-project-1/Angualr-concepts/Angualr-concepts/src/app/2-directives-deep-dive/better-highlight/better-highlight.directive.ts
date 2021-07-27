import {Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective  implements OnInit{

  //  values can be set from DOM form the dom too
  @Input() defaultColor: string = 'transparent'
  @Input() highlightedColor: string = 'blue'

  // accessing the element's DOM attributes  that is using this directive
  @HostBinding('style.backgroundColor') backgroundColor:string

  constructor(private elRef:ElementRef,private rederer: Renderer2) { }

  ngOnInit(): void {

    // this.rederer.setStyle(this.elRef.nativeElement,'background-color','blue')

    this.backgroundColor = this.defaultColor;
  }



  @HostListener('mouseenter') mouseover(eventData: Event){

    // this.rederer.setStyle(this.elRef.nativeElement,'background-color','blue')

    this.backgroundColor = this.highlightedColor
  }

  @HostListener('mouseleave') mouseLeave(eventData: Event){

    // this.rederer.setStyle(this.elRef.nativeElement,'background-color','transparent')

    this.backgroundColor = this.defaultColor
  }
}
