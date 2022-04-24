import { TestBed } from '@angular/core/testing';

import { BudgetService } from './budget.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BUDGETS_URL_TOKEN} from "../../../app.module";

describe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: BUDGETS_URL_TOKEN,
          useValue: '',
        },
      ]
    });
    service = TestBed.inject(BudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
