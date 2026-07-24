import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "../features/transactions/transactionApiSlice"
import { apiSlice } from "../features/api/apiSlice";
import authReducer from "../features/auth/authSlice"
export const store = configureStore({
    reducer:{
        transaction : transactionReducer,
        auth:authReducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware().concat(apiSlice.middleware),
});
export type RootState =ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch