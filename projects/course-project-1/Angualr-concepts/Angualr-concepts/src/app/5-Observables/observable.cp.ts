import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-Observables',
  templateUrl: './observable.cp.html',
  styleUrls: ['./observable.cp.css']
})
export class Observables implements OnInit, OnDestroy {
  userActivated = false;
  activateSub:Subscription
  constructor( private userService: UserService) {}

  ngOnInit() {


    this.activateSub = this.userService.activatedEmitter.subscribe((didActivate: boolean)=>{

      this.userActivated = didActivate
    })

  }

  ngOnDestroy(): void {

    this.activateSub.unsubscribe()
  }
}
