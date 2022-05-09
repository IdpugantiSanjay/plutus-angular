export const ONE_TIME = 1
export const MONTHLY = 2
export const THREE_MONTHS = 3
export const SIX_MONTHS = 4
export const YEARLY = 5

export type RepeatFrequency = typeof ONE_TIME | typeof MONTHLY | typeof THREE_MONTHS | typeof SIX_MONTHS | typeof YEARLY

export type Bill = {
  dueDate: Date
  autoMarkAsPaid: boolean
  category: string
  biller: string
  amount: number
  repeat: RepeatFrequency
}
