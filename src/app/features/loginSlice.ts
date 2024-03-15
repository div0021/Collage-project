import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';


export interface LoginState {
    // Define your state types here
    loginOpen:boolean
}

const initialState: LoginState = {
    // Set initial state values here
    loginOpen:false
};

export const loginSlice = createSlice({
    name: 'login', 		
    initialState,
    reducers: {
         onLoginOpen:(state)=>{
            state.loginOpen=true;
         },
         onLoginClose:(state)=>{
            state.loginOpen=false;
         },
}
});


export const {onLoginClose,onLoginOpen} = loginSlice.actions

//todo
export const selectLoginOpen = (state: RootState) => state.login.loginOpen

export default loginSlice.reducer