import { TransactionFormComponent } from './transaction-form.component'
import { ComponentFixture, TestBed } from '@angular/core/testing'

describe('TransactionFormComponent', () => {
  let component: TransactionFormComponent
  let fixture: ComponentFixture<TransactionFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionFormComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(TransactionFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
