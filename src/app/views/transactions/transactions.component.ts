import { Component, OnInit } from '@angular/core'
import { Transaction } from '../../../types/transaction.service.type'
import { map, Observable } from 'rxjs'
import { TransactionService } from '../../services/transaction.service'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'plutus-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  transactions$!: Observable<(Omit<Transaction, 'username'> & { humanizedDate: string })[]>

  constructor(private service: TransactionService, title: Title) {
    this.transactions$ = service
      .ListTransactions({ orderBy: 'date desc' })
      .pipe(map((r) => r.entities))

    title.setTitle('Transactions View')
  }

  ngOnInit(): void {}
}
