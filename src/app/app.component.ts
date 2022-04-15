import { Component, OnInit } from '@angular/core'
import { TransactionForm } from './types/TransactionForm'
import { FormBuilder, FormControl } from '@angular/forms'
import { FormGroupTyped } from '../TypedForms'
import { TransactionService } from './services/transaction.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  form!: FormGroupTyped<TransactionForm>

  ngOnInit(): void {
    this.form = this.fb.group({
      category: new FormControl(),
      description: new FormControl(),
      amount: new FormControl(),
      dateTime: new FormControl(),
    }) as FormGroupTyped<TransactionForm>
  }

  title = 'plutus-web-experimental'

  constructor(private fb: FormBuilder, private service: TransactionService) {}

  submit(form: TransactionForm) {
    alert(JSON.stringify(form))
    this.service.CreateTransaction({ ...form, username: 'sanjay', type: 'expense' })
  }
}
