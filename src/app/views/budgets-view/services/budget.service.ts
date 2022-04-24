import { Inject, Injectable } from '@angular/core'
import {
  BudgetServiceMethods,
  EntityMap,
  ListBudgetsRequest,
  ListResponseProps,
} from '../../../../types/transaction.service.type'
import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import { BUDGETS_URL_TOKEN } from '../../../app.module'
import { stringify } from '../../../common/stringify'

@Injectable({
  providedIn: 'root',
})
export class BudgetService implements BudgetServiceMethods {
  constructor(private http: HttpClient, @Inject(BUDGETS_URL_TOKEN) private url: string) {}

  ListBudgets(request: ListBudgetsRequest): Observable<ListResponseProps<EntityMap['Budget']>> {
    const fromObject = stringify(request)
    const params = new HttpParams({ fromObject })
    return this.http.get<ListResponseProps<EntityMap['Budget']>>(this.url, { params })
  }
}
