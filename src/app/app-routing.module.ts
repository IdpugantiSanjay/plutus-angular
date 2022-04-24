import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CreateExpenseComponent } from './views/create-expense/create-expense.component'
import { LoginComponent } from './views/login/login.component'
import { TransactionsComponent } from './views/transactions/transactions.component'
import { BudgetsViewComponent } from './views/budgets-view/budgets-view.component'

const routes: Routes = [
  { path: 'new', component: CreateExpenseComponent },
  { path: 'list', component: TransactionsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'budgets', component: BudgetsViewComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
