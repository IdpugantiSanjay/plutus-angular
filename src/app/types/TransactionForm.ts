export type TransactionForm = {
  category: string
  amount: number
  description: string
  date: string
  time: string
  foodOrder?: FoodOrder
}

export type FoodOrder = {
  rating: number
  dish: string
  restaurant: string
}
