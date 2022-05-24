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
  Subscriptions: ['Amazon', 'Spotify', 'Aha', 'Zee5', 'Disney+'],
} as const

export const MainCategories = Object.keys(Categories) as Array<keyof typeof Categories>

export const ExpenseCategories = (function (categories) {
  const { Income, ...rest } = categories
  return rest
})(Categories)
