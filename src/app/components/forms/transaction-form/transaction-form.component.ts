import { Attribute, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { FormGroupTyped } from '../../../../TypedForms'
import { TransactionForm } from '../../../types/TransactionForm'
import { Subject } from 'rxjs'
import { FoodOrder } from '../../../../types/transaction.service.type'
import {scale} from "../../../animations/scale";
import {transition, trigger, useAnimation} from "@angular/animations";



@Component({
  selector: 'plutus-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  animations: [
    scale,
  ],
})
export class TransactionFormComponent implements OnInit, OnDestroy {
  @Input() parent!: FormGroupTyped<TransactionForm>
  @Output('save') saveEvent = new EventEmitter<TransactionForm>()

  show: 'COMMON' | 'FOOD' = 'COMMON'
  private destroyed$ = new Subject<void>()

  constructor(private fb: FormBuilder, @Attribute('disabled') public readonly disabled: boolean) {}

  get foodOrderForm(): FormGroupTyped<FoodOrder> {
    return this.parent.get('foodOrder') as FormGroupTyped<FoodOrder>
  }

  ngOnDestroy(): void {
    this.destroyed$.next()
    this.destroyed$.complete()
  }

  private createFoodOrderGroup(): FormGroupTyped<FoodOrder> {
    return this.fb.group({
      restaurant: '',
      dishes: this.fb.array([]),
    }) as FormGroupTyped<FoodOrder>
  }

  ngOnInit(): void {
    const foodOrderForm = this.createFoodOrderGroup()
    this.parent.addControl('foodOrder', foodOrderForm)
  }

  showCommonForm() {
    this.show = 'COMMON'
  }

  showFoodForm() {
    this.show = 'FOOD'
  }

  save(transaction: Pick<TransactionForm, 'amount' | 'category' | 'dateTime' | 'description'>) {
    this.saveEvent.emit(transaction)
  }

  foodOrderSubmit(foodOrderForm: FoodOrder) {
    this.saveEvent.emit({ ...this.parent.value, foodOrder: { ...foodOrderForm } })
  }
}
