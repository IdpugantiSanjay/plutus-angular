import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BudgetsViewComponent } from './budgets-view.component'
import { BudgetService } from './services/budget.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { BUDGETS_URL_TOKEN } from '../../app.module'

describe('BudgetsViewComponent', () => {
  let component: BudgetsViewComponent
  let fixture: ComponentFixture<BudgetsViewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [BudgetsViewComponent],
      providers: [
        BudgetService,
        {
          provide: BUDGETS_URL_TOKEN,
          useValue: '',
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(BudgetsViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
