import { useAppSelector } from "../app/hooks";
export default function Summary (){
    const transactions = useAppSelector(
        (state)=>state.transactions.transactions
    )
    const totalIncome = transactions .filter((t)=> t.type=== "income")
    .reduce ((total, t)=> total +t.amount, 0)
    const totalExpense = transactions .filter((t)=> t.type=== "expense")
    .reduce ((total, t)=> total +t.amount, 0)
    return (
        <div>
            <div>
                <h3>Total Income</h3>
                <p> KES {totalIncome.toLocaleString()}</p>
            </div>
            <div>
                <h3>Total </h3>
                <p> KES {totalExpense.toLocaleString()}</p>
            </div>
        </div>
    )
}