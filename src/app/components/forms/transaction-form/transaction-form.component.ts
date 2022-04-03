import { Attribute, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl } from '@angular/forms'
import { FormGroupTyped } from '../../../../TypedForms'
import { FoodOrder, TransactionForm } from '../../../types/TransactionForm'
import { TransactionFormProps } from '../../../types/TransactionFormProps'
import { splitDateTime } from '../../../functions/dateSplitter'
import { getRoundedMinutes } from '../../../functions/getRoundedMinutes'
import { Observable, of, startWith, tap } from 'rxjs'

@Component({
  selector: 'plutus-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent implements OnInit {
  @Input('props') props?: TransactionFormProps
  @Output('save') saveEvent = new EventEmitter<TransactionForm>()

  form!: FormGroupTyped<TransactionForm>

  category$: Observable<string> = of(this.props?.category || '')

  constructor(private fb: FormBuilder, @Attribute('disabled') public readonly disabled: boolean) {}

  ngOnInit(): void {
    const [date, time] = (this.props?.dateTime && splitDateTime(this.props?.dateTime)) || [
      new Date().toLocaleDateString('en-CA'),
      `${new Date().getHours().toString().padStart(2, '0')}:${getRoundedMinutes(new Date())}`,
    ]

    this.form = this.fb.group({
      category: new FormControl(this.props?.category),
      description: new FormControl(this.props?.description),
      amount: new FormControl(this.props?.amount),
      date: new FormControl(date),
      time: new FormControl(time),
    }) as FormGroupTyped<TransactionForm>

    this.category$ = this.form.get('category').valueChanges.pipe(
      startWith(this.props?.category || ''),
      tap((c) => {
        const foodOrderGroup = this.fb.group({ restaurant: '', dish: '', rating: 0 }) as FormGroupTyped<FoodOrder>
        if (c === 'Food Order') this.form.addControl('foodOrder', foodOrderGroup)
      })
    )
  }

  onSubmit() {
    this.saveEvent.emit(this.form.value)
  }
}
