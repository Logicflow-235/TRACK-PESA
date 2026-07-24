import {apiSlice} from '../api/apiSlice';

export const transactionApiSlice =apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        addTransaction: builder.mutation({
            query: (newTransaction)=>({
                url:'/transaction',
                method:'POST',
                body:newTransaction
            }),
            invalidatesTags:['Transaction']
        }),
        getTransactions :builder.query({
            query:()=>'/transactions',
            providesTags:['Transaction']
        }),
        deleteTransaction: builder.mutation({
            query:(id)=>({
                url: `/transaction/${id}`,
                method:'DELETE',
            }),
            invalidatesTags:['Transaction']
        }),
    })
});
export const { useGetTransactionsQuery,
    useAddTransactionMutation,
    useDeleteTransactionMutation,
}= transactionApiSlice;