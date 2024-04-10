import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';


export interface SurveyState {
    // Define your state types here
    open:boolean
}

const initialState: SurveyState = {
    // Set initial state values here
    open:false,
};

export const surveySlice = createSlice({
    name: 'survey',
    initialState,
    reducers: {
         setSurveyOpen:(state)=>{
            state.open=true;
         },
         setSurveyClose:(state)=>{
            state.open=false;
         },
         setSurveyDisplayChange:(state,action:PayloadAction<boolean>)=>{
            state.open=action.payload;

         }
}
});


export const {setSurveyClose,setSurveyOpen,setSurveyDisplayChange} = surveySlice.actions

//todo
export const selectSurveyOpen = (state: RootState) => state.survey.open

export default surveySlice.reducer