import { Component, Inject, OnInit } from '@angular/core'
import {FormGroup, NonNullableFormBuilder, Validators} from '@angular/forms'
import { Bill, MONTHLY, RepeatFrequency } from '../../../types/bill.service.type'
import { BillService } from './services/bill.service'
import { USERNAME_TOKEN } from '../../app.module'
import { BehaviorSubject } from 'rxjs'
import { Router } from '@angular/router'
import { scale } from '../../animations/scale'
import {FormGroupType} from '../../../ToFormGroup'
import {setValidators} from "../../functions/setValidators";

type Vm = Omit<Bill, 'username' | 'id'>
type FormGroupVm = FormGroupType<Vm>


@Component({
  selector: 'plutus-create-bill-view',
  templateUrl: './create-bill-view.component.html',
  styleUrls: ['./create-bill-view.component.scss'],
  animations: [scale],
})
export class CreateBillViewComponent implements OnInit {
  form: FormGroup<FormGroupVm>

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: BillService,
    @Inject(USERNAME_TOKEN) private username: BehaviorSubject<string>,
    private router: Router,
  ) {
    this.form = formBuilder.group<Vm>({
      amount: 0,
      biller: "",
      category: "",
      autoMarkAsPaid: false,
      repeat: MONTHLY,
      dueDate: new Date().toISOString().substring(0, 10)
    })

    setValidators(this.form, { amount: Validators.required, biller: Validators.required, category: Validators.required })
  }

  ngOnInit(): void {}

  onSubmit(bill: Vm) {
    bill.repeat = Number(bill.repeat) as RepeatFrequency
    this.service.CreateBill({ ...bill, username: this.username.getValue() }).subscribe(() => {
      return this.router.navigateByUrl('/list')
    })
  }
}
