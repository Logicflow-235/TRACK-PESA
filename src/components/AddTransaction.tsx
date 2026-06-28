import { useState } from "react"
import { useAppDispatch } from "../app/hooks"
import { addTransaction } from "../features/transactions/transactionSlice"
import type { Category, TransactionType } from "../types"

export default function AddTransaction() {
  const dispatch = useAppDispatch()

  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState<Category>("food")
  const [date, setDate] = useState("")
  const [type, setType] = useState<TransactionType>("income")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title || !amount || !date) return

    const newTransaction = {
      id: Date.now().toString(),
      title,
      amount: Number(amount),
      category,
      date,
      type
    }

    dispatch(addTransaction(newTransaction))
    setTitle("")
    setAmount("")
    setCategory("food")
    setDate("")
    setType("income")
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl p-6 mb-4">
      <h2 className="text-white text-lg font-bold mb-4">Add Transaction</h2>

      <div className="flex flex-col gap-3">
       <div className="flex flex-col gap-1">
  <label className="text-gray-400 text-sm">Title</label>
  <input
    type="text"
    placeholder="e.g. Naivas Shopping"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className="bg-gray-800 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
  />
</div>
        <div className="flex flex-col gap-1">
  <label className="text-gray-400 text-sm">Amount</label>
  <input
    type="number"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
    className="bg-gray-800 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
  />
</div>
<div className="flex flex-col gap-1">
  <label className="text-gray-400 text-sm">Type</label>
  <select
          value={type}
          onChange={(e) => setType(e.target.value as TransactionType)}
          className="bg-gray-800 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

  </div>
      
<div className="flex flex-col gap-1">
  <label className="text-gray-400 text-sm">Category</label>
   <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="bg-gray-800 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="salary">Salary</option>
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="rent">Rent</option>
          <option value="entertainment">Entertainment</option>
          <option value="other">Other</option>
        </select>
  </div>
       
<div className="flex flex-col gap-1">
  <label className="text-gray-400 text-sm">Date</label>
  <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-gray-800 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
        /></div>
        

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors"
        >
          Add Transaction
        </button>
      </div>
    </form>
  )
}