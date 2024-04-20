import { ProductType } from '../lib/schema';
import { calculateDiscountedPrice } from '../lib/calculateDiscountedPrice';
import { formatCurrency } from '../lib/formatCurrency';
import { getArrivingTimeByNumber } from '../lib/getArrivingTime';

interface OrderItemProps {
  // Define your component props here
  products:{data:ProductType,quantity:number}[];
  amount:number;
  address:{
    address:string;
    pincode:number;
    city:string;
    state:string;
  }
  shipment:number;
  createdAt:Date;
  legit:boolean;
  id:string;
  payment_id:string;
}

const OrderItem = ({createdAt,id,legit,shipment,products,address,payment_id,amount}: OrderItemProps) => {

    const date = getArrivingTimeByNumber(shipment,createdAt)

    const deliveryTime = new Date(createdAt).getTime() +(shipment * 24 * 60 * 60 * 1000);

    let status;


    if(!legit){

        status = <p className='px-2 py-1 bg-red-100 text-red-600 rounded-full border border-red-800'>failed</p>

    }else if(new Date(createdAt).getTime() + 900000 > new Date().getTime()){
        status = <p className='px-2 py-1 bg-gray-100 text-gray-600 rounded-full border border-gray-800'>Processing</p>;
    }else if((new Date(createdAt).getTime() < deliveryTime) && (new Date().getTime() < deliveryTime)){

        status=<p className='px-2 py-1 bg-green-100 text-green-600 rounded-full border border-green-800'>Dispatched</p>

    }else if(new Date().getTime() > deliveryTime){
        status=<p className='px-2 py-1 bg-green-200 text-green-700 rounded-full border border-green-950'>Delivered</p>
    }

    const totalPrice = amount;
    let totalQuantity = 0;

    if(products.length>0){
      totalQuantity = products.reduce((accumulator:number, currentValue) =>{
        return accumulator + currentValue.quantity
  
    },0)

  }

  return (
    <div className='w-full border border-gray-400 px-4 py-3 rounded-xl'>
       
        <h3 className='font-semibold text-lg'>Order ID : {id}</h3>

        <h4 className='text-xl font-semibold py-1'>Products</h4>
       <div className="w-full grid grid-cols-5 justify-start items-center gap-5">

        {products.map(product=>(
            <div className="col-span-1 w-full px-3 py-2 border border-gray-400 hover:border-green-500 rounded-xl h-full flex justify-between flex-col items-center" key={product.data._id}>

                <div className="w-full flex justify-center items-center">
                    <img src={product.data.images[0]} alt={product.data.name.toLowerCase()} className='w-64' />

                </div>

                <div className="w-full px-3 py-3 text-sm space-y-1">

                {/* Name */}

                <h4 className='font-semibold line-clamp-2 mt-3 my-1'>{product.data.name}</h4>

                <h6 className='font-medium'>Brand: {product.data.brand}</h6>

                <p className=''>Quantity : {product.quantity}</p>

                <p className='font-medium'> {formatCurrency(calculateDiscountedPrice(product.data.price,product.data.discount))}</p>

                </div>


            </div>
        ))}

       </div>

       {/* Delivery Summary */}

       <div className="w-full grid grid-cols-2 gap-5 py-5">

        <div className="col-span-1 w-full px-5 py-3 border border-gray-400 rounded-lg space-y-3">
            <h4 className='text-xl font-semibold'>
                Delivery Summary
            </h4>

            <div className="w-full flex justify-between items-start pl-5 text-sm">
                <p>Address</p>
                <address className='w-3/5'>
                    {address.address}, {address.city}, {address.state}, {address.pincode}
                </address>
            </div>
            <div className="w-full flex justify-between items-start font-medium pl-5 text-sm">
                <p>Date</p>
                <p>{date.arrivingTime}</p>
            </div>
            <div className="w-full flex justify-between items-start font-medium pl-5 text-sm">
                <p>Status</p>
                {status}
            </div>

        </div>

        {/* order summary */}
        <div className="col-span-1 w-full px-5 py-3 border border-gray-400 rounded-lg">
        <h4 className='font-semibold  text-lg'>Order summary</h4>

<div className=" py-5 flex flex-col justify-between items-center gap-y-3 border-b border-gray-400">
    <div className="w-full flex justify-between items-center tracking-wide px-5 font-medium">
        <span>Total Quantity:</span>
        <span>{totalQuantity}</span>
    </div>
    <div className="w-full flex justify-between items-center tracking-wide px-5 font-medium">
        <span>Total Price:</span>
        <span className=''>{formatCurrency(Math.round(totalPrice))}</span>
    </div>
    <div className="w-full flex justify-between items-center tracking-wide px-5 font-medium text-green-500">
        <span>PaymentId</span>
        <span className=' font-semibold'>{payment_id}</span>
    </div>

  
</div>

        </div>

       </div>
    </div>
  );
};

export default OrderItem;