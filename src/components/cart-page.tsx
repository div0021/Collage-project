import Button from "./ui/button";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectCartProduct } from "../app/features/cartSlice";
import CartPageItem from "./cartpage-item";
import { selectCurrentUser } from "../app/features/authSlice";
import { selectUserProfile } from "../app/features/profileSlice";
import { storeObjectInLocalStorage } from "../lib/user-store";
import { toast } from "react-toastify";

const CartPage = () => {
  const products = useAppSelector(selectCartProduct);
  const navigate = useNavigate();

  const currentuser = useAppSelector(selectCurrentUser);

  const profile = useAppSelector(selectUserProfile)

  const handleBuyAll = () => {

    if(!profile?.address){
      toast.error("Please add you address");
      return;
    }

    storeObjectInLocalStorage('buyproducts', products)

    navigate("/checkout");

  }

  if(!currentuser){
    return <Navigate to={"/"} />
  }
  return (
    <div className="w-full min-w-[600px] min-h-52 pt-20 sm:pt-28 md:pt-36 lg:pt-44 px-4 lg:px-28 overscroll-auto overflow-x-scroll">
      <div className="w-full flex justify-between items-center mb-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold">
          Cart({products.length})
        </h1>

        <Button
          icon={MdOutlineShoppingCartCheckout}
          onClick={handleBuyAll}
          label="Buy All"
          className="max-w-52 rounded-full disabled:cursor-not-allowed"
          disabled={products.length===0}
        />
      </div>

      {products.length === 0 && (
        <div className="w-full my-20 flex justify-center items-center flex-col">
          <span>Your cart is empty! Add some products to start shopping.</span>
          <Button
            label="Continue Shopping"
            className="max-w-52 mt-5"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
      )}

      {products.length > 0 && (
      <>
    {profile && profile.address && (  <div className="w-full my-10 flex justify-end items-center text-sm font-medium">

        <Link to={"/address"}
         className="text-green-600 underline cursor-pointer">Would you like to update your address
        </Link>
      </div>)}

      {profile && !profile.address && (  <div className="w-full my-10 flex justify-end items-center text-sm font-medium">

        <Link to={"/address"}
         className="text-green-600 underline cursor-pointer">Please add your address
        </Link>
      </div>)}


      <div className="my-10 w-full grid grid-cols-1 xl:grid-cols-2 justify-center items-center gap-5">
        {products.map((product) => (
          <CartPageItem product={product} key={product.data._id} />
        ))}
      </div>
      
      </>)}
    </div>
  );
};

export default CartPage;
