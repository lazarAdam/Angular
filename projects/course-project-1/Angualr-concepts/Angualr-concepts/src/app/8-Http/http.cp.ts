import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, catchError} from "rxjs/operators";
import {PostModel} from "./post.model";
import {PostsService} from "./posts.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-http',
  templateUrl: './http.cp.html',
  styleUrls: ['./http.cp.css']
})
export class HttpCp implements OnInit, OnDestroy {
  loadedPosts: PostModel[] = [];
  isFetching = false
  error: string | null = null
  private errorSub: Subscription

  constructor(private http: HttpClient, private postService: PostsService) {
  }

  ngOnDestroy(): void {
      this.errorSub.unsubscribe()
    }

  ngOnInit() {

    this.errorSub = this.postService.error.subscribe((error: any) => {

      this.error = error.message
    })

    this.isFetching = true
    this.postService.fetchPost().subscribe(
      (posts: PostModel[]) => {
        this.isFetching = false;
        this.loadedPosts = posts
      },

      // handling error that may result from http request
      error => {
        if (error.status === 401) {
          this.error = 'The request was denied because of unauthorized access!'
        }
      }
    )
  }

  // getting the postData from the form which has the same exact object type as PostModel
  onCreatePost(postData: PostModel) {

    this.postService.createAndStorePost(postData.title, postData.content)
  }

  onFetchPosts() {
    this.isFetching = true

    // we are subscribing to observable that Post method in fetchPost returns
    this.postService.fetchPost().subscribe(
      (posts: PostModel[]) => {
        this.isFetching = false;
        this.loadedPosts = posts
      },

      // handling error that may result from http request
      error => {
        if (error.status === 401) {
          this.error = 'The request was denied because of unauthorized access!'
        }


      }
    )
  }

  onClearPosts() {
    // Send Http request
    // we are subscribing to observable that delete method in fetchPost returns
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = []
    })
  }

  onHandleError() {

    this.isFetching = false
    this.error = null

  }
}
