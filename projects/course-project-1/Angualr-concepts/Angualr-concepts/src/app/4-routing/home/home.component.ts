import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthServices} from "../Auth.services";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private router: Router, private authService: AuthServices) {


  }

  ngOnInit() {
  }

  onLoadServers(id: number) {

    // complex calculation....

    this.router.navigate(
      ['/servers'],
      {
        queryParams: {allowEdit: 1},
        fragment: 'loading'
      })
  }

  onLogin() {
    this.authService.login()
  }

  onLogout() {
    this.authService.logout()
  }
}
