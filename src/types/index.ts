export type TransactionType = "income" | "expense"

export type Category =
  | "salary"
  | "food"
  | "transport"
  | "rent"
  | "entertainment"
  | "other"
  | "savings"
  | "health"
  | "investment"

export type Transaction = {
  _id: string
  title: string
  amount: number
  category: Category
  date: string
  type: TransactionType
  user: string
}

export type TransactionState = {
  transactions: Transaction[]
}


export type BudgetCategory = {
    _id?: string
  category: Category
  percentage: number
}

export type Budget = {
  _id: string
  user: string
  budgets: BudgetCategory[]
}