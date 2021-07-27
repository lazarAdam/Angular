import { Component } from '@angular/core';
import {dashCaseToCamelCase} from "@angular/compiler/src/util";

@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.cp.html',
  styleUrls: ['./pipes.cp.css']
})
export class PipesCp {


  servers = [
    {
      instanceType: 'medium',
      name: 'Production Server',
      status: 'stable',
      started: new Date()
    },
    {
      instanceType: 'large',
      name: 'User Database',
      status: 'stable',
      started: new Date( )
    },
    {
      instanceType: 'small',
      name: 'Development Server',
      status: 'offline',
      started: new Date()
    },
    {
      instanceType: 'small',
      name: 'Testing Environment Server',
      status: 'stable',
      started: new Date()
    }
  ];
  filteredStatus = '';

  // this will be used to demonstrate how pipes handle async data such as Promises
  status = new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve('stable')
    },2000)
  })

  getStatusClasses(server: {instanceType: string, name: string, status: string, started: Date}) {
    return {
      // ternary statements in the form of an object  with each case returning a class string

      'list-group-item-success': server.status === 'stable',
      'list-group-item-warning': server.status === 'offline',
      'list-group-item-danger': server.status === 'critical'
    };
  }

  onAddServer() {
    this.servers.push({
      instanceType: 'small',
      name:'new server',
      status:'stable',
      started: new Date()
    })
  }
}
