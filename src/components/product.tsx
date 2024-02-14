import { useContext, useState } from "react";
import Button from "./ui/button";
import { CartActionKind, ProviderContext, ProviderContextType } from "./provider/provider";
import { useNavigate } from "react-router-dom";

interface ProductProps {
  id:string,
  name:string,
  image:string,
}

const Product = ({id,image,name}:ProductProps) => {
    const [isHovered,setIsHovered] = useState<boolean>(false);
    const navigate = useNavigate();

    const {setIsOpen,cartState,dispatch} = useContext(ProviderContext) as ProviderContextType;

    const isPresentInCart = cartState.productsInCart.filter(product => product.id === id).length > 0;


    return (
        <div onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)} className={`w-full relative pt-2 sm:pt-5 border-2 ${isHovered && "border-transparent"}`}>
            <div className={`${isHovered && "absolute  hover:shadow-sm hover:shadow-gray-400 hover:-translate-y-5 hover:scale-105 transition-all duration-300 ease-in-out h-auto rounded-xl top-0 w-full hover:border-gray-400 border-2 bg-white z-10"}`}>
                    <img
                      src={image}
                      className="w-20 sm:w-auto sm:h-28 md:h-52 lg:h-56 xl:h-44 object-cover mx-auto cursor-pointer" onClick={()=>{
                        console.log("id",id);
                        navigate(`/products/${id}`)}}
                    />
    
                    <div className="p-2 sm:p-4 md:px-6 w-20 sm:w-20 md:w-[calc(100%-3rem)]">
                      <p className="truncate text-xs sm:text-sm md:text-lg font-semibold">
                        {name}
                      </p>
                      <div className="flex space-x-1 font-bold text-[10px] md:text-base xl:text-lg">
                        <p className="line-through text-gray-400/90">$80.00</p>
                        <p>$50.00</p>
                      </div>
                      {isHovered && (<div className="mt-2 w-full flex">
                        <Button className="p-1  text-xs  w-[4.5rem] md:w-full md:p-2 md:text-md sm:p-2 lg:text-lg" label={isPresentInCart ? "Go to Cart" : "Add to cart"}

                        onClick={()=>{

                          if(!isPresentInCart){dispatch({type: CartActionKind.ADD,payload:Number(id) && Number(id)});}
                          
                          setIsOpen(true)}}

                        />
                      </div>)}
                    </div>
                    </div>
                  </div>
    )

}
export default Product;