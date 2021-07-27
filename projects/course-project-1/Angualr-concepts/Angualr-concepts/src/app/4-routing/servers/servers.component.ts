import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  public servers: {id: number, name: string, status: string}[] = [];

  constructor(
    private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {

    // relativeTo and ActivatedRoute will set the active route path so that we can set to what servers is
    // relative to
    this.router.navigate(['./',{relativeTo:this.route}])


  }
}
