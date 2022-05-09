import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TransactionsComponent } from './transactions.component'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TransactionService } from '../../services/transaction.service'
import { TRANSACTIONS_URL_TOKEN } from '../../app.module'

describe('TransactionsComponent', () => {
  let component: TransactionsComponent
  let fixture: ComponentFixture<TransactionsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        TransactionService,
        {
          provide: TRANSACTIONS_URL_TOKEN,
          useValue: '',
        },
      ],
      declarations: [TransactionsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(TransactionsComponent)
    component = fixture.componentInstance

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
