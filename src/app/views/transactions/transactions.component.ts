import { Component, OnInit } from '@angular/core'
import { Transaction } from '../../../types/transaction.service.type'
import { map, Observable, of, shareReplay, switchMap } from 'rxjs'
import { TransactionService } from '../../services/transaction.service'
import { Title } from '@angular/platform-browser'
import { BillService } from '../create-bill-view/services/bill.service'
import { ListBillsResponse } from '../../../types/bill.service.type'
import { CategoryService } from '../../services/category.service'
import {animate, style, transition, trigger} from "@angular/animations";
import {scaleIn} from "../../animations/scaleIn";

@Component({
  selector: 'plutus-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  animations: [
    scaleIn
  ]
})
export class TransactionsComponent implements OnInit {
  transactions$!: Observable<(Omit<Transaction, 'username'> & { humanizedDate: string })[]>
  bills$!: Observable<ListBillsResponse['entities']>
  totalBillsDue$: Observable<number> = of(0)

  constructor(
    private service: TransactionService,
    title: Title,
    private billService: BillService,
    private category: CategoryService
  ) {
    this.transactions$ = service
      .ListTransactions({ orderBy: 'dateTime desc', pageSize: 5 })
      .pipe(map((r) => r.entities))

    title.setTitle('Transactions View')
  }

  ngOnInit(): void {
    const response$ = this.billService
      .ListBills({
        pageSize: 5,
        currentDateTime: new Date().toISOString(),
      })
      .pipe(shareReplay(1))
    this.bills$ = response$.pipe(map((b) => b.entities))
    this.totalBillsDue$ = response$.pipe(map((x) => x.totalDue))
  }

  cardTitle(transaction: Omit<Transaction, 'username'> & { humanizedDate: string }): string {
    switch (transaction.category) {
      case 'Food Delivery':
        return transaction.foodOrder?.restaurant as string
      default:
        return transaction.description
    }
  }

  markBillAsPaid(id: string) {
    this.bills$ = this.billService.MarkBillAsPaid(id).pipe(
      switchMap(() =>
        this.billService
          .ListBills({
            pageSize: 5,
            currentDateTime: new Date().toISOString(),
          })
          .pipe(map((b) => b.entities))
      )
    )
  }
}
