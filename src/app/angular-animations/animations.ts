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
  ])
}
