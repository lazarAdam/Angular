import {Component, OnInit,Inject,PLATFORM_ID} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import * as fromAPP from "./global-ngrx-store/app.reducer";
import * as AuthActions from "./auth/ngrx-store/auth.actions"
import {Store} from "@ngrx/store";
import {isPlatformBrowser} from "@angular/common";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{

  title: string = 'recipe-app';

  loadedFeature: string = 'recipe';


  constructor(
    private authServer:AuthService,
    private store: Store<fromAPP.AppState>,
    @Inject(PLATFORM_ID) private platform
  ) {
  }
  ngOnInit(): void {


    // this tells the server when using  angular universal SSR which platform this code is running on
    // server or on browser
    if (isPlatformBrowser(PLATFORM_ID)){
      // call autologin when the app start
      this.store.dispatch(new AuthActions.autoLogin())
    }

    console.log('app is running')




  }

}
