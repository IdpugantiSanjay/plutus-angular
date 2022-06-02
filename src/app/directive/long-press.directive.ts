import {
  Directive,
  ElementRef,
  EventEmitter, HostListener,
  OnDestroy,
  Output
} from "@angular/core";
import { debounceTime, fromEvent, merge, of, Subscription, timer } from 'rxjs'
import { filter, map } from 'rxjs/operators'

@Directive({
  selector: "[longPress]"
})
export class LongPressDirective implements OnDestroy {
  private readonly eventSubscribe: Subscription;
  threshold = 300;

  @Output()
  mouseLongPress = new EventEmitter();





  constructor(private elementRef: ElementRef) {
    const mousedown = fromEvent<MouseEvent>(elementRef.nativeElement, 'mousedown').pipe(
      filter((event) => event.button == 0), // Only allow left button (Primary button)
      map(_ => true) // turn on threshold counter
    )
    const touchstart = fromEvent(elementRef.nativeElement, 'touchstart').pipe(map(() => true));
    const touchEnd = fromEvent(elementRef.nativeElement, 'touchend').pipe(map(() => false));
    const mouseup = fromEvent<MouseEvent>(window, "mouseup").pipe(
      filter(event => event.button == 0),  // Only allow left button (Primary button)
      map(() => false) // reset threshold counter
    );

    this.eventSubscribe = merge(mousedown, mouseup, touchstart, touchEnd)
      .pipe(
        debounceTime(this.threshold),
        filter(value => !!value),
      )
      .subscribe(() => this.mouseLongPress.emit());
  }

  ngOnDestroy(): void {
    if (this.eventSubscribe) {
      this.eventSubscribe.unsubscribe();
    }
  }
}
