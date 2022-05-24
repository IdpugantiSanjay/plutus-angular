import {
  BatchGet,
  Create,
  Get,
  List,
  ListRequestProps,
  ListResponseProps,
  OrderBy,
  Remove,
  RequireAtLeastOne,
  Update,
} from './common'
import { EntityMap } from './entities'

import { Categories, MainCategories } from './category'

export type Transaction = {
  amount: number
  category: typeof Categories[typeof MainCategories[number]][number]
  dateTime: Date
  description: string
  id: string
  type: 'income' | 'expense'
  username: string
  foodOrder?: FoodOrder
}

export type FoodOrder = {
  dishes: Dishes
  restaurant: string
}

export type Dishes = { name: string; rating: number }[]

export type Budget = {
  id: string
  category: string
  username: string
  capacity: number
  consumed: number
  frequency: 0 | 1
}

export type BudgetKeys = keyof Budget

export type Authentication = {
  username: string
  password: string
  bearerToken: string
}

export type TransactionType = 'income' | 'expense'

export type SortableTransactionFields = 'amount' | 'dateTime' | 'category'
export type SortableBudgetFields = Exclude<BudgetKeys, 'username' | 'id' | 'frequency'>

export type ListTransactionsRequest = ListRequestProps & {
  // filters: Partial<{
  //   [K in keyof Omit<EntityMap['Transaction'], 'id' | 'description' | 'amount'>]: EntityMap['Transaction'][K]
  // }>
} & { includeTotalResults?: boolean } & { orderBy: OrderBy<SortableTransactionFields> }

export type UpdateTransactionRequest = {
  patch: RequireAtLeastOne<Omit<EntityMap['Transaction'], 'id' | 'username'>>
} & Pick<EntityMap['Transaction'], 'id' | 'username'>

export type TransactionServiceMethods = Get<
  'Transaction',
  { id: string },
  Omit<EntityMap['Transaction'], 'username'> & { humanizedDate: string }
> &
  Create<'Transaction', Omit<EntityMap['Transaction'], 'id'>, EntityMap['Transaction']> &
  Update<'Transaction', UpdateTransactionRequest, void> &
  Remove<'Transaction', { id: string }, void> &
  List<
    'Transaction',
    ListTransactionsRequest,
    ListResponseProps<Omit<EntityMap['Transaction'], 'username'> & { humanizedDate: string }>
  > &
  BatchGet<'Transaction'>

export type ListBudgetsRequest = ListRequestProps & { dateTime: string } & {
  includeTotalResults?: boolean
} & { orderBy: OrderBy<SortableTransactionFields> }

export type BudgetServiceMethods = List<'Budget', ListBudgetsRequest>

export type AuthServiceMethods = Create<
  'Authentication',
  Pick<Authentication, 'username' | 'password'>,
  Pick<Authentication, 'bearerToken'>
>
