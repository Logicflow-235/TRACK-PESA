import { useAppSelector } from "../app/hooks";
export default function Balance (){
    const transactions = useAppSelector(
        (state)=>state.transactions.transactions
    )
    const balance  = transactions.reduce((total, t)=>{
        return t.type === "income"? total +t.amount :total -t.amount
    }, 0)
    return(
        <div className="bg-green-500 rounded-2xl p-6 mb-4 text-center shadow-lg shadow-green-500/50">
            <h2 className="text-white text-sm font-medium uppercase tracking-widest mb-2"> Total Balance </h2>
            <h1 className="text-white text-4xl font-bold"> KES {balance.toLocaleString()}</h1>
        </div>
    )
}