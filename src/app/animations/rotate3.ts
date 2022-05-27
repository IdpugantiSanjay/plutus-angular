import { animate, state, style, transition, trigger } from '@angular/animations'

export const rotate3Animation = trigger('rotate3', [
  state('rotate', style({})),
  transition('* => rotate', animate('500ms ease-in-out', style({ transform: 'rotate(360deg)' }))),
])
