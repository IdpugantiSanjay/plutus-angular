import { Component, OnInit } from '@angular/core';
import {TransactionService} from "../../services/transaction.service";
import {map, Observable} from "rxjs";
import {Transaction} from "../../../types/transaction.service.type";
import {Categories} from "../../../types/category";

@Component({
  selector: 'plutus-transactions-view',
  templateUrl: './transactions-view.component.html',
  styleUrls: ['./transactions-view.component.scss']
})
export class TransactionsViewComponent implements OnInit {
  transactions$: Observable<(Omit<Transaction, "username"> & {humanizedDate: string})[]>

  constructor(private service: TransactionService) {
    this.transactions$ = this.service.ListTransactions({ orderBy: 'dateTime desc', pageSize: 100 }).pipe(map(x => x.entities))
  }

  ngOnInit(): void {
  }

  isIncome(transaction: Omit<Transaction, "username"> & {humanizedDate: string}) {
    return Categories.Income.includes(transaction.category as any)
  }
}
