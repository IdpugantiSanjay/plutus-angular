import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { LoginFormProps } from '../../../types/LoginFormProps'
import { FormBuilder } from '@angular/forms'
import { FormGroupTyped } from '../../../../TypedForms'
import { LoginForm } from '../../../types/LoginForm'

@Component({
  selector: 'plutus-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Input() props: LoginFormProps = { username: '', password: '' }
  @Output('submit') submit = new EventEmitter<LoginForm>()

  form: FormGroupTyped<LoginForm>

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      username: [this.props.username],
      password: [this.props.password],
    }) as FormGroupTyped<LoginForm>
  }
  ngOnInit(): void {}
  onLogin() {
    this.submit.emit(this.form.value)
  }
}
