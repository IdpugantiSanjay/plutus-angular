import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CreateBillViewComponent } from './create-bill-view.component'

describe('CreateBillViewComponent', () => {
  let component: CreateBillViewComponent
  let fixture: ComponentFixture<CreateBillViewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateBillViewComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CreateBillViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
