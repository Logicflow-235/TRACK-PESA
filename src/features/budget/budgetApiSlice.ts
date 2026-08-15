import { apiSlice } from "../api/apiSlice";

export const budgetApiSlice =apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        addBudget:builder.mutation({
            query: (newBudget)=>({
                url:'/budget',
                method:'POST',
                body:newBudget
            }),
            invalidatesTags:['Budget']
        }),
        getBudget:builder.query({
            query: ()=>'/budget',
            providesTags: ['Budget']
        }),
        deleteBudget:builder.mutation({
            query: ()=>({
                url:'/budget',
                method:'DELETE'
            }),invalidatesTags:['Budget']
        }),
        editBudget: builder.mutation({
            query: ()=>({
                url:'/budget',
                method: 'PUT',
            }),
            invalidatesTags:['Budget']
        })
    })
});
export const{useEditBudgetMutation, useAddBudgetMutation, useGetBudgetQuery, useDeleteBudgetMutation}=budgetApiSlice
