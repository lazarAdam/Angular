import {Component} from '@angular/core';
import {trigger, state, style, transition, animate, keyframes, group} from "@angular/animations";

@Component({
  selector: 'app-animations',
  templateUrl: './animation.cp.html',
  animations: [
    trigger('divState', [
      state('normal', style(
        {
          'background-color': 'red',
          transform: 'translateX(0)'
        }
      )),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(100px)'
      })),

      transition('normal<=>highlighted', animate(300)),
      // transition('highlighted=>normal',animate(800))
    ]),

    trigger('wildState', [
      state('normal', style(
        {
          'background-color': 'red',
          transform: 'translateX(0) scale(1)'
        }
      )),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrink', style({
        'background-color': 'green',
        transform: 'translateX(0px) scale(0.5)'
      })),

      transition('normal=>highlighted', animate(300)),
      transition('highlighted=>normal', animate(800)),
      transition('shrink <=> *',[
        style({
          'background-color':'orange'
        }),
        animate(1000, style({
          'background-color':'black'
        })),
        animate(500)
      ]),
    ]),
    trigger('list1', [
      state('in', style(
        {
          opacity:1,
          transform: 'translateX(0)'
        }
      )),
      transition('void => *', [
        style({
          opacity:0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),
      // void is reserved for elements that were not rendered when Angular was initialized, and it can be used
      // to animate newly added elements to DOM [* => void] stands for any state to the state of new added elements
      transition('* => void', [
        animate(300, style({
            transform: 'translateX(100px)',
            opacity:0
          }))
      ]),

    ]),
    trigger('list2', [
      state('in', style(
        {
          opacity:1,
          transform: 'translateX(0)'
        }
      )),
      transition('void => *', [
        animate(1000,keyframes([
          style({
            transform: 'translateX(-100px)',
            opacity:0,
            offset:0
          }),
          style({
            transform: 'translateX(-50px)',
            opacity:.05,
            offset:.3
          }),
          style({
            transform: 'translateX(-20px)',
            opacity:1,
            offset:0.8

          }),
          style({
            transform: 'translateX(0px)',
            opacity:1,
            offset:1

          })
        ]))
      ]),

      transition('* => void', [
        // grouping animation to make them occur at the same time
        group([
          animate(300,style({
            color:'red'
          })),
          animate(800, style({
            transform: 'translateX(100px)',
            opacity:0
          }))
        ])

      ])

    ])
  ],

})
export class AnimationCp {

  state = 'normal'
  list = ['Milk', 'Sugar', 'Bread'];
  wildState = 'normal';

  onAdd(item) {
    this.list.push(item);
  }

  onShrink() {

    this.wildState = 'shrink'
  }

  onAnimate() {
    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal'
    this.wildState === 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal'
  }

  onDelete(item) {
    this.list.splice(item,1)
  }

  animStarted(event: Event) {
    console.log(event)
  }

  animEnded(event: Event) {
    console.log(event)
  }
}
