import { Observable } from 'rxjs'

export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>
}[keyof T]

export function isDefined<T>(value: T): boolean {
  return value !== undefined && value !== null
}

export type Parameter<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P[0] : never

export type OrderBy<T extends string> = `${T}` | `${T} desc`

export type Transaction = {
  amount: number
  category: string
  dateTime: Date
  description: string
  id: string
  type: 'income' | 'expense'
  username: string
}

export type EntityMap = {
  Transaction: Transaction
}

export type ListRequestProps = { limit?: number; offset?: number; /* url-safe base64 */ pageToken?: string }
export type ListResponseProps<T> = { pageSize: number; nextPageToken: string; entities: T[] }

export type Get<Entity extends keyof EntityMap, Request = { id: string }, Response = EntityMap[Entity]> = {
  [K in Entity as `Get${K}`]: (request: Request) => Observable<Response>
}

export type List<
  Entity extends keyof EntityMap,
  Request extends ListRequestProps = ListRequestProps,
  Response extends ListResponseProps<Omit<EntityMap[Entity], 'username'>> = ListResponseProps<EntityMap[Entity]>
> = { [K in Entity as `List${K}s`]: (request: Request) => Observable<Response> }

export type Create<
  Entity extends keyof EntityMap,
  Request = Omit<EntityMap[Entity], 'id'>,
  Response = EntityMap[Entity]
> = { [K in Entity as `Create${K}`]: (request: Request) => Observable<Response> }

export type Remove<Entity extends keyof EntityMap, Request = { id: string }, Response = EntityMap[Entity]> = {
  [K in Entity as `Remove${K}`]: (request: Request) => Observable<Response>
}

export type Update<
  Entity extends keyof EntityMap,
  Request = RequireAtLeastOne<EntityMap[Entity]>,
  Response = EntityMap[Entity]
> = { [K in Entity as `Update${K}`]: (request: Request) => Observable<Response> }

export type BatchGet<
  Entity extends keyof EntityMap,
  Request = { ids: EntityMap[Entity]['id'][] },
  Response = EntityMap[Entity][]
> = { [K in Entity as `BatchGet${K}s`]: (request: Request) => Observable<Response> }

export type TransactionType = 'income' | 'expense'

export type SortableTransactionFields = 'amount' | 'date' | 'category'

export type ListTransactionsRequest = ListRequestProps & {
  filters: Partial<{
    [K in keyof Omit<EntityMap['Transaction'], 'id' | 'description' | 'amount'>]: EntityMap['Transaction'][K]
  }> & { username: string }
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
