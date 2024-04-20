import { IconButton } from '@material-tailwind/react';
import { CartDataType, updateProductQuantityToCart } from '../app/features/cartSlice';
import { calculateDiscountedPrice } from '../lib/calculateDiscountedPrice';
import { IoAdd } from 'react-icons/io5';
import { RiSubtractFill } from 'react-icons/ri';
import Button from './ui/button';
import { MdOutlineShoppingCartCheckout } from 'react-icons/md';
import { storeObjectInLocalStorage } from '../lib/user-store';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toast } from 'react-toastify';
import { selectUserProfile } from '../app/features/profileSlice';

interface CartPageItemProps {
  // Define your component props here
  product:CartDataType;
}

const CartPageItem = ({product}: CartPageItemProps) => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const profile = useAppSelector(selectUserProfile);

    const handleBuy = () => {

      if(!profile?.address){
        toast.error("Please add your address first");
        return;
      }

      storeObjectInLocalStorage('buyproducts',[{...product}])

      navigate("/checkout");

    }
  return (
    <div className='w-full flex justify-start items-start max-h-52 rounded-xl hover:border-green-500 shadow-sm shadow-gray-400 hover:shadow-green-500 border border-gray-400'>
                <div className="w-40 py-3 px-2">
                    <img src={product.data.images[0]} alt="product_img" />
                </div>

                <div className="w-fit py-2 px-4">

                    <h4 className='text-sm font-semibold'>{product.data.name.length>50 ? product.data.name.substring(0,50) + "..." : product.data.name}</h4>

                    <p className = "text-xs line-clamp-2">{product.data.description}</p>

                    <div className="flex justify-start items-center text-sm gap-x-2">
                        <p className='text-xs line-through my-2'>
                            {product.data.price}
                        </p>
                        <p className='font-semibold text-base'>{Math.round(calculateDiscountedPrice(product.data.price,product.data.discount))}</p>

                        <p className='text-green-500 font-medium'>{product.data.discount}% OFF</p>
                    </div>

                    <div className="flex justify-start items-center gap-x-3">

                        <span>Quantity:</span>

                    <IconButton
                  size="sm"
                  variant="outlined"
                  color="light-green"
                  disabled={product.quantity===product.data.quantity}
                  onClick={() => {
                    dispatch(updateProductQuantityToCart({id:product.data._id,quantity:product.quantity + 1}))
                  }}
                >
                  <IoAdd className="text-base" />
                </IconButton>
                <span>{product.quantity}</span>
                <IconButton
                  size="sm"
                  variant="outlined"
                  color="light-green"
                  disabled={product.quantity === 1}
                  onClick={() => {
                    dispatch(updateProductQuantityToCart({id:product.data._id,quantity:product.quantity - 1}))
                  }}
                >
                  <RiSubtractFill />
                </IconButton>

                    </div>

                    <div className="flex justify-start">
                        <Button label='Buy' onClick={handleBuy} className='w-1/3 my-2 rounded-full hover:text-white' icon={MdOutlineShoppingCartCheckout}/>
                    </div>

                </div>
            </div>
        
  );
};

export default CartPageItem;