import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { ProductType } from '../../lib/schema';

export interface CartDataType {
   data:ProductType;quantity:number
}

export interface CartState {
    // Define your state types here
    cartProduct:CartDataType[],
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
         addProductToCart:(state,action:PayloadAction<CartDataType[]>)=>{

            state.cartProduct=action.payload
         },
         onCartClose:(state)=>{
            state.open=false;

         },
         removeProductToCart:(state,action:PayloadAction<string>)=>{
            state.cartProduct=state.cartProduct.filter((item) => item.data._id !== action.payload);

         },
         updateProductQuantityToCart:(state,action:PayloadAction<{id:string,quantity:number}>)=>{

            const products = state.cartProduct.filter(el=>el.data._id!==action.payload.id);

            const product = state.cartProduct.find(el=>el.data._id===action.payload.id);

            if(!product){
               console.log("id not found CS");
               return;
            }

            products.push({...product,quantity:action.payload.quantity})

            state.cartProduct=products;


         },
         resetCart: (state) => {
            state.cartProduct=[];
            state.open=false;

         }
}
});


export const {addProductToCart,onCartClose,onCartOpen,removeProductToCart,resetCart,updateProductQuantityToCart} = cartSlice.actions

export const selectCartOpen = (state: RootState) => state.cart.open

export const selectCartProduct = (state:RootState)=>state.cart.cartProduct

export default cartSlice.reducer