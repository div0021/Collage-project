import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

export type Category = "Ayurvedic" | "Organic" | "Ecofriendly";

interface FilterOption {
  category: Category;
  subcategories:string[];
  filterPriceOption:{min: number, max: number}|undefined;

}
export interface SliceState {
    // Define your state types here
    filterOpen:{
      category:Category,
      open:boolean
    };
    filterCategory:FilterOption[];
    
}

const initialState: SliceState = {
    // Set initial state values here
    filterOpen:{
      category:"Ayurvedic",
      open:false
    },
    filterCategory:[{
      category: "Ayurvedic",
      subcategories: [],
      filterPriceOption: undefined
    },{
      category: "Ecofriendly",
      subcategories: [],
      filterPriceOption: undefined
    },{
      category: "Organic",
      subcategories: [],
      filterPriceOption: undefined
    },
   ],

};

export const filterSlice = createSlice({
    name: 'filter', 		
    initialState,
    reducers: {
         onFilterClose:(state,action:PayloadAction<{category:Category}>)=>{
            state.filterOpen={category:action.payload.category,open:false};
         },
         onFilterOpen:(state,action:PayloadAction<{category:Category}>)=>{
            state.filterOpen={category:action.payload.category,open:true};
         },
         addFilterSubCategoryOptions:(state,action:PayloadAction<{category:Category,subCategory:string}>)=>{

            state.filterCategory=state.filterCategory.map((item)=>
                item.category===action.payload.category ?    
                        { ...item , subcategories : item.subcategories.indexOf(action.payload.subCategory) === -1 ? [...item.subcategories, action.payload.subCategory]:item.subcategories}   
                      : item  
            )


         },
         removeFilterSubCategoryOptions:(state,action: PayloadAction<{category:Category,subCategory:string}>) =>{

            state.filterCategory=state.filterCategory.map((item)=>
                item.category===action.payload.category ?    
                        { ...item , subcategories : item.subcategories.filter(sub=>sub!==action.payload.subCategory)}   
                      : item  
            )

         },
         addFilterPrice:(state,action:PayloadAction<{min: number, max: number,category:Category}>)=>{
             state.filterCategory=state.filterCategory.map(item=>item.category===action.payload.category ? {...item,filterPriceOption:{min:action.payload.min,max:action.payload.max}} : item)

         }
         ,
         resetFilterOptions: (state,action:PayloadAction<{category:Category}>)=>{
            state.filterCategory=state.filterCategory.map(item=>item.category===action.payload.category ? {...item,filterPriceOption:undefined,subcategories:[]}:item )
         }
}
});


export const {onFilterClose,onFilterOpen,addFilterPrice,addFilterSubCategoryOptions,removeFilterSubCategoryOptions,resetFilterOptions} = filterSlice.actions

//todo
export const selectFilterOpen = (state: RootState) => state.filter.filterOpen
export const selectFilterCategory= (state: RootState) => state.filter.filterCategory

export default filterSlice.reducer