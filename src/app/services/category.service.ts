import { Injectable } from '@angular/core'

// type MainCategories = 'Income' | 'Entertainment' | 'Education' | 'Investments' | 'Shopping'

export const Categories = {
  Income: ['Salary', 'Rent', 'Transfer In'],
  Entertainment: ['Movies'],
  Education: ['Books'],
  'Health & Fitness': ['Doctor', 'Pharmacy', 'Gym', 'Health Insurance'],
  'Gifts & Donations': ['Gift', 'Charity'],
  Investments: ['Mutual Fund', 'Stocks'],
  'Auto & Transport': ['Fuel', 'Public Transport'],
  Shopping: ['Clothing'],
  'Food & Dining': ['Restaurants', 'Drinks', 'Food Delivery'],
  'Bills & Utilities': ['Mobile Phone', 'Internet', 'Electricity'],
} as const

export const ExpenseCategories = (function (categories) {
  const { Income, ...rest } = categories
  return rest
})(Categories)

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
