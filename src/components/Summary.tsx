import { useAppSelector } from "../app/hooks"

export default function Summary() {
  const transactions = useAppSelector(
    (state) => state.transactions.transactions
  )

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((total, t) => total + t.amount, 0)

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((total, t) => total + t.amount, 0)

  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="bg-gray-900 rounded-2xl p-4 border border-green-500/20">
        <p className="text-gray-400 text-sm mb-1">Total Income</p>
        <p className="text-green-400 text-xl font-bold">
          + KES {totalIncome.toLocaleString()}
        </p>
      </div>
      <div className="bg-gray-900 rounded-2xl p-4 border border-red-500/20">
        <p className="text-gray-400 text-sm mb-1">Total Expenses</p>
        <p className="text-red-400 text-xl font-bold">
          - KES {totalExpense.toLocaleString()}
        </p>
      </div>
    </div>
  )
}