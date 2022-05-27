import { Component, OnInit } from '@angular/core'
import { FormGroupTyped } from '../../../TypedForms'
import { TransactionForm } from '../../types/TransactionForm'
import { FormBuilder, FormControl } from '@angular/forms'
import { TransactionService } from '../../services/transaction.service'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'
import {scale} from "../../animations/scale";

@Component({
  selector: 'plutus-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.scss'],
  providers: [],
  animations: [
    scale
  ]
})
export class CreateExpenseComponent implements OnInit {
  form!: FormGroupTyped<TransactionForm>

  ngOnInit(): void {
    this.form = this.fb.group({
      category: new FormControl(),
      description: new FormControl(),
      amount: new FormControl(),
      dateTime: new FormControl(),
    }) as FormGroupTyped<TransactionForm>
  }

  constructor(
    private fb: FormBuilder,
    private service: TransactionService,
    private title: Title,
    private router: Router
  ) {
    title.setTitle('Create Expense')
  }

  submit(form: TransactionForm) {
    console.log(form)
    this.service.CreateTransaction({ ...form, username: 'sanjay', type: 'expense' }).subscribe({
      next: () => {
        this.router.navigateByUrl('/list')
      },
    })
  }
}
