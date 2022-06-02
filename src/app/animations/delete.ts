import { animate, animateChild, query, sequence, state, style, transition, trigger } from '@angular/animations'

export const deleteAnimation = trigger('delete', [
  state('animate', style({ opacity: 0.2 })),
  transition('* => animate', [
    sequence([
      query('.transaction-content', [animate('300ms ease-out', style({ opacity: 0.2 }))]),
      query('.deleteButton', [
        style({ transform: '', opacity: 0 }),
        animate(
          '200ms ease-out',
          style({
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: 1,
          })
        ),
        style({ opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }),
      ]),
    ]),
  ]),
  // transition('animate => *', [animate('300ms ease-out', style({ opacity: 1 }))]),

  transition('animate => deleted', [
    sequence([animate('300ms ease-out', style({ transform: 'translateX(100%)' }))]),
    animate('300ms ease-out', style({ transform: 'scale(0)' })),
  ]),
])
