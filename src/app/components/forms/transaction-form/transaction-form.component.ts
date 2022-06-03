import { Attribute, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  UntypedFormGroup,
} from '@angular/forms'
import { TransactionForm } from '../../../types/TransactionForm'
import { Subject } from 'rxjs'
import { Dishes, FoodOrder } from '../../../../types/transaction.service.type'
import { scale } from '../../../animations/scale'
import { transition, trigger, useAnimation } from '@angular/animations'
import { FormGroupType } from '../../../../ToFormGroup'

export type Vm = TransactionForm

type FoodOrderForm = FormGroupType<FoodOrder>
type FormGroupVM = FormGroupType<Vm>

@Component({
  selector: 'plutus-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  animations: [scale],
})
export class TransactionFormComponent implements OnInit, OnDestroy {
  @Input() parent!: FormGroup<FormGroupVM>
  @Output('save') saveEvent = new EventEmitter<Vm>()

  show: 'COMMON' | 'FOOD' = 'COMMON'
  private destroyed$ = new Subject<void>()

  constructor(private fb: NonNullableFormBuilder, @Attribute('disabled') public readonly disabled: boolean) {}

  get foodOrderForm(): FormGroup<FoodOrderForm> {
    return this.createFoodOrderGroup()
  }

  ngOnDestroy(): void {
    this.destroyed$.next()
    this.destroyed$.complete()
  }

  private createFoodOrderGroup(): FormGroup<FoodOrderForm> {
    const form = this.fb.group({
      restaurant: '',
      dishes: this.fb.array([
        this.fb.group({
          name: '',
          rating: 0,
        }),
      ]),
    })

    return form as unknown as FormGroup<FoodOrderForm>
  }

  ngOnInit(): void {
    (this.parent as any).addControl('foodOrder', this.createFoodOrderGroup())
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
