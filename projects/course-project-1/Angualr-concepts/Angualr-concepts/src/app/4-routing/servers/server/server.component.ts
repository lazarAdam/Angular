import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Data, Params, Router} from "@angular/router";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    // A resolver is being used instead of the commented code bellow
    this.route.data.subscribe(
      (data:Data)=>{
        this.server = data['server']
      }
    )

    // const id = +this.route.snapshot.params['id'];
    //
    // this.server = this.serversService.getServer(id);
    //
    // // observable for server component when the params change inside of the the same component
    // this.route.params.subscribe((param:Params)=>{
    //
    //   this.server = this.serversService.getServer(+param['id'])
    // })

    console.log('server component was loaded')
  }

  OnEdit() {

    // go the edit-server component route and preserve the query params from  the server component route
    this.router.navigate(['edit'], {relativeTo:this.route,queryParamsHandling:'preserve'})
  }
}
