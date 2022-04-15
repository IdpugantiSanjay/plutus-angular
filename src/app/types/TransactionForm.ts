export type TransactionForm = {
  category: string
  amount: number
  description: string
  dateTime: Date
  foodOrder?: FoodOrderForm
}

export type FoodOrderForm = {
  rating: number
  dish: string
  restaurant: string
}

export type TransactionFormButtonState = {
  name: 'Save' | 'Next'
  type: 'submit' | 'button'
  isDisabled: boolean
}
