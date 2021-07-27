import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {PostModel} from "./post.model";
import {Injectable} from "@angular/core";
import {catchError, map, tap} from "rxjs/operators";
import {Subject, throwError} from "rxjs";

@Injectable()
export class PostsService {
  error = new Subject<string>()

  constructor(private http: HttpClient) {
  }

  createAndStorePost(title: string, content: string) {
    const postData: PostModel = {title: title, content: content}

    // Send Http request also must subscribe to the post() otherwise it wont get sent
    this.http.post(
      'https://ng-complete-guid-ad400-default-rtdb.firebaseio.com/posts.json',
      postData,
      {
        // observe gives us direct access to specific elements of the response such as header, body
        observe: 'response'
      }
    ).subscribe(responseData => {

        console.log(responseData.body)
      },

      // error handling after post request is sent or to be precise after the observable is returned
      (error: any) => {
        this.error.next(error)
      }
    )
  }

  /**
   * service method for fetching data
   */
  fetchPost() {

    // {[key: string]:PostModel} i passed to get to declare the type of data we are getting form the post request
    // which is key value pair of type PostModel
    return this.http.get<{ [key: string]: PostModel }>(
      'https://ng-complete-guid-ad400-default-rtdb.firebaseio.com/posts.json',
      {
        // setting headers
        headers: new HttpHeaders({"custome-header": "Hello"}),
        params: new HttpParams().set('print', 'pretty')
      }
    )

      // transforming data using Rxjs pipe operator with map
      // this allows us to change the data before reach to the subscribe stage which is last stage of our observable
      // watching over the GET request sent above
      .pipe(
        map((response) => {

          // create an empty array to hold the new formatted data since we arae getting a javascript object form Firebase
          const postsArray: PostModel[] = [];
          // loop over each object in the response object body {{}...{}}
          for (const key in response) {
            //check whether if the object has a property with the specified name.
            if (response.hasOwnProperty(key)) {
              // push a new object containing the the current object also saving the key pointing to current object as id
              postsArray.push({...response[key], id: key})
            }
          }
          // return the new array of objects which then handed over to the subscribe method as the new transformed data
          return postsArray
        }),

        // handling errors at the pipe stage after map which might handle any javascript error thrown from the code
        // above
        catchError(error => {
          return throwError(error)
        })
      );

  }

  deletePosts() {

    // return an observable to the subscriber
    return this.http.delete(
      'https://ng-complete-guid-ad400-default-rtdb.firebaseio.com/posts.json',
      {
        observe: 'events',
        // control the type of response
        responseType:'json'
      })
      .pipe(
      // tap is another rxJS operator that allows us to tap into the response without interrupt subscriber or
        // changing it unlick the map operator
      tap(event => {
          console.log(event)

          // we can access different types event data by using HttpEventType
          if (event.type === HttpEventType.Sent) {
            console.log('request was sent')
          }

          if (event.type === HttpEventType.Response) {
            console.log(event.body)
          }
        }
      ))
  }

}
