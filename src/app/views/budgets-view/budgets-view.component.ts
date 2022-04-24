import { Component, OnInit } from '@angular/core'
import { BudgetService } from './services/budget.service'
import { map, Observable } from 'rxjs'
import { Budget } from '../../../types/transaction.service.type'

@Component({
  selector: 'plutus-budgets-view',
  templateUrl: './budgets-view.component.html',
  styleUrls: ['./budgets-view.component.scss'],
})
export class BudgetsViewComponent implements OnInit {
  budgets$: Observable<Budget[]>

  constructor(private service: BudgetService) {
    this.budgets$ = service
      .ListBudgets({
        dateTime: new Date().toDateString(),
        orderBy: 'amount',
      })
      .pipe(map((res) => res.entities))
  }

  ngOnInit(): void {}
}
