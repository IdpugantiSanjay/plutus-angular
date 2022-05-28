import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CreateExpenseComponent } from './views/create-expense/create-expense.component'
import { LoginComponent } from './views/login/login.component'
import { TransactionsComponent } from './views/transactions/transactions.component'
import { BudgetsViewComponent } from './views/budgets-view/budgets-view.component'
import { CreateBillViewComponent } from './views/create-bill-view/create-bill-view.component'
import {TransactionsViewComponent} from "./views/transactions-view/transactions-view.component";

const routes: Routes = [
  { path: 'transactions', component: TransactionsViewComponent },
  { path: 'transactions/new', component: CreateExpenseComponent },
  { path: 'bills/new', component: CreateBillViewComponent },
  { path: 'overview', component: TransactionsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'budgets', component: BudgetsViewComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
