import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';


export interface SliceState {
    // Define your state types here
    searchOpen:boolean
}

const initialState: SliceState = {
    // Set initial state values here
    searchOpen:false,
};

export const searchSlice = createSlice({
    name: 'search', 		
    initialState,
    reducers: {
         onSearchClose:(state)=>{
            state.searchOpen=false;
         },
         onSearchOpen:(state)=>{
            state.searchOpen=true;
         }

}
});


export const {onSearchClose,onSearchOpen} = searchSlice.actions

//todo
export const selectSearchOpen = (state: RootState) => state.search.searchOpen

export default searchSlice.reducer