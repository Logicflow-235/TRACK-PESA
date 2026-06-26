import { useAppDispatch } from "../app/hooks";
import { useState } from "react";
import { addTransaction } from "../features/transactions/transactionSlice";
import type {Category, TransactionType} from "../types"
export default function AddTransaction(){
const [title, setTitle] = useState("")
const [amount, setAmount] = useState("")
const [category, setCategory] = useState<Category>("food")
const [date, setDate] = useState("")
const [type, setType] = useState<TransactionType>("income")
const dispatch =useAppDispatch()
const handleSubmit= (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(!title || !amount ||!date)return
    const newTransaction ={
        id:Date.now().toString(),
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
  return(
    <form onSubmit={handleSubmit}>
        <h2>Add Transactions</h2>
        <input 
        type="text" placeholder="Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}/>
        <input 
        type="number" placeholder="Amount"
        value={amount}
        onChange={(e)=>setAmount(e.target.value)}/>
        <select value={type} onChange={(e)=>setType(e.target.value as TransactionType)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>

        </select>
        <select value={category} onChange={(e)=>setCategory(e.target.value as Category)}>
            <option value="salary">Salary</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="rent">Rent</option>
            <option value="entertainment">Entertainment</option>
            <option value="other">Other</option>

        </select>
        <input 
        type="date"
        value={date}
        onChange={(e)=>setDate(e.target.value)}/>
        <button type="submit">Add Transaction</button>
        
    </form>
  )
}