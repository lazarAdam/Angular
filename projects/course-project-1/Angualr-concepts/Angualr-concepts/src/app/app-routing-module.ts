import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./4-routing/home/home.component";
import {UsersComponent} from "./4-routing/users/users.component";
import {UserComponent} from "./4-routing/users/user/user.component";
import {ServersComponent} from "./4-routing/servers/servers.component";
import {ServerComponent} from "./4-routing/servers/server/server.component";
import {EditServerComponent} from "./4-routing/servers/edit-server/edit-server.component";
import {PageNotFoundComponent} from "./4-routing/page-not-found/page-not-found.component";
import {NgModule} from "@angular/core";
import {AuthGuard} from "./4-routing/auth.guard";
import {CanDeactivateGuard} from "./4-routing/servers/edit-server/can-deactivate-guard.service";
import {ErrorPageComponent} from "./4-routing/error-page/error-page.component";
import {ServerResolver} from "./4-routing/servers/server/server-resolver";
import {HomeComponentObsr} from "./5-Observables/home/home.component";
import {UserComponentObsr} from "./5-Observables/user/user.component";


const appRoutes: Routes = [

  //ROUTING SECTION PATHS
  {path: '', component: HomeComponent},
  {
    path: 'users', component: UsersComponent, children: [
      {path: ':id/:name', component: UserComponent},
    ]
  },

  // nested server route each of the nested components will be loaded once their respective route path is accessed
  {
    path: 'servers',
    // canActivate: [AuthGuard],
    canActivateChild:[AuthGuard],
    component: ServersComponent,
    children: [
      {path: ':id', component: ServerComponent,resolve:{server:ServerResolver}},
      {path: ':id/edit', component: EditServerComponent, canDeactivate:[CanDeactivateGuard]}
    ]
  },

  // OBSERVABLES SECTION PATHS
  {path: 'obsr', component: HomeComponentObsr},
  {path: 'obsr/user/:id', component: UserComponentObsr},



  // {path: '404', component: PageNotFoundComponent},
  {path: '404', component: ErrorPageComponent, data:{message:'Page not Found!'}},
  // the generic route that covers all the cases that doesn't match the defined path
  // note always list it at very bottom appRoutes array
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [

    // register the routes in RouterModule, a Angular routing module
    // RouterModule.forRoot(appRoutes,{useHash:true})
    // useHash is used in case a webserver cannot return index.html when it hits a 404 this will happen
    // because the hosting webserver won't recognize any routes defied by Angular since that is the front-end only
    RouterModule.forRoot(appRoutes,{useHash:false})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
