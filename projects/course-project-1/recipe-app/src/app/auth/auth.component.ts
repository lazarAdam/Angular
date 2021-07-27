import {Component, ComponentFactoryResolver, OnDestroy, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AlertCp} from "../shared/alert/alert.cp";
import {PlaceHolderDirective} from "../shared/placeholde/placeHolderDirective";

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html'
})
export class AuthComponent  implements OnDestroy{
  isLoginMode = true;
  isLoading = false;
  error: string = null
 // access ng-template which has PlaceHolder directive on it then store the directive reference in the the var alertHost
  @ViewChild(PlaceHolderDirective,{static:true}) alertHost: PlaceHolderDirective

  private closeSub:Subscription

  constructor(
    private authService: AuthService,
    private router:Router,
    private componentFacRes:ComponentFactoryResolver
  ) {

  }

  ngOnDestroy(): void {
      if(this.closeSub){
        this.closeSub.unsubscribe()
      }
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
    let authObs: Observable<AuthResponseData>

    this.isLoading = true

    // check first if we are in sign up mode before calling signup
    if (this.isLoginMode) {

      // set the authObs to the observable returned from login() and signup()
      authObs = this.authService.login(email, password)
    } else {

      authObs = this.authService.signup(email, password)


    }

    // subscribe to the observable  that was set by login or signup methods
    authObs.subscribe(
      (responseData) => {
        console.log(responseData)
        this.isLoading = false
        this.router.navigate(['/recipes'])
      },
      // catch errors thrown form the called signup() or login methods. See the auth.service for more details
      errorMessage => {
        console.log(errorMessage)
        this.isLoading = false
        this.error = errorMessage
        this.showErrorAlert(errorMessage)
      }
    )

    formRef.reset()
  }

  onHandleError() {
    this.error = null
  }

  private showErrorAlert(message:string){

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
    this.closeSub = componentRef.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe()
      hostViewContainerRef.clear()
      this.onHandleError()
    })

  }
}
