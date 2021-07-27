import {Component, EventEmitter, OnDestroy, OnInit, Output} from "@angular/core";
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {UserModel} from "../auth/user.model";



@Component({
  selector:'app-header' ,
  templateUrl:'./header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{

  constructor(private dataStorageService:DataStorageService, private authService:AuthService) {
  }

  private userSub: Subscription
  isAuthenticated=false

  @Output()featureSelected = new EventEmitter<string>();

  onSelect(feature:string){

    this.featureSelected.emit(feature)
  }

  onSaveData() {
  this.dataStorageService.storeRecipes()
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe()
  }

  ngOnInit(): void {
    // subscribe to the user BehaviorSubject and set the the isAuthenticated  when this.authService.user changes
   this.userSub = this.authService.user.subscribe((userObject:UserModel)=>{

     this.isAuthenticated = !userObject? false:true

   })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

  onLogout() {
    this.authService.logout()
  }
}
