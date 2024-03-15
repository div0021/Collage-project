import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { ProductDataType } from '../../lib/types';
import ProductData from "../../data/product.json"


export interface CartState {
    // Define your state types here
    cartProduct:ProductDataType[],
    open:boolean
}

const initialState: CartState = {
    // Set initial state values here
    cartProduct:[],
    open:false,
};

export const cartSlice = createSlice({
    name: 'cart', 		
    initialState,
    reducers: {
         onCartOpen:(state)=>{
            state.open=true;
         },
         addProductToCart:(state,action:PayloadAction<string>)=>{

            state.cartProduct.push(...ProductData.filter(el=>el.id===action.payload))
         },
         onCartClose:(state)=>{
            state.open=false;

         },
         removeProductToCart:(state,action:PayloadAction<string>)=>{
            state.cartProduct=state.cartProduct.filter(el=>el.id!==action.payload)

         }
}
});


export const {addProductToCart,onCartClose,onCartOpen,removeProductToCart} = cartSlice.actions

export const selectCartOpen = (state: RootState) => state.cart.open

export const selectCartProduct = (state:RootState)=>state.cart.cartProduct

export default cartSlice.reducer