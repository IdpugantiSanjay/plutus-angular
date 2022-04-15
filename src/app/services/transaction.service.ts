import { Inject, Injectable } from '@angular/core'
import {
  EntityMap,
  ListResponseProps,
  ListTransactionsRequest,
  Transaction,
  TransactionServiceMethods,
  UpdateTransactionRequest,
} from '../../types/transaction.service.type'
import { Observable} from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import { TRANSACTIONS_URL_TOKEN } from '../app.module'

function stringify<T extends Record<string, any>>(obj: T): { [K in keyof T]: string } {
  let stringify = {} as { [K in keyof T]: string }
  for (const [key, value] of Object.entries(obj)) {
    stringify[key as keyof T] = value.toString()
  }
  return stringify
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService implements TransactionServiceMethods {
  constructor(private http: HttpClient, @Inject(TRANSACTIONS_URL_TOKEN) private url: string) {}

  BatchGetTransactions(request: { ids: EntityMap['Transaction']['id'][] }): Observable<Transaction[]> {
    const params = new HttpParams({ fromObject: request })
    return this.http.get<Transaction[]>(`${this.url}:batch`, { params })
  }

  CreateTransaction(request: Omit<Transaction, 'id'>): Observable<Transaction> {
    return this.http.post<Transaction>(this.url, request)
  }

  GetTransaction(request: { id: string }): Observable<Omit<Transaction, 'username'> & { humanizedDate: string }> {
    return this.http.get<Omit<Transaction, 'username'> & { humanizedDate: string }>(`${this.url}/${request.id}`)
  }

  ListTransactions(
    request: ListTransactionsRequest
  ): Observable<ListResponseProps<Omit<Transaction, 'username'> & { humanizedDate: string }>> {
    const { filters, ...rest } = request
    const params = new HttpParams({
      fromObject: stringify({ ...filters, ...rest }),
    })
    return this.http.get<ListResponseProps<Omit<Transaction, 'username'> & { humanizedDate: string }>>(this.url, {
      params,
    })
  }

  RemoveTransaction(request: { id: string }): Observable<void> {
    return this.http.delete<void>(`${this.url}/${request.id}`)
  }

  UpdateTransaction(request: UpdateTransactionRequest): Observable<void> {
    return this.http.patch<void>(`${this.url}/${request.id}`, request)
  }
}
