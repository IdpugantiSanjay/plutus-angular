import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl} from '@angular/forms'
import { FormGroupTyped } from '../../../../TypedForms'
import { TransactionForm } from '../../../types/TransactionForm'

@Component({
  selector: 'plutus-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent implements OnInit {
  @Output('submit') submitEvent = new EventEmitter<TransactionForm>()

  form: FormGroupTyped<TransactionForm>

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      category: new FormControl(''),
      description: new FormControl(''),
      amount: new FormControl(),
      date: new FormControl(),
      time: new FormControl(),
    }) as FormGroupTyped<TransactionForm>
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitEvent.emit(this.form.value)
  }
}
