import { animate, animateChild, query, sequence, style, transition, trigger } from '@angular/animations'

export const fadeAnimation = trigger('fade', [
  transition(':enter', [
    sequence([
      style({ opacity: 0 }),
      animate('250ms ease-out', style({ opacity: 1 })),
      query('@scale', [animateChild()], { optional: true }),
    ]),
  ]),
  transition(':leave', [animate('200ms ease-in', style({ opacity: 0, height: 0 }))]),
])
