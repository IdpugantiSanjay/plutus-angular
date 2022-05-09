import { Component, OnInit } from '@angular/core'
import { FormGroupTyped } from '../../../TypedForms'
import { Bill, MONTHLY } from './types/bill'
import { FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'plutus-create-bill-view',
  templateUrl: './create-bill-view.component.html',
  styleUrls: ['./create-bill-view.component.scss'],
})
export class CreateBillViewComponent implements OnInit {
  form: FormGroupTyped<Bill>

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      dueDate: [new Date().toISOString().substr(0, 10), Validators.required],
      autoMarkAsPaid: [false],
      category: ['', Validators.required],
      biller: ['', Validators.required],
      amount: [undefined, Validators.required],
      repeat: [MONTHLY],
    }) as FormGroupTyped<Bill>
  }

  ngOnInit(): void {}

  onSubmit(bill: Bill) {
    console.log(bill)
  }
}
