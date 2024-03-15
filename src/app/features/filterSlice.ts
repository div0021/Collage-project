import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';


export interface SliceState {
    // Define your state types here
    filterOpen:boolean;
}

const initialState: SliceState = {
    // Set initial state values here
    filterOpen:false
};

export const filterSlice = createSlice({
    name: 'filter', 		
    initialState,
    reducers: {
         onFilterClose:(state)=>{
            state.filterOpen=false;
         },
         onFilterOpen:(state)=>{
            state.filterOpen=true;
         }
}
});


export const {onFilterClose,onFilterOpen} = filterSlice.actions

//todo
export const selectFilterOpen = (state: RootState) => state.filter.filterOpen

export default filterSlice.reducer