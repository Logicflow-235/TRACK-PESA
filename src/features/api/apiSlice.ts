import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {RootState} from '../../app/store';
export const apiSlice= createApi({
    reducerPath:'api',
    baseQuery :fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
        prepareHeaders :(headers, {getState}) =>{
            const token= (getState()as RootState).auth.token;
            if (token){
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        } 
    }),
    tagTypes: ['Transaction'],
    endpoints: (_builder)=>({}),
});