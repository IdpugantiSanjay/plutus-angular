import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CategoryService } from '../../../services/category.service'
import { Bill } from '../../../../types/bill.service.type'
import {FormGroup} from "@angular/forms";
import {FormGroupType} from "../../../../ToFormGroup";


type Vm = Omit<Bill, 'username' | 'id'>
type FormVm = FormGroupType<Vm>

@Component({
  selector: 'plutus-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.scss'],
})
export class BillFormComponent implements OnInit {
  @Input() parent!: FormGroup<FormVm>
  @Output('submit') submit = new EventEmitter<Vm>()

  constructor(public service: CategoryService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.parent.controls
      .category
      .valueChanges.subscribe((v) => console.log(v))
  }

  onSubmit(e: SubmitEvent) {
    e.preventDefault()
    e.stopPropagation()
    this.submit.emit(this.parent.value as Vm)
  }
}
