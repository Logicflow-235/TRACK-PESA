import { apiSlice } from "../api/apiSlice";
export const authApiSlice =apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        register:builder.mutation({
            query:(userData)=>({
                url:'/register',
                method:'POST',
                body:userData,
            }),
           
        }),
        login: builder.mutation({
            query:(credentials)=>({
                url:'/login',
                method:'POST',
                body: credentials
            })
        })
    })
});
export const { useRegisterMutation, useLoginMutation } = authApiSlice;