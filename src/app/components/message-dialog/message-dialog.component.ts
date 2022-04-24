import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'plutus-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss'],
})
export class MessageDialogComponent implements OnInit {
  @Input('message') message!: string

  constructor() {}

  ngOnInit(): void {}
}
