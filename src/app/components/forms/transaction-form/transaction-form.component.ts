import { Attribute, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { FormGroupTyped } from '../../../../TypedForms'
import { FoodOrderForm, TransactionForm } from '../../../types/TransactionForm'
import { Subject } from 'rxjs'

@Component({
  selector: 'plutus-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  animations: [],
})
export class TransactionFormComponent implements OnInit, OnDestroy {
  @Input() parent!: FormGroupTyped<TransactionForm>
  @Output('save') saveEvent = new EventEmitter<TransactionForm>()

  show: 'COMMON' | 'FOOD' = 'COMMON'
  private destroyed$ = new Subject<void>()
  foodOrderForm: FormGroupTyped<FoodOrderForm>

  constructor(private fb: FormBuilder, @Attribute('disabled') public readonly disabled: boolean) {
    this.foodOrderForm = this.createFoodOrderGroup()
  }

  ngOnDestroy(): void {
    this.destroyed$.next()
    this.destroyed$.complete()
  }

  private createFoodOrderGroup(): FormGroupTyped<FoodOrderForm> {
    return this.fb.group({
      restaurant: '',
      dish: '',
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
    }) as FormGroupTyped<FoodOrderForm>
  }

  ngOnInit(): void {}

  showCommonForm() {
    this.show = 'COMMON'
  }

  showFoodForm() {
    this.show = 'FOOD'
  }

  foodOrderSubmit(foodOrderForm: FoodOrderForm) {
    this.saveEvent.emit({ ...foodOrderForm, ...this.parent.value })
  }
}
