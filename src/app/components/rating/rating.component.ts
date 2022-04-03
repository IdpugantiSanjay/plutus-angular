import { Attribute, Component, forwardRef, Input, OnInit } from '@angular/core'
import { RatingProps } from './types'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import {range} from "../../functions/range";

@Component({
  selector: 'plutus-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true,
    },
  ],
})
export class RatingComponent implements OnInit, ControlValueAccessor {
  @Input('props') props: RatingProps = { count: 5, starSize: 30 }
  public rating: number = 0
  public count: number[] = []


  onChange!: Function

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  writeValue(rating: number): void {
    this.rating = rating
    this.count = Array.from(range(1, this.props.count + 1))
  }

  constructor(@Attribute('disabled') public disabled: boolean) {}

  ngOnInit(): void {}

  rate(rating: number) {
    if (this.rating == rating) {
      this.rating = 0
    } else {
      this.rating = rating
    }
    this.onChange(rating)
  }
}
