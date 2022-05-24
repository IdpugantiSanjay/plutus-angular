import { Authentication, Budget, Transaction } from './transaction.service.type'
import { Bill } from './bill.service.type'

export type EntityMap = {
  Transaction: Transaction
  Authentication: Authentication
  Budget: Budget
  Bill: Bill
}
