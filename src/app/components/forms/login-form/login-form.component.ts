import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormGroupTyped } from '../../../../TypedForms'
import { LoginForm } from '../../../types/LoginForm'

@Component({
  selector: 'plutus-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Input() loading: boolean = false
  @Input() parent!: FormGroupTyped<LoginForm>
  @Output('login') loginEvent = new EventEmitter<LoginForm>()

  constructor() {}

  ngOnInit(): void {}

  onLogin() {
    this.loginEvent.emit(this.parent.value)
  }
}
