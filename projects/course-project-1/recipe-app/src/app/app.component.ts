import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{

  title: string = 'recipe-app';

  loadedFeature: string = 'recipe';


  constructor(private authServer:AuthService) {
  }
  ngOnInit(): void {

    // call autologin when the app start
    this.authServer.autoLogin()
  }

}
