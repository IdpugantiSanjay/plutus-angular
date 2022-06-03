import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms'

export type ToFormGroup<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<any, any> ? FormGroup<ToFormGroup<T[K]>> : FormControl<T[K]>
}

type Primitive = number | Date | string | boolean | bigint

export type FormGroupType<T extends {}> = {
  [K in keyof T]: T[K] extends Primitive
    ? FormControl<T[K]>
    : T[K] extends []
    ? FormArray<any>
    : T[K] extends {}
    ? FormGroup<FormGroupType<T[K]>>
    : never
}

type ValidatorType = (control: AbstractControl<any, any>) => ValidationErrors | null

export type FormBuilderType<T extends {}, V extends ValidatorFn[] = []> = {
  [K in keyof T]: T[K] | [T[K], ...V]
}

export type Flatten<T extends {}> = {
  [K in keyof T]: T[K] extends FormControl<infer R> ? R : Flatten<T[K]>
}
