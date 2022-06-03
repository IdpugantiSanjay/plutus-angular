import { FormGroup, ValidatorFn } from '@angular/forms'
import { FormGroupType } from '../../ToFormGroup'

export function setValidators<T extends {}, V = Partial<{ [K in keyof T]: ValidatorFn | ValidatorFn[] }>>(
  fg: FormGroup<FormGroupType<T>>,
  options: V
) {
  for (const [k, v] of Object.entries(options)) {
    fg.get(k)?.setValidators(v)
  }
}
