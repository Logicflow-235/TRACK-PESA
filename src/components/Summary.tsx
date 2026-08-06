import { useGetTransactionsQuery } from "../features/transactions/transactionApiSlice"
import type { Transaction } from "../types/index";
export default function Summary() {
  const {data:transactions =[], isLoading, error} = useGetTransactionsQuery(undefined);
  const totalIncome = transactions
    .filter((t:Transaction) => t.type === "income")
    .reduce((total:any, t:Transaction) => total + t.amount, 0)

  const totalExpense = transactions
    .filter((t:Transaction) => t.type === "expense")
    .reduce((total:any, t:Transaction)=> total - t.amount, 0)

    if(isLoading){
      return(
       <div className="bg-gray-900 rounded-2xl p-6 text-center">
        <p className="text-gray-400">Loading transactions...</p>
      </div>)
    }
     if(error){
      return(
       <div className="bg-gray-900 rounded-2xl p-6 text-center">
        <p className="text-red-500">Loading transactions...</p>
      </div>)
    }

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