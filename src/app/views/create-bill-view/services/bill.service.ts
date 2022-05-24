import { Inject, Injectable } from '@angular/core'
import { Bill, BillServiceMethods, ListBillsRequest, ListBillsResponse } from '../../../../types/bill.service.type'
import { BehaviorSubject, Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import { RECURRING_TRANSACTIONS_URL_TOKEN, USERNAME_TOKEN } from '../../../app.module'
import { ListResponseProps } from '../../../../types/common'

@Injectable({
  providedIn: 'root',
})
export class BillService implements BillServiceMethods {
  MarkBillAsPaid(id: string): Observable<void> {
    return this.http.patch<void>(`${this.url}/${id}:markAsPaid`, null)
  }

  ListBills(request: ListBillsRequest): Observable<ListBillsResponse> {
    const params = new HttpParams({ fromObject: request })
    return this.http.get<ListBillsResponse>(this.url, { params })
  }

  CreateBill(request: Bill): Observable<void> {
    return this.http.post<void>(this.url, request)
  }

  constructor(private http: HttpClient, @Inject(RECURRING_TRANSACTIONS_URL_TOKEN) private url: string) {}
}
