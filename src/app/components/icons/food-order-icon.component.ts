import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'plutus-food-order-icon',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor">
      <title>Food Delivery</title>
      <path
        d="M21,10h0a3.58,3.58,0,0,0-1.8-3,3.66,3.66,0,0,0-3.63-3.13,3.86,3.86,0,0,0-1,.13A3.7,3.7,0,0,0,9.46,4a3.86,3.86,0,0,0-1-.13A3.66,3.66,0,0,0,4.81,7,3.58,3.58,0,0,0,3,10H3a1,1,0,0,0-1,1,10,10,0,0,0,5,8.66V21a1,1,0,0,0,1,1h8a1,1,0,0,0,1-1V19.66A10,10,0,0,0,22,11,1,1,0,0,0,21,10ZM5,10A1.59,1.59,0,0,1,6.11,8.61l.83-.26L6.78,7.5A1.64,1.64,0,0,1,8.44,5.88a1.78,1.78,0,0,1,.83.2l.81.45.5-.77a1.71,1.71,0,0,1,2.84,0l.5.77.81-.45a1.78,1.78,0,0,1,.83-.2,1.65,1.65,0,0,1,1.67,1.6l-.16.85.82.28A1.59,1.59,0,0,1,19,10Z"></path>
    </svg>
  `,
  styles: [],
})
export class FoodOrderIconComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
