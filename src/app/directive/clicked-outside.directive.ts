import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core'

@Directive({
  selector: '[clickedOutside]',
})
export class ClickedOutsideDirective {
  @Output()
  clickedOutside = new EventEmitter()

  @HostListener('document:click', ['$event']) outsideOfComponentClick(event: Event) {
    console.log(event.target)
    console.log(this.elementRef.nativeElement)
    if (event.target && event.target != this.elementRef.nativeElement && !this.elementRef.nativeElement.contains(event.target)) {
      this.clickedOutside.emit()
    }

    event.preventDefault()
    event.stopPropagation()
    event.stopImmediatePropagation()
  }

  constructor(private elementRef: ElementRef) {}
}
