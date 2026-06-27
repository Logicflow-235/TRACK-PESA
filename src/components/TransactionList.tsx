import { useAppSelector, useAppDispatch } from "../app/hooks"
import { deleteTransaction } from "../features/transactions/transactionSlice"
import { useState } from "react"
import type { Category } from "../types"
export default function TransactionList() {
  const dispatch = useAppDispatch()
  const transactions = useAppSelector(
    (state) => state.transactions.transactions
  )
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all")
  const filteredTransactions = selectedCategory === "all"
    ? transactions
    : transactions.filter((t) => t.category === selectedCategory)
  if (transactions.length === 0) {
    return <p>No transactions yet!</p>
  }

  return (
    <div>
      <h2>Transactions</h2>
      <select
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value as Category | "all")}
>
  <option value="all">All</option>
  <option value="salary">Salary</option>
  <option value="food">Food</option>
  <option value="transport">Transport</option>
  <option value="rent">Rent</option>
  <option value="entertainment">Entertainment</option>
  <option value="other">Other</option>
</select>
      {filteredTransactions.map((t) => (
        <div key={t.id}>
          <div>
            <p>{t.title}</p>
            <p>{t.category} • {t.date}</p>
          </div>
          <div>
            <p>{t.type === "income" ? "+" : "-"} KES {t.amount.toLocaleString()}</p>
            <button onClick={() => dispatch(deleteTransaction(t.id))}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}