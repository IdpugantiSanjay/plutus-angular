import { Component, Inject, OnInit } from '@angular/core'
import { FormGroupTyped } from '../../../TypedForms'
import { FormBuilder, Validators } from '@angular/forms'
import { Bill, MONTHLY, RepeatFrequency } from '../../../types/bill.service.type'
import { BillService } from './services/bill.service'
import { USERNAME_TOKEN } from '../../app.module'
import { BehaviorSubject } from 'rxjs'
import { Router } from '@angular/router'

@Component({
  selector: 'plutus-create-bill-view',
  templateUrl: './create-bill-view.component.html',
  styleUrls: ['./create-bill-view.component.scss'],
})
export class CreateBillViewComponent implements OnInit {
  form: FormGroupTyped<Bill>

  constructor(
    private formBuilder: FormBuilder,
    private service: BillService,
    @Inject(USERNAME_TOKEN) private username: BehaviorSubject<string>,
    private router: Router
  ) {
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
    bill.repeat = Number(bill.repeat) as RepeatFrequency
    this.service.CreateBill({ ...bill, username: this.username.getValue() }).subscribe(() => {
      this.router.navigateByUrl('/list')
    })
  }
}
