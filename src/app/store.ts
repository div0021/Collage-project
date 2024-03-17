import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./features/cartSlice"
import loginReducer from "./features/loginSlice"
import registerReducer from "./features/registerSlice"
import filterReducer from "./features/filterSlice"
import searchReducer from "./features/searchSlice"
import authReducer from "./features/authSlice"
import { apiSlice } from './api/apiSlice'

export const store = configureStore({
    reducer: {
        cart:cartReducer,
        login:loginReducer,
        register:registerReducer,
        filter:filterReducer,
        search:searchReducer,
        auth:authReducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware:getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch