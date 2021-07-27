import { Component } from '@angular/core';
import {AccountService} from "./3-services-and-dependency-injection/account.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[]
})
export class AppComponent {
  title = 'Angualr-concepts';
}
