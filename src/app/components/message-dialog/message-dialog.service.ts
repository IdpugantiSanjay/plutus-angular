import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class MessageDialogService {
  constructor() {}

  show() {
    const messageDialog = document.querySelector('#message-dialog') as any

    if ('showModal' in messageDialog! && typeof messageDialog?.showModal == 'function') {
      messageDialog.showModal()
    }
  }
}
