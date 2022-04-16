import { TransactionFormComponent } from './transaction-form.component'
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing'
import { FoodOrderFormComponent } from './food-order-form/food-order-form.component'
import { FormGroupTyped } from '../../../../TypedForms'
import { TransactionForm } from '../../../types/TransactionForm'
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { TransactionCommonPropsFormComponent } from './transaction-common-props-form/transaction-common-props-form.component'
import { RatingComponent } from '../../rating/rating.component'

describe('TransactionFormComponent', () => {
  let component: TransactionFormComponent
  let fixture: ComponentFixture<TransactionFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        TransactionFormComponent,
        FoodOrderFormComponent,
        TransactionCommonPropsFormComponent,
        RatingComponent,
      ],
      providers: [FormBuilder],
    }).compileComponents()

    fixture = TestBed.createComponent(TransactionFormComponent)
    component = fixture.componentInstance

    const fb = new FormBuilder()
    component.parent = fb.group({
      category: new FormControl(),
      description: new FormControl(),
      amount: new FormControl(),
      dateTime: new FormControl(),
    }) as FormGroupTyped<TransactionForm>

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('when category is selected save button should be changed to next button', () => {
    const categorySelect = fixture.debugElement.query(By.css('#category')).nativeElement as HTMLSelectElement
    categorySelect.value = 'Food Order'
    categorySelect.dispatchEvent(new Event('change'))

    fixture.detectChanges()

    const saveButton = fixture.nativeElement.querySelector(
      'button[data-test-id="save-next-button"]'
    ) as HTMLButtonElement

    expect(component.parent.value.category).toBe('Food Order')
    expect(saveButton.getAttribute('type')).toBe('button')
    expect(saveButton.textContent).toContain('Next')
  })

  it('when category is anything other than Food Order submit button should be Save Button', () => {
    const categorySelect = fixture.debugElement.query(By.css('#category')).nativeElement as HTMLSelectElement
    categorySelect.value = 'Drinks'
    categorySelect.dispatchEvent(new Event('change'))

    fixture.detectChanges()

    const saveButton = fixture.nativeElement.querySelector(
      'button[data-test-id="save-next-button"]'
    ) as HTMLButtonElement

    expect(component.parent.value.category).toBe('Drinks')
    expect(saveButton).toBeTruthy()
    expect(saveButton.getAttribute('type')).toBe('submit')
    expect(saveButton.textContent).toContain('Save')
  })

  it('when form is invalid submit button should be disabled', () => {
    const saveButton = fixture.nativeElement.querySelector(
      'button[data-test-id="save-next-button"]'
    ) as HTMLButtonElement
    expect(saveButton.disabled).toBeTruthy()
  })

  it('when form is valid submit button should not be disabled', () => {
    const categorySelect = fixture.debugElement.query(By.css('#category')).nativeElement as HTMLSelectElement
    categorySelect.value = 'Drinks'
    categorySelect.dispatchEvent(new Event('change'))

    const amountInput = fixture.debugElement.query(By.css('#amount')).nativeElement as HTMLInputElement
    amountInput.value = '100'
    amountInput.dispatchEvent(new Event('input'))

    fixture.detectChanges()

    const saveButton = fixture.nativeElement.querySelector(
      'button[data-test-id="save-next-button"]'
    ) as HTMLButtonElement
    expect(saveButton.disabled).toBeFalsy()
  })

  it('should show foodOrder form when next button is clicked', function () {
    const categorySelect = fixture.debugElement.query(By.css('#category')).nativeElement as HTMLSelectElement
    categorySelect.value = 'Food Order'
    categorySelect.dispatchEvent(new Event('change'))

    fixture.detectChanges()

    const saveButton = fixture.nativeElement.querySelector(
      'button[data-test-id="save-next-button"]'
    ) as HTMLButtonElement

    saveButton.dispatchEvent(new Event('click'))

    fixture.detectChanges()

    const foodOrderForm = fixture.debugElement.query(By.directive(FoodOrderFormComponent))
    const commonForm = fixture.debugElement.query(By.directive(TransactionCommonPropsFormComponent))
    expect(commonForm).toBeFalsy()
    expect(foodOrderForm).toBeTruthy()
  })

  it('should be next even when user goes to foodOrder form and comes back', fakeAsync(() => {
    const amountInput = fixture.debugElement.query(By.css('#amount')).nativeElement as HTMLInputElement
    amountInput.value = '100'
    amountInput.dispatchEvent(new Event('input'))

    const categorySelect = fixture.debugElement.query(By.css('#category')).nativeElement as HTMLSelectElement
    categorySelect.value = 'Food Order'
    categorySelect.dispatchEvent(new Event('change'))

    fixture.detectChanges()

    let saveButton = fixture.nativeElement.querySelector('button[data-test-id="save-next-button"]') as HTMLButtonElement

    saveButton.dispatchEvent(new Event('click'))

    fixture.detectChanges()

    const backButton = fixture.nativeElement.querySelector('[data-test-id="back-button"]') as HTMLButtonElement
    backButton.dispatchEvent(new Event('click'))

    fixture.detectChanges()

    const foodForm = fixture.debugElement.query(By.directive(FoodOrderFormComponent))
    const commonForm = fixture.debugElement.query(By.directive(TransactionCommonPropsFormComponent))
    expect(foodForm).toBeFalsy()
    expect(commonForm).toBeTruthy()

    saveButton = fixture.nativeElement.querySelector('button[data-test-id="save-next-button"]') as HTMLButtonElement

    expect(saveButton).toBeTruthy()
    expect(saveButton.disabled).toBeFalse()
    expect(saveButton.textContent).toContain('Next')
    expect(saveButton.type).toBe('button')
  }))
})
