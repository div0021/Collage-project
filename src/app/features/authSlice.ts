import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { getObjectFromLocalStorage, removeObjectFromLocalStorage, storeObjectInLocalStorage } from '../../lib/user-store';

export enum  UserRoles {
    ADMIN = 'admin',
    USER = 'user'
}

export type UserInfoTypes={
    name:string;
    email:string;
    role: UserRoles;
    isEmailVerified:boolean,
    userSurvey:boolean,
    image?:string,
    createdAt:Date;
    updatedAt:Date;
    id:string;
}

export interface AuthState {
    // Define your state types here
    user: UserInfoTypes | null;
}

const SaveState = getObjectFromLocalStorage<UserInfoTypes>('user');



const initialState: AuthState = {
    // Set initial state values here
    user:null
};

export const authSlice = createSlice({
    name: 'auth', 		
    // initialState: initialState, 	
    initialState: SaveState ? {user:SaveState}:initialState, 	
    reducers: {
         setCredentials:(state,action:PayloadAction<Omit<UserInfoTypes,"id"> & {_id:string}>) =>{
            state.user= {...action.payload,id:action.payload._id}

            storeObjectInLocalStorage('user',{...action.payload,id:action.payload._id})
         },
         logOut:(state)=>{
           state.user=null
           removeObjectFromLocalStorage('user')
         },
}
});


export const {logOut,setCredentials} = authSlice.actions


export const selectCurrentUser = (state: RootState) => state.auth.user

export default authSlice.reducer