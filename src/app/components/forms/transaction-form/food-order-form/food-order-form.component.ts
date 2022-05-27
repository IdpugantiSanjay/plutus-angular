import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormArray, FormGroupTyped } from '../../../../../TypedForms'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { FoodOrder } from '../../../../../types/transaction.service.type'
import {scale} from "../../../../animations/scale";
import {fadeAnimation} from "../../../../animations/fade";

@Component({
  selector: 'plutus-food-order-form',
  templateUrl: './food-order-form.component.html',
  styleUrls: ['./food-order-form.component.scss'],
  animations: [
    scale,
    fadeAnimation
  ]
})
export class FoodOrderFormComponent implements OnInit {
  @Input() parent!: FormGroupTyped<FoodOrder>
  @Output() back = new EventEmitter<void>()
  @Output() save = new EventEmitter<FoodOrder>()

  get dishes() {
    return (this.parent.controls['dishes'] as FormArray).controls as FormGroup[]
  }

  constructor() {}

  ngOnInit(): void {}

  clear() {
    this.parent.reset()
  }

  onSubmit() {
    this.save.emit(this.parent.value)
  }

  addDish() {
    const fb = new FormBuilder()
    ;(this.parent.get('dishes') as FormArray).push(
      fb.group({
        name: ['', Validators.required],
        rating: [0, Validators.compose([Validators.min(1), Validators.max(5), Validators.required])],
      })
    )
  }

  removeDish(idx: number) {
    ;(this.parent.get('dishes') as FormArray).controls = this.dishes.filter((_, i) => i != idx)
  }

  isValid() {
    return this.parent.valid && this.dishes.every((d) => d.valid)
  }

  dishesValid() {
    return this.dishes.every((d) => d.valid)
  }
}
