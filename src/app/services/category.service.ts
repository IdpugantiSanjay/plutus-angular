import { Injectable } from '@angular/core'
import { Categories, ExpenseCategories } from '../../types/category'

// type MainCategories = 'Income' | 'Entertainment' | 'Education' | 'Investments' | 'Shopping'

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  #categories = Object.entries(Categories)

  constructor() {}

  get categories() {
    return this.#categories as unknown as [string, string[]]
  }

  get expenseCategories(): [string, string[]] {
    return Object.entries(ExpenseCategories) as unknown as [string, string[]]
  }
}
