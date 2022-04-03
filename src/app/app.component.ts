import { Component } from '@angular/core'
import { TransactionForm } from './types/TransactionForm'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'plutus-web-experimental'
  constructor() {}

  submit(form: TransactionForm) {
    console.log(form)
  }
}
