import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { LoginForm } from '../../types/LoginForm'
import { AuthService } from './services/auth.service'
import { HttpErrorResponse } from '@angular/common/http'
import {FormBuilder, FormGroup, NonNullableFormBuilder} from '@angular/forms'
import { Router } from '@angular/router'
import {scale} from "../../animations/scale";
import {FormGroupType} from "../../../ToFormGroup";


type Vm = LoginForm
type FormVm = FormGroupType<Vm>

@Component({
  selector: 'plutus-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    scale
  ]
})
export class LoginComponent implements OnInit {
  form: FormGroup<FormVm>

  constructor(
    title: Title,
    private auth: AuthService,
    private fb: NonNullableFormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    title.setTitle('Login')

    this.form = fb.group({
      username: '',
      password: '',
    })

    this.authService.ClearAuthentication()
  }

  ngOnInit(): void {}

  onLogin(form: LoginForm) {
    this.auth
      .CreateAuthentication(form)
      .pipe()
      .subscribe({
        error: (err) => {
          if (err instanceof HttpErrorResponse && err.status >= 400 && err.status < 500) {
            this.form.setErrors({ loginError: 'Invalid username and password.' })
          }
        },
        next: () => {
          this.router.navigateByUrl('/transactions/new')
        },
      })
  }
}
