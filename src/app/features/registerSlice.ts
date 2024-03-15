import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';


export interface SliceState {
    // Define your state types here
    registerOpen:boolean
}

const initialState: SliceState = {
    // Set initial state values here
    registerOpen:false,
};

export const registerSlice = createSlice({
    name: 'register', 	
    initialState,
    reducers: {
         onRegisterClose: (state) => {
            state.registerOpen=false;
         },
         onRegisterOpen: (state) => {
            state.registerOpen=true;
         }

}
});


export const {onRegisterClose,onRegisterOpen} = registerSlice.actions

//todo
export const selectRegisterOpen = (state: RootState) => state.register.registerOpen

export default registerSlice.reducer