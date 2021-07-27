import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {ServersService} from "../servers.service";
import {Injectable} from "@angular/core";


interface Server {
  id: number,
  name: string,
  status: string

}

/**
 * This is a resolver service that implements the Angular interface Resolve. the implemented resolve method
 * will be executed before a route is loaded, given this resolver was added to a route in the app-routing-module
 * as {path: .... , resolve:{server:ServerResolver}}
 */

// injecting the ServersService which gets a server by id
@Injectable()
export class ServerResolver implements Resolve<Server> {

  constructor(private serverService:ServersService)  {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Server> | Promise<Server> | Server {
    // get and return the server using serverService and extracting the id form the route object
    // route.params['id] will work because we already added this ServerResolver service to the route hence
    // we have access to route params via ActivatedRouteSnapshot
    return this.serverService.getServer(+route.params['id'])
  }
}
