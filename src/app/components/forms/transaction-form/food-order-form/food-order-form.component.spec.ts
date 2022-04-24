import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FoodOrderFormComponent } from './food-order-form.component'
import { RatingComponent } from '../../../rating/rating.component'
import { ReactiveFormsModule } from '@angular/forms'
import { ButtonDirective } from '../../../../directories/button.directive'

describe('FoodOrderFormComponent', () => {
  let component: FoodOrderFormComponent
  let fixture: ComponentFixture<FoodOrderFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodOrderFormComponent, RatingComponent, ButtonDirective],
      imports: [ReactiveFormsModule],
    }).compileComponents()

    fixture = TestBed.createComponent(FoodOrderFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
