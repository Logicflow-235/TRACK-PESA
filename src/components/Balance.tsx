import { useAppSelector } from "../app/hooks";
export default function Balance (){
    const transactions = useAppSelector(
        (state)=>state.transactions.transactions
    )
    const balance  = transactions.reduce((total, t)=>{
        return t.type === "income"? total +t.amount :total -t.amount
    }, 0)
    return(
        <div>
            <h2> Total Balance </h2>
            <h1> KES {balance.toLocaleString()}</h1>
        </div>
    )
}