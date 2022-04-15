import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TransactionCommonPropsFormComponent } from './transaction-common-props-form.component'
import {FormBuilder, FormControl, ReactiveFormsModule} from "@angular/forms";
import {FormGroupTyped} from "../../../../../TypedForms";
import {TransactionForm} from "../../../../types/TransactionForm";

describe('TransactionCommonPropsFormComponent', () => {
  let component: TransactionCommonPropsFormComponent
  let fixture: ComponentFixture<TransactionCommonPropsFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionCommonPropsFormComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder]
    }).compileComponents()

    fixture = TestBed.createComponent(TransactionCommonPropsFormComponent)
    component = fixture.componentInstance

    const fb = new FormBuilder();
    component.parent = fb.group({
      category: new FormControl(),
      description: new FormControl(),
      amount: new FormControl(),
      dateTime: new FormControl(),
    }) as FormGroupTyped<TransactionForm>

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
