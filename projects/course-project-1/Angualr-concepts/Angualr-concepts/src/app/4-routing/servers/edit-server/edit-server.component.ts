import {Component, OnInit} from '@angular/core';

import {ServersService} from '../servers.service';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CanDeactivateGuard} from "./can-deactivate-guard.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanDeactivateGuard {
  server: { id: number, name: string, status: string };

  // inputs accessed on the template via two-way binding
  serverName = '';
  serverStatus = '';
  // flags
  allowEdit = false;
  changesSaved = false

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router:Router
  ) {
  }

  ngOnInit() {

    console.log('server-edit component was loaded')

    // get and log the queryParams and fragment values form the rout's snapshot
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);

    // subscribe to the observable of queryParams and fragment in case the path changed inside the component
    // and we want to update some data in the component
    // very similar logic can be found in  edit-server.component.ts
    this.route.queryParams.subscribe((pa: Params) => {
      this.allowEdit = pa['allowEdit'] === '1'?true:false;

    })
    this.route.fragment.subscribe(() => {
    })

     // + will convert the id from string to a number
    const id = this.route.snapshot.params['id']

    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.allowEdit){
      return true
    }

    if((this.serverName !== this.server.name || this.serverStatus !== this.server.status)
    &&
      (!this.changesSaved)){

      return confirm('Do u want to discard the changes?')

    }else{
      return true
    }
  }


}
