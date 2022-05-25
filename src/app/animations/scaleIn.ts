import {animate, animation, keyframes, style, transition, trigger} from "@angular/animations";



export const scaleIn = trigger("scaleIn", [
  transition(":enter", [
    style({ transform: 'scale(0.85)', opacity: 0 }),
    animate('350ms', style({transform: 'scale(1)', opacity: 1}))
  ]),
])

