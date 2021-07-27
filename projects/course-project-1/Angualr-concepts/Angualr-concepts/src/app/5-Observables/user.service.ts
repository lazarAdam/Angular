import {Injectable, EventEmitter} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class UserService {

  // activatedEmitter = new EventEmitter<boolean>()
  activatedEmitter = new Subject<boolean>();

}
