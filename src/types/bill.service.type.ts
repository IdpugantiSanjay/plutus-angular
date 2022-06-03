import type { Create, List } from './common'
import { EntityMap } from './entities'
import { ListRequestProps, ListResponseProps } from './common'
import { Observable } from 'rxjs'

export const ONE_TIME = 1
export const MONTHLY = 2
export const THREE_MONTHS = 3
export const SIX_MONTHS = 4
export const YEARLY = 5

export type RepeatFrequency = typeof ONE_TIME | typeof MONTHLY | typeof THREE_MONTHS | typeof SIX_MONTHS | typeof YEARLY

export type Bill = {
  id?: string
  dueDate: string
  autoMarkAsPaid: boolean
  category: string
  biller: string
  amount: number
  username: string
  repeat: RepeatFrequency
}

export type ListBillsRequest = ListRequestProps & { currentDateTime: string }
export type ListBillsResponse = ListResponseProps<Bill & { isIncome: boolean; paid: boolean }> & { totalDue: number }

export type BillServiceMethods = Create<'Bill', EntityMap['Bill'], void> &
  List<'Bill', ListBillsRequest, ListBillsResponse> & { MarkBillAsPaid: (id: string) => Observable<void> }
