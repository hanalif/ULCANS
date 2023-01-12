import { trigger, state, style, transition, animate } from '@angular/animations';

export const Animations = {
  slidesDownAnimation: trigger('slidesDownAnimation',[
    transition(':enter', [
      style({
        'max-height': '0px'

      }),
      animate('300ms', style({
        'max-height': '300px'
      }))
    ]),
    transition(':leave',[
      style({
        'max-height': '300px'
      }),
      animate('300ms', style({
        'max-height': '0px'
      }))
    ])
  ]),

  slidesFromLeft: trigger('slidesFromLeft',[
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }),
      animate('200ms', style({
        opacity: 1,
        transform: 'translateX(0)'
      }))
    ]),
    transition(':leave',[
      style({
        opacity: 1,
        transform: 'translateX(0)'
      }),
      animate('200ms', style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }))
    ])
  ]),

}
