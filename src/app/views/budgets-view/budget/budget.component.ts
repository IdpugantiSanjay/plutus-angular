import { Component, Input, OnInit } from '@angular/core'

export type BudgetInput = {
  name: string
  consumed: number
  capacity: number
}

@Component({
  selector: 'plutus-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
})
export class BudgetComponent implements OnInit {
  @Input() input!: BudgetInput

  get percent(): `${number}%` {
    if ((this.input.consumed / this.input.capacity) * 100 > 100) return '100%'
    return `${(this.input.consumed / this.input.capacity) * 100}%`
  }

  constructor() {}

  ngOnInit(): void {}
}
