import { useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { selectUserProfile } from '../app/features/profileSlice';
import { Navigate } from 'react-router-dom';
import { CartDataType } from '../app/features/cartSlice';
import { getObjectFromLocalStorage } from '../lib/user-store';
import { formatCurrency } from '../lib/formatCurrency';
import { calculateDiscountedPrice } from '../lib/calculateDiscountedPrice';
import Button from './ui/button';
import { MdOutlineShoppingCartCheckout } from 'react-icons/md';
import axios from 'axios';
import { getArrivingTime } from '../lib/getArrivingTime';
import { v4 as uuid } from 'uuid';

const CheckOutPage = () => {

    const profile = useAppSelector(selectUserProfile);

    const [checkoutProduct] = useState<CartDataType[]>(getObjectFromLocalStorage('buyproducts') || [])

    const [arrivingDate] = useState<{day:number,arrivingTime:string}>(getArrivingTime());


    let totalPrice = 0;
    let totalQuantity = 0;
    let totalOriginalPrice=0;

    if(checkoutProduct.length>0){
  
      totalPrice = checkoutProduct.reduce((accumulator:number, currentValue) =>{
        return accumulator + calculateDiscountedPrice(currentValue.data.price, currentValue.data.discount) * currentValue.quantity
  
    },0)
      totalOriginalPrice = checkoutProduct.reduce((accumulator:number, currentValue) =>{
        return accumulator + currentValue.data.price * currentValue.quantity
  
    },0)
      totalQuantity = checkoutProduct.reduce((accumulator:number, currentValue) =>{
        return accumulator + currentValue.quantity
  
    },0)

  }

  const handlePayment = async () => {

    if(checkoutProduct.length===0 || !profile){
        return;
    }

    const address = {address:profile?.address,pincode:profile?.pincode,state:profile?.state,city:profile?.city
    }

    const receipt = uuid();

    const url = import.meta.env.VITE_SERVER_URL;

    try{

        const response = await axios.post(`${url}/api/order`,{amount:Math.round(totalPrice) * 100,currency:"INR",receipt,shipment:arrivingDate.day,products:checkoutProduct,address},{withCredentials:true});


        const {id,amount} = response.data;

        const {data:{key_id}} = await axios.get(`${url}/api/getKey`,{withCredentials:true});


        // razer pay options

        const options = {
            key: key_id,
            amount:amount,
            currency: "INR",
            name: "GreenMart",
            description: "Order's Transaction",
            image: "/brandlogo.png",
            order_id: id, 
            callback_url: `${url}/api/paymentVerification`,
            prefill: {
                name: profile?.firstName + " " + profile?.lastName,
                email: profile?.user.email,
                contact: profile?.contact
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#679F0A"
            }
        };        

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const razorpay = new window.Razorpay(options);

        razorpay.open();


    }catch(error){
        console.log("Error",error)
    }

  }


    if(!profile || checkoutProduct.length===0){
        return <Navigate to={"/"} replace/>
    }
  return (
    <div className='w-full pt-36 pb-10 px-10 2xl:px-28 min-w-[1000px]'>
    
    <div className="w-full">
        <h1 className='text-5xl font-bold'>Checkout</h1>

        <div className="grid grid-cols-5 gap-x-4">


        {/* Delivery details */}

        <div className="w-full col-span-3">

        <div className=" w-full py-10 border-b border-gray-400 space-y-5">
        <div className=" w-full flex justify-between items-start">
            <h5 className='text-lg font-medium'>Delivery Details</h5>

            <div className=''>
                <p>{profile.firstName} {profile.lastName}</p>
                <p className='max-w-72 text-wrap'>{profile.address}</p>
                <div className="flex justify-start items-center flex-wrap gap-4">

                    <p>{profile.city}, {profile.state}, {profile.pincode}</p>

                </div>

            </div>
            </div>
        <div className=" w-full flex justify-between items-start">
            <h5 className='text-lg font-medium'>Delivery Time</h5>

            <div className=''>
                <p className='text-green-500 font-semibold'>Arriving {arrivingDate.arrivingTime}</p>

            </div>
            </div>

            </div>

            {/* Review Products */}

            <div className="w-full border-b border-gray-400 py-10">
                <h5 className='text-lg font-medium'>
                    Reviews  of your products
                </h5>

                <div className="w-full pt-5 space-y-5">

                    {checkoutProduct.map(product =>(<div className="w-full flex justify-start items-center gap-x-5 rounded-xl border border-gray-400 shadow shadow-gray-400 hover:shadow-md px-5 py-4 hover:border-green-500 transition-all duration-300 ease-in-out max-h-72" key={product.data._id}>

                        <div className="w-1/5">
                            <img src={product.data.images[0]} alt="" />
                        </div>

                        {/* product details */}

                        <div className="max-w-[77%] flex flex-col justify-start items-start h-full gap-y-1">

                            <h4 className='font-medium line-clamp-1'>{product.data.name}</h4>

                            {/* brand */}

                            <h6 className='font-medium text-xs'>Brand: {product.data.brand}</h6>

                            {/* description */}

                            <p className='line-clamp-2 text-sm'>{product.data.description}</p>

                            {/* price */}

                            <p className='font-semibold text-lg tracking-wide'>{formatCurrency(calculateDiscountedPrice(product.data.price,product.data.discount))}</p>

                            {/* Quantity */}

                            <p className='text-sm font-medium'>Quantity : {product.quantity}</p>

                        </div>

                    </div>))}

                </div>

            </div>

            {/* checkout */}

            <div className="my-5 flex justify-between items-center w-full">

                <Button className='text-sm max-w-52 hover:text-white' label='Place your order and pay' onClick={handlePayment} />

                <div className='tracking-wide font-medium text-green-500 text-lg mr-5'>
                    Order Total: {formatCurrency(Math.round(totalPrice))}
                </div>

            </div>


            </div>

            {/* order summary */}

            <div className="w-full col-span-2 flex justify-start items-start relative">
                <div className='mt-40 px-5 py-4 sticky -top-1 w-full border border-gray-400 rounded-lg z-0 ' id='ordersummary' style={{position:'sticky',top:"3px"}}>

                    <h4 className='font-semibold  text-lg'>Order summary</h4>

                    <div className=" py-5 flex flex-col justify-between items-center gap-y-3 border-b border-gray-400">
                        <div className="w-full flex justify-between items-center tracking-wide px-5 font-medium">
                            <span>Total Quantity:</span>
                            <span>{totalQuantity}</span>
                        </div>
                        <div className="w-full flex justify-between items-center tracking-wide px-5 font-medium text-gray-500">
                            <span>Total Original Price:</span>
                            <span className='line-through'>{formatCurrency(Math.round(totalOriginalPrice))}</span>
                        </div>
                        <div className="w-full flex justify-between items-center tracking-wide px-5 font-medium">
                            <span>Total Price:</span>
                            <span className=''>{formatCurrency(Math.round(totalPrice))}</span>
                        </div>
                        <div className="w-full flex justify-between items-center tracking-wide px-5 font-medium text-green-500">
                            <span>Save:</span>
                            <span className=' font-semibold'>{formatCurrency(Math.round(totalOriginalPrice - totalPrice))}</span>
                        </div>

                      
                    </div>
                    <div className="w-full pt-5">
                            <Button label='Place your order and pay' className='hover:text-white'  onClick={handlePayment} icon={MdOutlineShoppingCartCheckout}/>
                        </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  );
};

export default CheckOutPage;