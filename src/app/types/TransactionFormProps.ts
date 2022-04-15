import { TransactionForm } from './TransactionForm'

export type TransactionFormProps = Partial<Omit<TransactionForm, 'dateTime' | 'time'> & { dateTime: Date | string }>
