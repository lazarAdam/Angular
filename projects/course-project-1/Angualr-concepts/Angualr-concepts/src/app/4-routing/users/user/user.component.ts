import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  //
  private paramsSubscription: Subscription

  user: {id: number, name: string};

  constructor(private route: ActivatedRoute) { }

  // called after the component gets initialized and have interpolated, and input on
  // the template available which are not when the constructor() is called
  ngOnInit() {

    this.user= {
      id: this.route.snapshot.params['id'],
      name:this.route.snapshot.params['name']
    }

    // watches for changes in the current route of this component and fires when the path has been changed
    // the approach on top wont work because Angular by default wont reload the component if we are on the same
    // component even if the path  gets changed inside the component for example having a <a [routerLink] = '...'><a/>
    // this.route.params.subscribe is a solution to this case
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params)=>{
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    );
  }

  ngOnDestroy(): void {

    // when this component  is destroyed unsubscribe from the observable (Angular does this for us this just for
    // demonstration )
    this.paramsSubscription.unsubscribe()
  }

}
