import { Component, OnInit } from '@angular/core';
import {FormGroupTyped} from "../../../TypedForms";
import {TransactionForm} from "../../types/TransactionForm";
import {FormBuilder, FormControl} from "@angular/forms";
import {TransactionService} from "../../services/transaction.service";

@Component({
  selector: 'plutus-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.scss']
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

  title = 'plutus-web-experimental'

  constructor(private fb: FormBuilder, private service: TransactionService) {}

  submit(form: TransactionForm) {
    this.service.CreateTransaction({ ...form, username: 'sanjay', type: 'expense' })
  }
}
