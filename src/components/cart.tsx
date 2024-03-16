import { RxCross2 } from "react-icons/rx";
import { cn } from "../lib/cn";
import Button from "./ui/button";
import CartItem from "./cart-item";
import { formatCurrency } from "../lib/formatCurrency";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {onCartClose, onCartOpen, selectCartOpen, selectCartProduct } from "../app/features/cartSlice";


const Cart = () => {


  const isOpen = useAppSelector(selectCartOpen);
  const cartData = useAppSelector(selectCartProduct);

  const number = cartData.length;

  const dispatch = useAppDispatch()


  return (
    <>
      <div
        className="relative cursor-pointer shrink-0"
        onClick={() => dispatch(onCartOpen())}
        aria-disabled={!isOpen}
      >
        {number>0 && <div className="absolute h-3 w-3 font-medium text-[10px] text-white -right-2 -top-1 bg-[#679F0A] rounded-xl flex items-end justify-center">
          <span className="h-[12.5px]">{number}</span>
        </div>}
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
          {/* TODO: Add items based on condition */}

          <div className="mt-3 flex flex-col h-[calc(100%-10rem)] overflow-y-auto">
            {cartData.length === 0 ? (
              <div className="w-full h-full flex flex-col justify-center items-center space-y-3">
                <span>Your list is empty</span>
                <Button
                  label="Continue Shopping"
                  onClick={() => {
                    dispatch(onCartClose());
                  }}
                  className="bg-black text-white w-2/3 py-5 max-w-[12rem] sm:w-5/12 border-none"
                />
              </div>
            ) : (
              <div>
                {/* Add items */}
                <div className="space-y-3">
                  {cartData.map((el) => (
                    <CartItem
                      key={el.id}
                      id={el.id}
                      description={el.description}
                      discount={el.price.discount}
                      image={el.image[0].url}
                      name={el.name}
                      percentage={el.price.percent}
                      price={el.price.original}
                      quantity="4"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Total Price */}

          {cartData.length!==0 && <div className="w-full pt-5 px-5 flex justify-start items-center">
            <div className="flex items-center justify-between w-[calc(100%-3rem)]">
              <h6 className="text-xl">Total: {formatCurrency(2000)}</h6>

              <Button label="Continue" onClick={() => {}} className="w-52" />
            </div>
          </div>}
        </div>
      </div>
    </>
  );
};
export default Cart;
