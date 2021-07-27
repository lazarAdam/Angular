import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector:'app-alert',
  templateUrl:'./alert.cp.html',
  styleUrls:['./alert.cp.css']
})
export class AlertCp{
 @Input() message: string;
 @Output() close = new EventEmitter<void>();


  onClose() {

    this.close.emit()
  }
}
