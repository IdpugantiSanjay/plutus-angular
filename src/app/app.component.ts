import { Component } from '@angular/core'
import { AuthService } from './views/login/services/auth.service'
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private auth: AuthService, private router: Router) {}

  get isLoggedIn() {
    return Boolean(this.auth.GetAuthenticationInfo().bearerToken)
  }

  isActive(route: string): boolean {
    return this.router.isActive(this.router.createUrlTree([route]), true);
  }
}
