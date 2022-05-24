import { Transaction } from '../../types/transaction.service.type'

export type TransactionForm = Omit<Transaction, 'id' | 'username' | 'type'>

export type TransactionFormButtonState = {
  name: 'Save' | 'Next'
  type: 'submit' | 'button'
  isDisabled: boolean
}
