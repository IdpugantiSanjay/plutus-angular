import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CategoryService } from '../../../services/category.service'
import { FormGroupTyped } from '../../../../TypedForms'
import { Bill } from '../types/bill'

@Component({
  selector: 'plutus-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.scss'],
})
export class BillFormComponent implements OnInit {
  @Input() parent!: FormGroupTyped<Bill>
  @Output('submit') submit = new EventEmitter<Bill>()

  constructor(public service: CategoryService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.parent.get('category').valueChanges.subscribe((v) => console.log(v))
  }

  onSubmit(e: SubmitEvent) {
    e.preventDefault()
    e.stopPropagation()
    this.submit.emit(this.parent.value)
  }
}
