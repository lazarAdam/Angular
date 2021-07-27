import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import { AuthService} from "./auth.service";
import { Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AlertCp} from "../shared/alert/alert.cp";
import {PlaceHolderDirective} from "../shared/placeholde/placeHolderDirective";
import {Store} from "@ngrx/store";
import * as fromApp from "../global-ngrx-store/app.reducer"
import * as AuthAction from "./ngrx-store/auth.actions"

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html'
})
export class AuthComponent implements OnDestroy, OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null
  // access ng-template which has PlaceHolder directive on it then store the directive reference in the the var alertHost
  @ViewChild(PlaceHolderDirective, {static: true}) alertHost: PlaceHolderDirective

  private closeSub: Subscription
  private  storeSub: Subscription

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFacRes: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {

  }




  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe()
    }
    this.storeSub.unsubscribe()
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(formRef: NgForm) {

    if (!formRef.valid) {
      return
    }
    const email = formRef.value.email;
    const password = formRef.value.pass




    // check first if we are in sign up mode before calling signup
    if (this.isLoginMode) {

      // set the authObs to the observable returned from login() and signup()
      // authObs = this.authService.login(email, password)

      // dispatch loginStart action, this will kick in the auth effect but it wont return an observable
      // we must sub to the store inside ngOnInit to listen to changes
      this.store.dispatch(new AuthAction.loginStart(
        {email: email, password: password}
      ))
    } else {

     this.store.dispatch(new AuthAction.signupStart({
       email:email,
       password:password
     }))

    }

    formRef.reset()
  }



  onHandleError() {
    this.store.dispatch(new AuthAction.clearError())
  }

  private showErrorAlert(message: string) {

    const alertCmpFactory = this.componentFacRes.resolveComponentFactory(AlertCp)

    // extract the reference to viewContRef through alertHost which is the directive used in the ng-template we
    // added in auth component template
    const hostViewContainerRef = this.alertHost.viewContRef
    // clear the template
    hostViewContainerRef.clear()

    // create a component passing the  alertCmpFactory
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory)

    // setting the properties and  calling methods in the AlertCp
    componentRef.instance.message = message
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe()
      hostViewContainerRef.clear()
      this.onHandleError()

    })

  }



  ngOnInit(): void {
    // after side effects are done and the store has been changed the sub will kick in
    this.storeSub= this.store.select('auth').subscribe(authState=>{
      this.isLoading = authState.loading
      this.error = authState.authError
      if (this.error){
        this.showErrorAlert(this.error)
      }
    })

  }
}
