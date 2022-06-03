import { Component, inject, OnInit } from '@angular/core'
import { TransactionForm } from '../../types/TransactionForm'
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms'
import { TransactionService } from '../../services/transaction.service'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { scale } from '../../animations/scale'
import { FormGroupType } from '../../../ToFormGroup'
import { USERNAME_TOKEN } from '../../app.module'
import {ReplaceWith} from "../../../types/Replace";
import {Categories, MainCategories} from "../../../types/category";
import {CategoryType, Dishes, FoodOrder} from "../../../types/transaction.service.type";

type Vm = TransactionForm
type FormGroupVm = FormGroupType<Vm>

@Component({
  selector: 'plutus-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.scss'],
  providers: [],
  animations: [scale],
})
export class CreateExpenseComponent implements OnInit {
  form: FormGroup<FormGroupVm>

  ngOnInit(): void {}

  constructor(
    private fb: NonNullableFormBuilder,
    private service: TransactionService,
    private title: Title,
    private router: Router
  ) {
    title.setTitle('Create Expense')

    this.form = this.fb.group<Vm>({
      category: '' as CategoryType,
      description: '',
      amount: 0,
      dateTime: '',
    })
  }

  submit(form: Vm) {
    const requestBody = { ...form, username: inject(USERNAME_TOKEN).value }
    this.service.CreateTransaction(requestBody).subscribe(() => this.router.navigateByUrl('/transactions'))
  }
}
