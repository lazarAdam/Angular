import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

/**
 * This service class  implements  intercept a function that is used to intercept any http
 * request before leaving the client
 */
export class LogginInterceptorService implements HttpInterceptor {


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    console.log('Out going request')
    console.log(req.url)


    return next.handle(req).pipe(tap(
      (event) => {

        if (event.type === HttpEventType.Response) {
          console.log('incomming response')
          console.log(event.body)
        }
      }
    ))
  }


}

