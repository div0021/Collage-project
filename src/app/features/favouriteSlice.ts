import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { ProductType } from '../../lib/schema';

// export interface FavouriteDataType {
//    data:ProductType;
// }

export interface FavouriteState {
    // Define your state types here
    favouriteProduct:ProductType[],
    open:boolean
}

const initialState: FavouriteState = {
    // Set initial state values here
    favouriteProduct:[],
    open:false,
};

export const favouriteSlice = createSlice({
    name: 'favourite', 		
    initialState,
    reducers: {
         onFavouriteOpen:(state)=>{
            state.open=true;
         },
         addProductToFavourite:(state,action:PayloadAction<ProductType[]>)=>{

            state.favouriteProduct=action.payload
         },
         onFavouriteClose:(state)=>{
            state.open=false;

         },
         removeProductToFavourite:(state,action:PayloadAction<string>)=>{
            state.favouriteProduct=state.favouriteProduct.filter((item) => item._id !== action.payload);

         },
         resetFavourite: () => {
            return  initialState;
         
         }
}
});


export const {addProductToFavourite,onFavouriteClose,onFavouriteOpen,removeProductToFavourite,resetFavourite} = favouriteSlice.actions

export const selectFavouriteOpen = (state: RootState) => state.favourite.open

export const selectFavouriteProduct = (state:RootState)=>state.favourite.favouriteProduct

export default favouriteSlice.reducer