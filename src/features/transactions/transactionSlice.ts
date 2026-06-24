import type { TransactionState, Transaction } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
const initialState: TransactionState ={
    transactions: []
}
const transactionSlice =createSlice({
    name: "transactions",
    initialState,
    reducers: {
        addTransaction: (state, action: PayloadAction <Transaction>)=>{
            state.transactions.push(action.payload)
        },
        deleteTransaction: (state, action: PayloadAction<string>)=>{
            state.transactions =state.transactions.filter(
                (t)=>t.id !== action.payload
            )
        }
    }
})
export const {addTransaction, deleteTransaction} = transactionSlice.actions
export default transactionSlice.reducer