import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ComponentsAndDatabindingCp} from "./1-components-and-databinding/components-and-databinding.cp";
import {DirectivesDeepDiveCp} from "./2-directives-deep-dive/directives-deep-dive.cp";
import {CockpitComponent} from "./1-components-and-databinding/cockpit/cockpit.component";
import {ServerElementComponent} from "./1-components-and-databinding/server-element/server-element.component";
import {BasicHighlightDirective} from "./2-directives-deep-dive/basic-highlight/basic-highlight.directive";
import {BetterHighlightDirective} from './2-directives-deep-dive/better-highlight/better-highlight.directive';
import {UnlessDirective} from './2-directives-deep-dive/unless-directive/unless.directive';
import {ServiceAndDiCp} from "./3-services-and-dependency-injection/service.and.di.cp";
import {NewAccountComponent} from "./3-services-and-dependency-injection/new-account/new-account.component";
import {AccountComponent} from "./3-services-and-dependency-injection/account/account.component";
import {AccountService} from "./3-services-and-dependency-injection/account.service";
import {LoggingService} from "./3-services-and-dependency-injection/logging.service";
import {RoutingCp} from "./4-routing/routing.cp";
import {UsersComponent} from "./4-routing/users/users.component";
import {ServersService} from "./4-routing/servers/servers.service";
import {ServersComponent} from "./4-routing/servers/servers.component";
import {ServerComponent} from "./4-routing/servers/server/server.component";
import {EditServerComponent} from "./4-routing/servers/edit-server/edit-server.component";
import {HomeComponent} from "./4-routing/home/home.component";
import {UserComponent} from "./4-routing/users/user/user.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {PageNotFoundComponent} from './4-routing/page-not-found/page-not-found.component';
import {AppRoutingModule} from "./app-routing-module";
import {AuthGuard} from "./4-routing/auth.guard";
import {AuthServices} from "./4-routing/Auth.services";
import {CanDeactivateGuard} from "./4-routing/servers/edit-server/can-deactivate-guard.service";
import {ErrorPageComponent} from './4-routing/error-page/error-page.component';
import {ServerResolver} from "./4-routing/servers/server/server-resolver";
import {AppComponent} from "./app.component";
import {Observables} from "./5-Observables/observable.cp";
import {HomeComponentObsr} from "./5-Observables/home/home.component";
import {UserComponentObsr} from "./5-Observables/user/user.component";
import {UserService} from "./5-Observables/user.service";
import {FormsCp} from "./6-forms/forms.cp";
import {ReactiveFormsCp} from "./6-forms/reactive-form/reactive-forms.cp";
import {PipesCp} from "./7-pipes/pipes.cp";
import {ShortenPipe} from "./7-pipes/shorten.pipe";
import { FilterPipe } from './7-pipes/filter.pipe';
import {HttpCp} from "./8-Http/http.cp";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {PostsService} from "./8-Http/posts.service";
import {AuthInterceptorService} from "./8-Http/auth.interceptor.service";
import {LogginInterceptorService} from "./8-Http/loggin.interceptor.service";
import {AnimationCp} from "./9-animations/animation.cp";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [

    AppComponent,

    ComponentsAndDatabindingCp,
    CockpitComponent,
    ServerElementComponent,

    DirectivesDeepDiveCp,
    BasicHighlightDirective,
    BetterHighlightDirective,
    UnlessDirective,

    ServiceAndDiCp,
    NewAccountComponent,
    AccountComponent,


    RoutingCp,
    UsersComponent,
    UserComponent,
    ServersComponent,
    ServerComponent,
    EditServerComponent,
    HomeComponent,
    PageNotFoundComponent,
    ErrorPageComponent,

    Observables,
    HomeComponentObsr,
    UserComponentObsr,

    FormsCp,
    ReactiveFormsCp,

    PipesCp,
    ShortenPipe,
    FilterPipe,

    HttpCp,

    AnimationCp


  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule

  ],
  providers: [
    AccountService,
    LoggingService,
    ServersService,
    AuthGuard,
    AuthServices,
    CanDeactivateGuard,
    ServerResolver,
    PostsService,
    UserService,
    // we can define a type of services such as HTTP_INTERCEPTORS and provide them
    // ORDER MATTERS TO WHICH INTERCEPTOR EXECUTES FIRST
    {provide: HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true},
    {provide: HTTP_INTERCEPTORS,useClass:LogginInterceptorService,multi:true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
