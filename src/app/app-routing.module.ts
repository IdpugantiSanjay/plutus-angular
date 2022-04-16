import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import {CreateExpenseComponent} from "./views/create-expense/create-expense.component";

const routes: Routes = [
  { path: 'new', component: CreateExpenseComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
