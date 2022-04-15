import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormGroupTyped } from '../../../../../TypedForms'
import { TransactionForm, TransactionFormButtonState } from '../../../../types/TransactionForm'
import { FormControl} from '@angular/forms'
import { getRoundedMinutes } from '../../../../functions/getRoundedMinutes'
import { map, merge, of, startWith, Subject, takeUntil} from 'rxjs'

@Component({
  selector: 'plutus-transaction-common-props-form',
  templateUrl: './transaction-common-props-form.component.html',
  styleUrls: ['./transaction-common-props-form.component.scss'],
})
export class TransactionCommonPropsFormComponent implements OnInit {
  @Input() parent!: FormGroupTyped<Pick<TransactionForm, 'amount' | 'category' | 'dateTime' | 'description'>>
  @Output('onSubmit') submit$ = new EventEmitter<
    Pick<TransactionForm, 'amount' | 'category' | 'dateTime' | 'description'>
  >()
  @Output('next') next$ = new EventEmitter<Pick<TransactionForm, 'amount' | 'category' | 'dateTime' | 'description'>>()

  date = new FormControl(new Date().toLocaleDateString('en-CA'))
  time = new FormControl(`${new Date().getHours().toString().padStart(2, '0')}:${getRoundedMinutes(new Date())}`)
  private destroyed$ = new Subject<void>()
  buttonState$ = of<TransactionFormButtonState>({ name: 'Save', isDisabled: true, type: 'submit' })

  constructor() {}

  ngOnInit(): void {
    this.reactToDateAndTimeChanges()
    this.changeSubmitButtonOnForm()
  }

  private reactToDateAndTimeChanges() {
    merge(this.date.valueChanges, this.time.valueChanges)
      .pipe(
        startWith(new Date(`${this.date.value} ${this.time.value}`)),
        map(() => new Date(`${this.date.value} ${this.time.value}`)),
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: (dateTime) => {
          this.parent.get('dateTime').setValue(dateTime)
        },
      })
  }

  private changeSubmitButtonOnForm() {
    this.buttonState$ = this.parent.valueChanges.pipe(
      map(() => this.parent.get('category').value),
      startWith(this.parent.value.category),
      map((category) => {
        return {
          isDisabled: !this.parent.valid,
          type: category === 'Food Order' ? 'button' : 'submit',
          name: category !== 'Food Order' ? 'Save' : 'Next',
        } as TransactionFormButtonState
      }),
      takeUntil(this.destroyed$)
    )
  }


  clear() {
    this.parent.reset()
  }

  onSubmit() {
    this.submit$.emit(this.parent.value)
  }

  onNext() {
    this.next$.emit(this.parent.value)
  }
}
