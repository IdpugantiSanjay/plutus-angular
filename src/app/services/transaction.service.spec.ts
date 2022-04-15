import { TestBed } from '@angular/core/testing'

import { TransactionService } from './transaction.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TRANSACTIONS_URL_TOKEN } from '../app.module'

describe('TransactionService', () => {
  let service: TransactionService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: TRANSACTIONS_URL_TOKEN,
          useValue: '',
        },
      ],
    })
    service = TestBed.inject(TransactionService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
