import { InjectionToken, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ReactiveFormsModule } from '@angular/forms'
import { DrinksIconComponent } from './components/icons/drinks-icon.component'
import { LoginFormComponent } from './components/forms/login-form/login-form.component'
import { TransactionFormComponent } from './components/forms/transaction-form/transaction-form.component'
import { RatingComponent } from './components/rating/rating.component'
import { environment } from '../environments/environment'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FoodOrderFormComponent } from './components/forms/transaction-form/food-order-form/food-order-form.component'
import { TransactionCommonPropsFormComponent } from './components/forms/transaction-form/transaction-common-props-form/transaction-common-props-form.component'
import { ButtonDirective } from './directories/button.directive'
import { CreateExpenseComponent } from './views/create-expense/create-expense.component'
import { LoginComponent } from './views/login/login.component'
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component'
import { HttpInterceptorService } from './interceptors/http-interceptor.service'
import { TransactionsComponent } from './views/transactions/transactions.component'
import { TransactionCardComponent } from './components/transaction-card/transaction-card.component'
import { FoodOrderIconComponent } from './components/icons/food-order-icon.component'
import { EntertainmentIconComponent } from './components/icons/entertainment-icon.component'
import { MedicineIconComponent } from './components/icons/medicine-icon.component'
import { BudgetsViewComponent } from './views/budgets-view/budgets-view.component';
import { BudgetComponent } from './views/budgets-view/budget/budget.component'

const API_BASE_URL_TOKEN = new InjectionToken<string>('Base API TOKEN')
export const TRANSACTIONS_URL_TOKEN = new InjectionToken<string>('Transactions API Token')
export const BUDGETS_URL_TOKEN = new InjectionToken<string>('Budgets API Token')
export const USERS_URL_TOKEN = new InjectionToken<string>('Users API Token')
export const USERNAME_TOKEN = new InjectionToken<BehaviorSubject<string>>('User Info Token')

@NgModule({
  declarations: [
    AppComponent,
    DrinksIconComponent,
    LoginFormComponent,
    TransactionFormComponent,
    RatingComponent,
    FoodOrderFormComponent,
    TransactionCommonPropsFormComponent,
    ButtonDirective,
    CreateExpenseComponent,
    LoginComponent,
    MessageDialogComponent,
    TransactionsComponent,
    TransactionCardComponent,
    FoodOrderIconComponent,
    EntertainmentIconComponent,
    MedicineIconComponent,
    BudgetsViewComponent,
    BudgetComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: API_BASE_URL_TOKEN, useFactory: () => (environment.production ? '/api' : 'https://localhost:7020/api') },
    { provide: USERNAME_TOKEN, useValue: new BehaviorSubject<string>('sanjay') },
    {
      provide: BUDGETS_URL_TOKEN,
      useFactory: (baseUrl: string, username: BehaviorSubject<string>) => {
        return `${baseUrl}/users/${username.value}/budgets`
      },
      deps: [API_BASE_URL_TOKEN, USERNAME_TOKEN],
    },
    {
      provide: TRANSACTIONS_URL_TOKEN,
      useFactory: (baseUrl: string, username: BehaviorSubject<string>) => {
        return `${baseUrl}/users/${username.value}/transactions`
      },
      deps: [API_BASE_URL_TOKEN, USERNAME_TOKEN],
    },
    {
      provide: USERS_URL_TOKEN,
      useFactory: (baseUrl: string) => {
        return `${baseUrl}/users`
      },
      deps: [API_BASE_URL_TOKEN],
    },
  ],
})
export class AppModule {}
