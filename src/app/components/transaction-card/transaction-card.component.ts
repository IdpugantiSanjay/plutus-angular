import { Component, Input, OnInit } from '@angular/core'
import { Transaction } from '../../../types/transaction.service.type'

@Component({
  selector: 'plutus-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss'],
})
export class TransactionCardComponent implements OnInit {
  @Input() transaction!: Omit<Transaction, 'username'> & { humanizedDate: string }

  constructor() {}

  ngOnInit(): void {}
}
