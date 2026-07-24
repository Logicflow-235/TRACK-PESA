import { useState } from "react"
import { useGetTransactionsQuery, useDeleteTransactionMutation } from "../features/transactions/transactionApiSlice"
import type { Category } from "../types"

export default function TransactionList() {
  const { data: transactions = [], isLoading, error } = useGetTransactionsQuery(undefined)
  const [deleteTransaction] = useDeleteTransactionMutation()

  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all")

  const filteredTransactions = selectedCategory === "all"
    ? transactions
    : transactions.filter((t: any) => t.category === selectedCategory)

  if (isLoading) {
    return (
      <div className="bg-gray-900 rounded-2xl p-6 text-center">
        <p className="text-gray-400">Loading transactions...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-900 rounded-2xl p-6 text-center">
        <p className="text-red-400">Failed to load transactions.</p>
      </div>
    )
  }

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
        {filteredTransactions.map((t: any) => (
          <div
            key={t._id}
            className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-3"
          >
            <div>
              <p className="text-white font-medium">{t.title}</p>
              <p className="text-gray-400 text-sm">{t.category}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className={`font-bold ${t.type === "income" ? "text-green-400" : "text-red-400"}`}>
                {t.type === "income" ? "+" : "-"} KES {t.amount.toLocaleString()}
              </p>
              <button
                onClick={() => deleteTransaction(t._id)}
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