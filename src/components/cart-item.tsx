import {
  Card,
  CardHeader,
  CardBody,
  IconButton,
} from "@material-tailwind/react";
import{
    MdOutlineCurrencyRupee
} from "react-icons/md"

import { FaTrash } from "react-icons/fa";
import { CartActionKind, ProviderContext, ProviderContextType } from "./provider/provider";
import { useContext } from "react";

interface CartItemProps{
    name:string,
    price:string,
    discount:string,
    percentage:string,
    description:string,
    id:string,
    quantity:string,
    image:string,
}

const CartItem = ({description,discount,image,name,percentage,price,quantity,id}:CartItemProps) => {

    const {dispatch} = useContext(ProviderContext) as ProviderContextType;



  return (
    <Card className="w-full flex-col sm:flex-row">
        <CardHeader className="m-0 w-full sm:w-1/5 shrink-0 rounded-r-none flex items-center justify-center">
            <img 
            src={image}
            alt={name}
            className=" w-28 h-full sm:w-full object-cover"
            />

        </CardHeader>
    
    <CardBody className="flex w-full">
        <div className="w-3/4 sm:mr-auto flex flex-col space-y-1">
            <h6 className="font-semibold tracking-wide">{name}</h6>
            <div>
                <p className="text-xs line-clamp-2">
                    {description}
                </p>
            </div>
            <div className="flex gap-1 text-xs">
                <p>Quantity:</p>
                <p>{quantity}</p>
            </div>
            <div className="flex items-center gap-x-3">
                <div className="flex items-center opacity-75">
                <MdOutlineCurrencyRupee />
                <p className="line-through">{price}</p>
                </div>
                <div className="flex items-center font-bold">
                <MdOutlineCurrencyRupee />
                <p className="">{discount}</p>
                </div>
                <div>
                    <p className="text-green-600 text-sm font-bold">{percentage}% off</p>
                </div>
            </div>
        </div>
        <div className="flex justify-center items-center">
            <IconButton className="bg-red-400" onClick={()=> dispatch({type:CartActionKind.REMOVE,payload:Number(id) && Number(id)})}><FaTrash /> </IconButton>
        </div>

    </CardBody>

    </Card>
  )
};
export default CartItem;
