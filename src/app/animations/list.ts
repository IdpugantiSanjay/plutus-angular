import { animate, query, stagger, style, transition, trigger } from '@angular/animations'

export const listAnimation = trigger('list', [
  transition(':enter', [
    query(':enter', [style({ opacity: 0, transform: 'scale(0)' }), stagger(300, [animate('0.3s', style({ opacity: 1, transform: 'scale(1)' }))])]),
  ]),
])


