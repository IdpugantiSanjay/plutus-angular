import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AuthService } from '../views/login/services/auth.service'

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authInfo = this.auth.GetAuthenticationInfo()

    if (authInfo.username && authInfo.bearerToken) {
      const headers = {
        Authorization: `Bearer ${authInfo.bearerToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
      req = req.clone({
        setHeaders: headers,
      })

      return next.handle(req)
    }

    return next.handle(req)
  }

  constructor(private auth: AuthService) {}
}
