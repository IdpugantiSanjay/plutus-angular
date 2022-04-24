// import { Injectable } from '@angular/core'
// import { ObservableStore } from '@codewithdan/observable-store'
// import { LoginForm } from '../../types/LoginForm'
// import { AuthService } from '../login/services/auth.service'
// import {catchError, tap} from 'rxjs'
// import { TransactionService } from '../../services/transaction.service'
// import { Transaction } from '../../../types/transaction.service.type'
//
// type CreateExpenseState = {
//   show: 'COMMON' | 'FOOD'
//   readonly title: 'Create Expense'
//   loading: boolean
// }
//
// @Injectable({
//   providedIn: 'root',
// })
// export class CreateExpenseStore extends ObservableStore<CreateExpenseState> {
//   constructor(private service: TransactionService) {
//     super({})
//
//     this.setState({
//       show: 'COMMON',
//       title: 'Create Expense',
//       loading: false,
//     })
//   }
//
//   get title() {
//     return this.getState().title
//   }
//
//   create(request: Omit<Transaction, 'id'>) {
//     this.setState((s) => ({ ...s, loading: true }))
//     this.service.CreateTransaction(request).pipe(
//       tap((res) => {
//         this.setState((s) => ({ ...s, loading: false }))
//       }),
//       catchError(e => {
//
//       })
//     )
//   }
// }
