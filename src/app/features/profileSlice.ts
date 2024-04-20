import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { ProfileDataType } from '../../lib/types';

export interface ProfileState {
    // Define your state types here
    userProfile:ProfileDataType|undefined,
    open:boolean
}

const initialState: ProfileState = {
    // Set initial state values here
    userProfile:undefined,
    open:false,
};

export const profileSlice = createSlice({
    name: 'profile', 		
    initialState,
    reducers: {
         onProfileOpen:(state)=>{
            state.open=true;
         },
         addProfile:(state,action:PayloadAction<ProfileDataType>)=>{

            state.userProfile=action.payload
         },
         onProfileClose:(state)=>{
            state.open=false;

         },
         removeProfile:(state)=>{
            state.userProfile=undefined

         }
}
});


export const {addProfile,onProfileClose,onProfileOpen,removeProfile} = profileSlice.actions

export const selectProfileOpen = (state: RootState) => state.profile.open

export const selectUserProfile = (state:RootState)=>state.profile.userProfile

export default profileSlice.reducer