import { Component, HostBinding, HostListener, OnInit } from '@angular/core'
import { TransactionService } from '../../services/transaction.service'
import { flatMap, groupBy, GroupedObservable, map, mergeMap, Observable, of, switchMap, tap, toArray, zip } from 'rxjs'
import { Transaction } from '../../../types/transaction.service.type'
import { Categories } from '../../../types/category'
import { DatePipe } from '@angular/common'
import { deleteAnimation } from '../../animations/delete'
import { gsap } from 'gsap'
import {listAnimation} from "../../animations/list";
import {fadeAnimation} from "../../animations/fade";

type TransactionVM = Omit<Transaction, 'username'> & { humanizedDate: string }

@Component({
  selector: 'plutus-transactions-view',
  templateUrl: './transactions-view.component.html',
  styleUrls: ['./transactions-view.component.scss'],
  animations: [listAnimation]
})
export class TransactionsViewComponent implements OnInit {
  groupedTransactions$!: Observable<[string | null, TransactionVM[]][]>
  tl?: gsap.core.Timeline
  transactionIdAboutToDelete?: string

  constructor(private service: TransactionService, private date: DatePipe) {
    this.groupedTransactions$ = this.initializeTransactions()
  }

  initializeTransactions() {
    return this.service.ListTransactions({ orderBy: 'dateTime desc', pageSize: 100 }).pipe(
      mergeMap((response) => response.entities),
      groupBy(
        (g) => this.date.transform(g.dateTime, 'MMMM yyyy')?.toUpperCase()!,
        (e) => e
      ),
      mergeMap((group) => zip(of(group.key), group.pipe(toArray()))),
      toArray()
    )
  }

  ngOnInit(): void {}

  animateIndex: Record<string, 'animate' | 'deleted'> = {}

  isIncome(transaction: TransactionVM) {
    return Categories.Income.includes(transaction.category as any)
  }

  month(d: string): string {
    return this.date.transform(d, 'MMMM')!.toUpperCase()
  }

  onLongPress(key: string) {
    if (this.tl) this.tl.reverse()

    this.tl = gsap.timeline({})
    this.transactionIdAboutToDelete = key
    this.tl
      .to(`[data-id="${key}"] > .relative`, {
        opacity: 0.2,
        duration: 0.2,
      })
      .to(`[data-id="${key}"] > .deleteButton`, {
        transform: 'translate(-50%, -50%) scale(1)',
        duration: 0.2,
      })
  }

  cardClick(key: string) {
    if (key != this.transactionIdAboutToDelete) {
      this.tl?.reverse()
    }
  }

  clickedOutside() {
    this.tl?.reverse()
  }

  deleteTransaction(transaction: TransactionVM) {
    this.transactionIdAboutToDelete = transaction.id
    const tl = gsap.timeline({})
    tl.to(`[data-id="${this.transactionIdAboutToDelete}"] > .deleteButton`, { scale: '0', duration: 0.3 })
      .to(`[data-id="${this.transactionIdAboutToDelete}"]`, { translateX: '100%', scale: 0, duration: 0.3 })
      .then(() => {
        this.groupedTransactions$ = this.service
          .RemoveTransaction({ id: transaction.id })
          .pipe(switchMap(() => this.initializeTransactions()))
      })
  }
}
