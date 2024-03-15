import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./features/cartSlice"
import loginReducer from "./features/loginSlice"
import registerReducer from "./features/registerSlice"
import filterReducer from "./features/filterSlice"
import searchReducer from "./features/searchSlice"

export const store = configureStore({
    reducer: {
        cart:cartReducer,
        login:loginReducer,
        register:registerReducer,
        filter:filterReducer,
        search:searchReducer,
    },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch