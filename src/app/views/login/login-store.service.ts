// import { Injectable } from '@angular/core'
// import { ComponentStore } from '@ngrx/component-store'
// import { LoginForm } from '../../types/LoginForm'
// import {catchError, delay, EMPTY, mergeMap, Observable, exhaustMap, tap, concatMap, switchMap, throwError} from 'rxjs'
// import { AuthService } from './services/auth.service'
// import { AppStore } from '../../app-store.service'
// import {HttpErrorResponse} from "@angular/common/http";
//
// type LoginError = 'invalid_credentials' | '' | 'could_not_connect'
//
// type LoginState = {
//   title: 'Login'
//   loading: boolean
//   loginError: LoginError
// }
//
// @Injectable({
//   providedIn: 'root',
// })
// export class LoginStore extends ComponentStore<LoginState> {
//   constructor(private service: AuthService, private appStore: AppStore) {
//     super({ title: 'Login', loading: false, loginError: '' })
//   }
//
//   getTitle() {
//     return this.select((s) => s.title)
//   }
//
//   login = this.effect((credentials$: Observable<LoginForm>) => {
//     return credentials$.pipe(
//       tap(() => this.setState((s) => ({ ...s, loading: true }))),
//       delay(1_000),
//       switchMap((c) => this.service.CreateAuthentication(c)),
//       catchError((e) => {
//         if (e instanceof HttpErrorResponse && e.message.startsWith('Http failure response')) {
//           this.setState((s) => ({ ...s, loading: false, loginError: 'could_not_connect' }))
//         }
//         return throwError(e)
//       }),
//       tap((r) => {
//         if (r.username && r.token) {
//           this.appStore.setUser(r)
//           this.setState((s) => ({ ...s, loading: false, loginError: '' }))
//         }
//       })
//     )
//   })
// }
