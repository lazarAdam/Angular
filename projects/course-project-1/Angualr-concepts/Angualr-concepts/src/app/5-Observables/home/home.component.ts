import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs'
import {map, filter} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponentObsr implements OnInit, OnDestroy {
  private firstObsSub: Subscription

  constructor() {
  }

  ngOnInit() {

    // this.firstObsSub = interval(1000).subscribe(count=>{
    //    console.log(count)
    //  })

    /**
     * A custom build Observable
     *
     * Observer will act as callback function which can be subscribed to
     */
    const customIntrObsr = Observable.create((observer) => {
      let count = 0
      // here we will control what the observer with a setInterval called every 1s
      setInterval(() => {

        // move the next count number using the observer.next
        observer.next(count);

        // complete the observable when the count reaches 3
        if (count === 3) {
          observer.complete()
        }

        // throw an error if the count passes 5
        if (count > 5) {
          observer.error(new Error('count is greater than 3!'))
        }
        count++;
      }, 1000)
    });





    // subscribe and store the subscription object after transforming it using RXJS map operator with .pipe()
    this.firstObsSub = customIntrObsr.pipe(map((data: number) => {
      return 'Round' + (data + 1);
    }),
      filter((data)=>{
        return data>0
      })
      )
      .subscribe(
      // log the data emitted form the observer
      data => {
        console.log(data)
      },

      // handle errors thrown from the observer
      error => {
        console.log(error.message)

      },

      // handle the completion of the observer
      () => {
        console.log('completed!')
      }
    )
  }

  // destroy the observable when the component is destroyed
  ngOnDestroy(): void {

    this.firstObsSub.unsubscribe()
  }

}
