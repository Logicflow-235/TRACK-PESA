import { useGetTransactionsQuery } from "../features/transactions/transactionApiSlice";
import type { Transaction } from "../types/index";
export default function Balance (){
    const {data:transactions =[], isLoading, error}=useGetTransactionsQuery(undefined);
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
    const balance  = transactions.reduce((total:any, t:Transaction)=>{
        return t.type === "income"? total +t.amount :total -t.amount
    }, 0)
    return(
        <div className="bg-green-500 rounded-2xl p-6 mb-4 text-center shadow-lg shadow-green-500/50">
            <h2 className="text-white text-sm font-medium uppercase tracking-widest mb-2"> Total Balance </h2>
            <h1 className="text-white text-4xl font-bold"> KES {balance.toLocaleString()}</h1>
        </div>
    )
}