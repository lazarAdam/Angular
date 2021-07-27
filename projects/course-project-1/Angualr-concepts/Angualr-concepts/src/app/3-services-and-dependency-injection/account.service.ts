import {LoggingService} from "./logging.service";
import {Injectable,EventEmitter} from "@angular/core";

// allows other services to be injected into this service
@Injectable()
export class AccountService {


  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  constructor(private loggingService: LoggingService) {
  }

  statusUpdated = new EventEmitter<string>();

  addAccount(name: string, status: string) {

    this.accounts.push({name: name, status: status});

    this.loggingService.logStatusChange(status)

  }

  updateAccount(id: number, status: string) {
    this.accounts[id].status = status;

    this.loggingService.logStatusChange(status)
  }
}
