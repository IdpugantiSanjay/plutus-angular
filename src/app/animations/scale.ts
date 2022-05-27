import { animate, style, transition, trigger } from '@angular/animations'



export const scale = trigger("scale", [
  transition(":enter", [
    style({ transform: 'scale(0.85)', opacity: 0 }),
    animate('250ms 150ms', style({transform: 'scale(1)', opacity: 1}))
  ]),
])

