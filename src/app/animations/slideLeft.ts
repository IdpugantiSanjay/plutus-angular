import { animate, animateChild, sequence, state, style, transition, trigger } from '@angular/animations'
//
// export const slideLeftAnimation = trigger('slideLeft', [
//   state('animate', style({ opacity: 1, transform: 'translate(-50%, -50%) scale(1)' })),
//   // state('animate', style({ transform: 'translate(-50%, -50%) scale(1)', opacity: 1 })),
//   transition('* => animate', [
//     style({ transform: '', opacity: 0 }),
//     animate(
//       '200ms ease-out',
//       style({
//         transform: 'translate(-50%, -50%) scale(1)',
//         opacity: 1,
//       })
//     ),
//   ]),
// ])
