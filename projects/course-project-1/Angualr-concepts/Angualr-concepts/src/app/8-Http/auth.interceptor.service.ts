import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

/**
 * This service class  implements  intercept a function that is used to intercept any http
 * request before leaving the client
 */
export class AuthInterceptorService implements HttpInterceptor {


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    console.log('Request is on it\'s way')
    // we can modify the request by first creating a clone of it
    // and append to headers
    const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')})
    //  then send the new request using HttpHandler
    return next.handle(modifiedRequest).pipe(
      // here we are interacting  with ht response instead of the request  by tapping into handle which returns
      // and observable
      tap((event) => {

        if (event.type === HttpEventType.Response){
          console.log(`Response Arrived-- Body`)
          console.log(event.body)
        }
      }));
  }

}

