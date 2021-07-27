import {Component, OnInit} from '@angular/core';
import {AccountService} from "./account.service";

@Component({
  selector: 'appServiceAndDi',
  templateUrl: './service.and.di.cp.html',
  styleUrls: ['./service.and.di.cp.css'],
  providers:[]
})
export class ServiceAndDiCp implements OnInit{


  accounts : {name:string,status:string}[] = []

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {

    this.accounts = this.accountService.accounts
  }

}
