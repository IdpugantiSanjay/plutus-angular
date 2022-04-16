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
import { HttpClientModule } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FoodOrderFormComponent } from './components/forms/transaction-form/food-order-form/food-order-form.component'
import { TransactionCommonPropsFormComponent } from './components/forms/transaction-form/transaction-common-props-form/transaction-common-props-form.component'
import { ButtonDirective } from './directories/button.directive';
import { CreateExpenseComponent } from './views/create-expense/create-expense.component'

const API_BASE_URL_TOKEN = new InjectionToken<string>('Base API TOKEN')
export const TRANSACTIONS_URL_TOKEN = new InjectionToken<string>('Transactions API Token')
const USERNAME_TOKEN = new InjectionToken<BehaviorSubject<string>>('User Info Token')

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
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule],
  bootstrap: [AppComponent],
  providers: [
    { provide: API_BASE_URL_TOKEN, useFactory: () => (environment.production ? '/api' : 'https://localhost:7020/api') },
    { provide: USERNAME_TOKEN, useValue: new BehaviorSubject<string>('sanjay') },
    {
      provide: TRANSACTIONS_URL_TOKEN,
      useFactory: (baseUrl: string, username: BehaviorSubject<string>) => {
        return `${baseUrl}/users/${username.value}/transactions`
      },
      deps: [API_BASE_URL_TOKEN, USERNAME_TOKEN],
    },
  ],
})
export class AppModule {}
