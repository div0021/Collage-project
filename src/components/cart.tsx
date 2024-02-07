import {RxCross2} from "react-icons/rx"
import {useContext} from "react"
import { cn } from "../lib/cn";
import Button from "./ui/button";
import { ProviderContext, ProviderContextType } from "./provider/provider";
import productData from '../data/product.json'
import CartItem from "./cart-item";

interface CartProps{
    number:number,
    items?:[]
}
const Cart = ({number,items}:CartProps) => {
    const {isOpen,setIsOpen} = useContext(ProviderContext) as ProviderContextType;

    //get cart data 
    const cartData = productData.filter(el=>el.inCart===true);

    return (
        <>
        <div className="relative cursor-pointer" onClick={()=>setIsOpen(true)} aria-disabled={!isOpen}>
            <div className="absolute h-1.5 w-1.5 font-semibold text-xs text-white -right-2 -top-1 p-1 bg-[#679F0A] rounded-xl flex items-center justify-center">{number}</div>
            <img src="/shopping-cart.png" alt="shopping cart" className="w-5 h-5"/>
            </div>

            {/* CART SIDEBAR */}

            <div className={cn("hidden opacity-0 h-screen w-screen bg-white/40 fixed inset-0  justify-end overflow-hidden transition-all duration-100 ease-in-out",{
                "opacity-100 block":isOpen
            })}></div>

            <div className={cn("opacity-0 h-screen w-screen fixed inset-0 flex justify-end z-30 translate-x-[100rem] transition-all duration-300 ease-in-out",{
                "opacity-100 translate-x-0":isOpen
            })} onClick={()=>setIsOpen(false)}>

                <div className={cn("h-screen w-[89.5%] fixed sm:w-5/12 lg:w-4/12 flex flex-col p-5 z-40 translate-x-[100rem] transition-all duration-400 ease-in-out shadow-md shadow-gray-400 bg-gray-50",{
                    "translate-x-0":isOpen
                })} onClick={(e)=>e.stopPropagation()}>
                    <div className="flex justify-between items-center">
                        <h2 className="text-semibold text-emerald-600 text-2xl tracking-wide">Cart</h2>
                        <RxCross2 className = "w-5 h-5 cursor-pointer" onClick={()=>setIsOpen(false)}/>


                </div>
                {/* TODO: Add items based on condition */}


                <div className="flex flex-col flex-1">
                   {!productData ? (
                    <div className="w-full h-full flex flex-col justify-center items-center space-y-3">
                        <span>Your list is empty</span>
                             <Button label="Continue Shopping" onClick={()=>{}} className="bg-black text-white w-5/12 border-none"/>
                             
                    </div>
                   ):(
                    <div>
                        {/* Add items */}
                        <div>
                           {cartData.map(el=>(
                            <CartItem key={el.id} id={el.id} description={el.description} discount={el.price.discount} image={el.image[0].url} name={el.name} percentage={el.price.percent} price={el.price.original} quantity="4" />
                           ))}
                        </div>
                    </div>
                   )}
                </div>
                </div>

            </div>

</>
        
    )
}
export default Cart;