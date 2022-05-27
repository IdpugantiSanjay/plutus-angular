import { Attribute, Component, forwardRef, Input } from '@angular/core'
import { RatingProps } from './types'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { range } from '../../functions/range'
import { rotate3Animation } from '../../animations/rotate3'

@Component({
  selector: 'plutus-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  animations: [rotate3Animation],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true,
    },
  ],
})
export class RatingComponent implements ControlValueAccessor {
  @Input('props')
  set props(value: RatingProps) {
    this._props = value

    this.writeValue(value.rating)
  }

  get props() {
    return this._props
  }

  private _props: RatingProps = { count: 5, starSize: 30, rating: 0 }
  public rating: number = 0
  public count: number[] = []

  onChange!: Function

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(): void {}

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  writeValue(rating: number): void {
    this.rating = rating
    this.count = Array.from(range(1, this._props.count + 1))
  }

  constructor(@Attribute('disabled') public disabled: boolean) {}

  rate(rating: number) {
    this.rating = this.rating == rating ? 0 : rating
    this.onChange(this.rating)
    this.rotate(this.rating)
  }

  public rotateState: Array<'default' | 'rotate'> = Array(5).map((_) => 'default')

  resetAnimationState() {
    for (const index of range(0, this.rotateState.length)) {
      this.rotateState[index] = 'default'
    }
  }

  rotate(upto: number) {
    for (const index of range(0, upto)) {
      this.rotateState[index] = 'rotate'
    }
  }
}
