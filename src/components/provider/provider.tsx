import { ReactNode, createContext, useReducer, useState,Dispatch } from "react";
import productData from "../../data/product.json";

export type ProviderContextType = {
    isOpen: boolean;
    setIsOpen:React.Dispatch<React.SetStateAction<boolean>>
    loginOpen: boolean;
    setLoginOpen:React.Dispatch<React.SetStateAction<boolean>>
    registerOpen: boolean;
    setRegisterOpen:React.Dispatch<React.SetStateAction<boolean>>
    searchOpen: boolean;
    setSearchOpen:React.Dispatch<React.SetStateAction<boolean>>;
    cartState:CartState;
    dispatch:Dispatch<CartActions>

}
export const ProviderContext = createContext<ProviderContextType | null >(null);

export type ProductDataType = {
    id: string,
    name:string,
    description:string,
    image:{
        url:string,
        label:string
    }[],
    rating:string,
    price:{
        original:string,
        discount:string,
        percent:string,
    },
    categories:string[],
}

export type CartReducerType = (state:CartState,action:CartActions)=>CartState;

export enum CartActionKind{
    ADD = "ADD",
    REMOVE = "REMOVE",
}

export interface CartActions{
    type: CartActionKind
    payload: number
}

export interface CartState{
    productsInCart: ProductDataType[]
}


const Provider= ({children}:{children:ReactNode})=>{
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const [loginOpen,setLoginOpen] = useState<boolean>(false);

    const [registerOpen,setRegisterOpen] = useState<boolean>(false);

    const [searchOpen,setSearchOpen] = useState<boolean>(false);

    function cartReducer(state:CartState,action:CartActions){
        const {payload,type} = action;
        switch(type){
            case CartActionKind.ADD:{
                const result = state['productsInCart'].filter(el=>el.id === String(payload))

                if(result.length!==0) return state;

                return {productsInCart:[...state.productsInCart,...productData.filter(el=>Number(el.id)===payload)]};
            }
            case CartActionKind.REMOVE:
                return {productsInCart:[...state.productsInCart.filter(el => Number(el.id) !== payload)]}
            default:
                return state;
        }
    }

    const [state,dispatch] = useReducer<CartReducerType>(cartReducer,{productsInCart:[]})


    return (
        <ProviderContext.Provider value={{isOpen, setIsOpen,loginOpen,setLoginOpen,registerOpen,setRegisterOpen,searchOpen,setSearchOpen,cartState:state,dispatch }}>
            {children}
        </ProviderContext.Provider>
    )
}

export default Provider;