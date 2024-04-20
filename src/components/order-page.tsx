import { useEffect, useState } from 'react';
import { OrdersType } from '../lib/types';
import axios from 'axios';
import CircularLoader from './loaders/circular-loader';
import OrderItem from './order-item';


const OrderPage = () => {

    const [orders,setOrders] = useState<OrdersType[]>([]);

    const [loading,setLoading] = useState(false);

    useEffect(()=>{

        const getOrders = async () => {
        const url = import.meta.env.VITE_SERVER_URL;
        setLoading(true);

        try{
            const response = await axios.get(`${url}/api/order`,{withCredentials:true})

            setOrders(response.data.orders);


        }catch(error){
            console.log("Error",error);
        }finally{
            setLoading(false);
        }

    }
    getOrders();
    },[]);

  return (
    <div className='w-full pt-36 px-5 xl:px-10 2xl:px-32'>
       <div className="w-full my-3">
        <h1 className='font-bold text-5xl'>Orders ({orders.length})</h1>
       </div>

       {loading && (
        <div className="w-full min-h-52 flex justify-center items-center">
            <CircularLoader />
        </div>
       )}
       {!loading && orders.length === 0 && (
        <div className="w-full min-h-52 flex justify-center items-center">
            <p>No order found!</p>
        </div>
       )}

       <div className="w-full my-5 space-y-4">

       {orders.map(order=> (
        <OrderItem payment_id={order.razorpay_payment_id} id={order.razorpay_order_id} products={order.products} amount={order.amount} key={order.razorpay_order_id} address={order.address} shipment={order.shipment} createdAt={order.createdAt} legit={order.isPaymentLegit}/>
       ))}

       </div>
    </div>
  );
};

export default OrderPage;