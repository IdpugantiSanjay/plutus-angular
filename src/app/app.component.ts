import { Component } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { FormGroupTyped } from '../TypedForms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'plutus-web-experimental'

  form = new FormGroup({ amount: new FormControl(0) }) as FormGroupTyped<{ amount: number }>

  constructor() {}
}
