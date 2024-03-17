
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseURL = import.meta.env.VITE_SERVER_URL

const baseQuery = fetchBaseQuery({
    baseUrl:baseURL,
    credentials:'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if(token){
             headers.set('authorization',`Bearer ${token}`);
            }

        return headers;
      }
})

export const apiSlice = createApi({
    baseQuery:baseQuery,
    endpoints:()=>({})
})