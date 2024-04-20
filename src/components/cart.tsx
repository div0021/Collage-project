import { RxCross2 } from "react-icons/rx";
import { cn } from "../lib/cn";
import Button from "./ui/button";
import CartItem from "./cart-item";
import { formatCurrency } from "../lib/formatCurrency";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {addProductToCart, onCartClose, onCartOpen, selectCartOpen, selectCartProduct } from "../app/features/cartSlice";
import { calculateDiscountedPrice } from "../lib/calculateDiscountedPrice";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoTriangleDown } from "react-icons/go";
import { selectCurrentUser } from "../app/features/authSlice";
import { onLoginOpen } from "../app/features/loginSlice";


const Cart = () => {


  const isOpen = useAppSelector(selectCartOpen);
  const cartData = useAppSelector(selectCartProduct);

  const navigate = useNavigate()

  const number = cartData.length;

  const dispatch = useAppDispatch()

  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(()=>{
    const getCartData = async () => {
      const url = import.meta.env.VITE_SERVER_URL;

      try{
        const response = await axios.get(`${url}/api/cart`,{withCredentials:true});

        dispatch(addProductToCart(response.data.cartData.products));

        // console.log(response.data)
      }catch(e){
        console.log("Error",e);
      }
    }
    getCartData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  let totalPrice = 0;

  if(cartData.length>0){

    totalPrice = cartData.reduce((accumulator:number, currentValue) =>{
      return accumulator + calculateDiscountedPrice(currentValue.data.price, currentValue.data.discount) * currentValue.quantity

  },0)
}


  return (
    <div>
      <div
        className="relative cursor-pointer shrink-0 group"
        onClick={() => dispatch(onCartOpen())}
        aria-disabled={!isOpen}
      >
        {number>0 && <div className="absolute h-3 w-3 font-medium text-[10px] text-white -right-2 -top-1 bg-[#679F0A] rounded-xl flex items-end justify-center">
          <span className="h-[12.5px]">{number}</span>
        </div>}


      <GoTriangleDown className="w-5 h-5 absolute -top-4 left-0 text-green-200 opacity-0 group-hover:opacity-100 pointer-events-none" />

      <div className="opacity-0 group-hover:opacity-100 pointer-events-none  absolute bottom-7 -left-3 text-sm bg-green-200 p-1 rounded-lg">
        <div className='w-full hover:bg-white p-1 rounded-full flex justify-start items-center transition-all text-xs duration-300 ease-in-out'>
          <span>Cart</span>
        </div>
      </div>

        <img src="/shopping-cart.png" alt="shopping cart" className="w-5 h-5" />
      </div>

      {/* CART SIDEBAR */}

      <div
        className={cn(
          "hidden opacity-0 h-screen w-screen bg-white/40 fixed inset-0  justify-end overflow-hidden transition-all duration-100 ease-in-out",
          {
            "opacity-100 block": isOpen,
          }
        )}
      ></div>

      <div
        className={cn(
          "opacity-0 h-screen w-screen fixed inset-0 flex justify-end z-50 translate-x-[100rem] transition-all duration-300 ease-in-out",
          {
            "opacity-100 translate-x-0": isOpen,
          }
        )}
        onClick={() => dispatch(onCartClose())}
      >
        <div
          className={cn(
            "h-screen w-[89.5%] fixed md:w-8/12 lg:w-6/12 flex flex-col p-5 z-40 translate-x-[100rem] transition-all duration-400 ease-in-out shadow-md shadow-gray-400 bg-gray-50",
            {
              "translate-x-0": isOpen,
            }
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-semibold text-emerald-600 text-2xl tracking-wide">
              Cart
            </h2>
            <RxCross2
              className="w-5 h-5 cursor-pointer"
              onClick={() => dispatch(onCartClose())}
            />
          </div>

          <div className="mt-3 flex flex-col h-[calc(100%-10rem)] overflow-y-auto">
            {cartData.length === 0 ? (
              <div className="w-full h-full flex flex-col justify-center items-center space-y-3">
                {currentUser ? (<><span>Your list is empty</span>
                <Button
                  label="Continue Shopping"
                  onClick={() => {
                    dispatch(onCartClose());
                  }}
                  className="bg-black text-white w-2/3 py-5 max-w-[12rem] sm:w-5/12 border-none"
                /></>):(
                  <>
                  <span>You are not logged In</span>
                <Button
                  label="Login to Continue"
                  onClick={() => {
                    dispatch(onCartClose());
                    dispatch(onLoginOpen())
                  }}
                  className="bg-black text-white w-2/3 py-5 max-w-[12rem] sm:w-5/12 border-none"
                />
                  
                  </>
                )}
              </div>
            ) : (
              <div>
                {/* Add items */}
                <div className="space-y-3">
                  {cartData.length > 0 && cartData.map((el) => (
                    <CartItem
                      key={el.data._id}
                      id={el.data._id}
                      description={el.data.description}
                      discount={String(Math.round((calculateDiscountedPrice(el.data.price,el.data.discount))))}
                      image={el.data.images[0]}
                      name={el.data.name}
                      percentage={String(el.data.discount)}
                      price={String(el.data.price)}
                      quantity={String(el.quantity)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Total Price */}

          {cartData.length!==0 && <div className="w-full pt-5 px-5 flex justify-start items-center">
            <div className="flex items-center justify-between w-[calc(100%-3rem)]">
              <h6 className="text-xl">Total: {formatCurrency(totalPrice)}</h6>

              <Button label="Continue" onClick={() => {
                dispatch(onCartClose())
                setTimeout(()=>{
                  navigate("/cart");
                },500)
              }} className="w-52" />
            </div>
          </div>}
        </div>
      </div>
      </div>
  );
};
export default Cart;
