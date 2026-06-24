export type TransactionType ="income"|"expense"
export type Category = "salary" | "food" | "transport" | "rent" | "entertainment" | "other"
export type Transaction ={
    id:string 
    title: string
    amount:number
    category: Category
    date :string
    type:TransactionType
}
export type TransactionState={
    transactions: Transaction[]
}