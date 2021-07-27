import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers', // selector based like HTML attributes best to use with components
  // selector:'.app-servers', // selector based on .class notation in css
  templateUrl:'./servers.component.html' ,
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false
  serverCreationStatus = 'No Server was Created!';
  serverName = 'test server';
  serverCreated = false
  servers = ['Testserver','Testserver2']
  constructor() {

    setTimeout(()=>{
      this.allowNewServer = true;
    },2000)
  }

  ngOnInit(): void {
  }

  onCreateServer(){
    this.serverCreated = true;
    this.serverCreationStatus = 'server was created! name is ' + this.serverName;
    this.servers.push(this.serverName);

  }

  onUpdateServerName(event: Event){

    this.serverName = (<HTMLInputElement>event.target).value
  }

}
