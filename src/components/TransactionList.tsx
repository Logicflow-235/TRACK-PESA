import { useState } from "react"
import { useAppSelector, useAppDispatch } from "../app/hooks"
import { deleteTransaction } from "../features/transactions/transactionSlice"
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
    return (
      <div className="bg-gray-900 rounded-2xl p-6 text-center">
        <p className="text-gray-400">No transactions yet!</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-lg font-bold">Transactions</h2>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as Category | "all")}
          className="bg-gray-800 text-white text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="all">All</option>
          <option value="salary">Salary</option>
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="rent">Rent</option>
          <option value="entertainment">Entertainment</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="flex flex-col gap-3">
        {filteredTransactions.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-3"
          >
            <div>
              <p className="text-white font-medium">{t.title}</p>
              <p className="text-gray-400 text-sm">{t.category} • {t.date}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className={`font-bold ${t.type === "income" ? "text-green-400" : "text-red-400"}`}>
                {t.type === "income" ? "+" : "-"} KES {t.amount.toLocaleString()}
              </p>
              <button
                onClick={() => dispatch(deleteTransaction(t.id))}
                className="text-gray-500 hover:text-red-400 transition-colors text-sm"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}