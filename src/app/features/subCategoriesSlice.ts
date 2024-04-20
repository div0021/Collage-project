import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';


export interface SliceState {
    // Define your state types here
    subCategories:{label:string}[]
}

const initialState: SliceState = {
    // Set initial state values here
    subCategories:[]
};

export const subCategories = createSlice({
    name: 'subcategories', 	
    initialState,
    reducers: {
         addSubCategories: (state, action:PayloadAction<{label:string}[]>) =>{
            state.subCategories=action.payload;
         },
}
});


export const {addSubCategories} = subCategories.actions

//todo
export const selectSubCategories = (state: RootState) => state.subcategories.subCategories;

export default subCategories.reducer