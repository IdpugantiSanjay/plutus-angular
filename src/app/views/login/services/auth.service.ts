import { Inject, Injectable } from '@angular/core'
import { Authentication, AuthServiceMethods } from '../../../../types/transaction.service.type'
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { USERNAME_TOKEN, USERS_URL_TOKEN } from '../../../app.module'
import { HttpClient } from '@angular/common/http'

function parseJwt(token: string) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload)
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthServiceMethods {
  private username: string | null = null
  private bearerToken: string | undefined = undefined

  CreateAuthentication(
    request: Pick<Authentication, 'username' | 'password'>
  ): Observable<Pick<Authentication, 'bearerToken'>> {
    return this.http
      .post<Pick<Authentication, 'bearerToken'>>(`${this.api}/${request.username}:authenticate`, request)
      .pipe(
        tap(({ bearerToken }) => {
          this.usernameSubject.next(request.username)
          this.username = request.username
          this.bearerToken = bearerToken
          localStorage.setItem('bearerToken', bearerToken)
        })
      )
  }

  GetAuthenticationInfo(): { username: string; bearerToken: string } {
    return { username: this.username!, bearerToken: this.bearerToken! }
  }

  ClearAuthentication(): void {
    localStorage.removeItem('bearerToken')
    this.usernameSubject.next(undefined)
    this.bearerToken = undefined
  }

  constructor(
    @Inject(USERS_URL_TOKEN) private api: string,
    @Inject(USERNAME_TOKEN) private usernameSubject: BehaviorSubject<string | undefined>,
    private http: HttpClient
  ) {
    const bearerToken = localStorage.getItem('bearerToken')
    if (bearerToken) {
      this.bearerToken = bearerToken
      this.username = parseJwt(bearerToken).sub

      if (this.username) usernameSubject.next(this.username)
    }
  }
}
