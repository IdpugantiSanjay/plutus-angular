import { TransactionForm } from './TransactionForm'

export type TransactionFormProps = Partial<Omit<TransactionForm, 'date' | 'time'> & { dateTime: Date | string }>
