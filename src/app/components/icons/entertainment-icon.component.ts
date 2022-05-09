import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'plutus-entertainment-icon',
  template: `
    <!--    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style="fill: currentColor">-->
    <!--      <title>Entertainment</title>-->
    <!--      <path-->
    <!--        d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm.001 6c-.001 0-.001 0 0 0h-.465l-2.667-4H20l.001 4zM15.5 15 10 18v-6l5.5 3zm-.964-6-2.667-4h2.596l2.667 4h-2.596zm-2.404 0H9.536L6.869 5h2.596l2.667 4zM4 5h.465l2.667 4H4V5z"></path>-->
    <!--    </svg>-->
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style="fill: currentColor">
      <path
        d="M10 20v-6l5 3-5 3zm14-15.625l-.008-.042-1.008-4.333-21.169 4.196c-1.054.209-1.815 1.134-1.815 2.207v14.597c0 1.657 1.343 3 3 3h18c1.656 0 3-1.343 3-3v-14h-12.734l12.734-2.625zm-3.89-2.618l2.396 1.604-2.994.595-2.398-1.605 2.996-.594zm-5.897 1.169l2.399 1.606-2.993.595-2.402-1.607 2.996-.594zm-5.905 1.171l2.403 1.608-2.993.595-2.406-1.61 2.996-.593zm2.538 3.903l-2.039 2h-3.054l2.039-2h3.054zm8.978 0h3.054l-2.038 2h-3.055l2.039-2zm-6.012 0h3.053l-2.039 2h-3.053l2.039-2zm8.188 4v8.75c0 .69-.56 1.25-1.25 1.25h-17.5c-.69 0-1.25-.56-1.25-1.25v-8.75h20z" />
    </svg>
  `,
  styles: [],
})
export class EntertainmentIconComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
