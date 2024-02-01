import { ReactNode, createContext, useState } from "react";

export type ProviderContextType = {
    isOpen: boolean;
    setIsOpen:React.Dispatch<React.SetStateAction<boolean>>
    loginOpen: boolean;
    setLoginOpen:React.Dispatch<React.SetStateAction<boolean>>
    registerOpen: boolean;
    setRegisterOpen:React.Dispatch<React.SetStateAction<boolean>>
    searchOpen: boolean;
    setSearchOpen:React.Dispatch<React.SetStateAction<boolean>>
}
export const ProviderContext = createContext<ProviderContextType | null >(null);


const Provider= ({children}:{children:ReactNode})=>{
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const [loginOpen,setLoginOpen] = useState<boolean>(false);

    const [registerOpen,setRegisterOpen] = useState<boolean>(false);

    const [searchOpen,setSearchOpen] = useState<boolean>(false);

    return (
        <ProviderContext.Provider value={{ isOpen, setIsOpen,loginOpen,setLoginOpen,registerOpen,setRegisterOpen,searchOpen,setSearchOpen }}>
            {children}
        </ProviderContext.Provider>
    )
}
export default Provider;