import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormGroupTyped } from '../../../../../TypedForms'
import { FoodOrderForm } from '../../../../types/TransactionForm'

@Component({
  selector: 'plutus-food-order-form',
  templateUrl: './food-order-form.component.html',
  styleUrls: ['./food-order-form.component.scss'],
})
export class FoodOrderFormComponent implements OnInit {
  @Input() parent!: FormGroupTyped<FoodOrderForm>
  @Output() back = new EventEmitter<void>()
  @Output() save = new EventEmitter<FoodOrderForm>()

  constructor() {}

  ngOnInit(): void {}

  clear() {
    this.parent.reset()
  }

  onSubmit() {
    this.save.emit(this.parent.value)
  }
}
