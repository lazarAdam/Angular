import {
  AfterContentChecked,
  AfterContentInit, AfterViewChecked, AfterViewInit,
  Component, ContentChild,
  DoCheck, ElementRef,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  SimpleChanges, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {viewClassName} from "@angular/compiler";

@Component({
  selector: './app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  // watch view escalation videos in section 5
  encapsulation: ViewEncapsulation.Emulated // none // native
})
export class ServerElementComponent implements OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked ,
  OnDestroy
{


  @Input('srvElement') element: {
    type: string,
    name: string,
    content: string
  };

  @Input() name: string

  // DOM elements are accessed in the this component HTML template
  @ViewChild('heading',{static:true}) header:ElementRef

  // DOM elements of a child template using <ng-comp><ng-comp>  and project content through <ng-content></ng-content>
  // can be accessed via ContentChild
  @ContentChild('contentParagraph',{static:true}) paragraph: ElementRef

  constructor() {

    console.log('constructor called')
  }


  ngOnChanges(changes: SimpleChanges) {

    console.log('ngOnChanges called')
    console.log(changes)
  }

  ngOnInit(): void {

    console.log('ngOnInit called')
    console.log(this.header.nativeElement.textContent)
    console.log('text content of paragraph' + this.paragraph.nativeElement.textContent)
  }

  ngDoCheck() {

    console.log('ngDoCheck called')

  }

  //  gets called after content gets projected from
  //  the parent component which is app.component to this component's HTML template using  <ng-content></ng-content>
  ngAfterContentInit(): void {

    console.log('ngAfterContentInit called')
    console.log('text content of paragraph' + this.paragraph.nativeElement.textContent)
  }

  ngAfterContentChecked(): void {

    console.log('ngAfterContentChecked called')
  }

  //  gets called after the template view is initialized
  ngAfterViewInit() {

    console.log('ngAfterViewInit called')
    console.log(this.header.nativeElement.textContent)
  }

  ngAfterViewChecked() {

    console.log('ngAfterViewChecked called')
  }

  ngOnDestroy() {
    console.log('ngOnDestroy called')
  }

}
