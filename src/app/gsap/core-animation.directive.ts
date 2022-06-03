import {Directive, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {gsap} from 'gsap';


@Directive({ selector: '[coreAnimation]' })
export class CoreAnimationDirective {
  @Input() duration = 1;
  @Input() delay = 0;

  @Output() complete: EventEmitter<null> = new EventEmitter();
  @Output() reverseComplete: EventEmitter<null> = new EventEmitter();
  protected timeline?: gsap.core.Timeline;

  constructor(protected element: ElementRef) {}

  protected animateIn() {
    if(this.timeline?.isActive()) {
      this.timeline.kill();
    }
    this.timeline?.play();
  }
}
