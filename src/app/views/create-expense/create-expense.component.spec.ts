import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CreateExpenseComponent } from './create-expense.component'
import { ButtonDirective } from '../../directories/button.directive'
import { TransactionFormComponent } from '../../components/forms/transaction-form/transaction-form.component'
import { TransactionCommonPropsFormComponent } from '../../components/forms/transaction-form/transaction-common-props-form/transaction-common-props-form.component'
import { RatingComponent } from '../../components/rating/rating.component'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { FoodOrderFormComponent } from '../../components/forms/transaction-form/food-order-form/food-order-form.component'
import { TransactionService } from '../../services/transaction.service'
import { TRANSACTIONS_URL_TOKEN } from '../../app.module'
import { RouterTestingModule } from '@angular/router/testing'

describe('CreateExpenseComponent', () => {
  let component: CreateExpenseComponent
  let fixture: ComponentFixture<CreateExpenseComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CreateExpenseComponent,
        ButtonDirective,
        TransactionFormComponent,
        TransactionCommonPropsFormComponent,
        RatingComponent,
        FoodOrderFormComponent,
      ],
      providers: [FormBuilder, TransactionService, { provide: TRANSACTIONS_URL_TOKEN, useValue: '' }],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule],
    }).compileComponents()

    fixture = TestBed.createComponent(CreateExpenseComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
