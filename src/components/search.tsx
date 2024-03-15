import { useEffect, useState } from "react";
import {BiSearch} from "react-icons/bi"
import Input from "./ui/input";
import {FiSearch} from "react-icons/fi"
import { RxCross2 } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { onSearchClose, onSearchOpen, selectSearchOpen } from "../app/features/searchSlice";

const Search = () => {

    const searchOpen = useAppSelector(selectSearchOpen);
    const dispatch = useAppDispatch()
    const [open,setOpen] = useState<boolean>(searchOpen);
   
    useEffect(()=>{
        setOpen(searchOpen);
    },[searchOpen]);

    const [inputValue,setInputValue] = useState<string>("");

    const changeValue =(value:string)=>{
         setInputValue(value);
    };


    return (
        <div>
             <div className="flex flex-row justify-center items-center" onClick={()=>dispatch(onSearchOpen())}>
                <BiSearch className="w-6 h-6 cursor-pointer text-gray-400 hover:text-gray-700 transition-all duration-150 ease-in-out relative top-0.5"/>
             </div>

             {/* Search Open */}

            {searchOpen && <div className="fixed inset-0 overflow-hidden flex flex-col items-center bg-gray-800/80 z-50 pt-20">
                   
                   <div className="flex flex-col items-center justify-center  w-full sm:w-4/6 md:1/2 lg:w-2/5">
                    <div className={`w-full rounded-full flex flex-row bg-white items-center justify-between shadow-md shadow-gray-800 ${open ? "translate-y-0":"-translate-y-96"} transition-all duration-300 ease-in-out`}>
                          <Input icon={FiSearch} placeholder="Search here..." autoFocus endIcon={RxCross2} isSearch onClose={()=>{
                            setOpen(false);
                            setTimeout(()=>{
                                dispatch(onSearchClose())
                            },300);
                            
                            }}  
                            changeValue={changeValue}
                            />
                    </div>
                    <div className={`w-4/5 rounded-xl p-3 flex flex-col justify-center items-center bg-white mt-5 text-gray-600/80 text-sm ${inputValue.length > 1 ? "opacity-100":"opacity-0"} transition-all duration-200 ease-in-out`}>
                            {/* Suggestion Content */}
                              No result found!!
                          </div>
                   </div>
             </div>}
        </div>
    )
}
export default Search;