import {Component, Input,} from '@angular/core';
import {LoggingService} from "../logging.service";
import {AccountService} from "../account.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [LoggingService]
})
export class AccountComponent {
  @Input() account: { name: string, status: string };
  @Input() id: number;



  // typeScript shorthand of creating and instantiating a property

  constructor( private loggingService: LoggingService,private accountsService: AccountService) {

    this.loggingService = new LoggingService()
  }


  onSetTo(status: string) {
    this.accountsService.updateAccount(this.id,status)
    // this.loggingService.logStatusChange(status)

    this.accountsService.statusUpdated.emit(status)
  }
}
