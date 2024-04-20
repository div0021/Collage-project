import { useParams } from "react-router-dom";
import {
  Button,
  IconButton,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { BiLeaf, BiSolidLeaf } from "react-icons/bi";
import { IoAdd } from "react-icons/io5";
import { RiSubtractFill } from "react-icons/ri";
import { formatCurrency } from "../lib/formatCurrency";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addProductToCart,
  onCartOpen,
  selectCartProduct,
} from "../app/features/cartSlice";
import { getObjectFromLocalStorage } from "../lib/user-store";
import { ProductType } from "../lib/schema";
import { calculateDiscountedPrice } from "../lib/calculateDiscountedPrice";
import CircularLoader from "./loaders/circular-loader";
import axios from "axios";
import { MdAddShoppingCart } from "react-icons/md";
import { addProductToFavourite, selectFavouriteProduct } from "../app/features/favouriteSlice";

const ProductPage = () => {
  const { productId } = useParams();
  const favourite = useAppSelector(selectFavouriteProduct);


  const dispatch = useAppDispatch();
  const cartProduct = useAppSelector(selectCartProduct);

  const [quantity, setQuantity] = useState<number>(1);

  const isPresentInCart =
    cartProduct.length > 0 && cartProduct.filter((item) => item.data._id === productId).length > 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [product] = useState(getObjectFromLocalStorage<ProductType>('productdata'));

  if(!product){
    return( <div className="pt-52 w-full h-2/3 flex justify-center items-center"><CircularLoader /></div>)
  }
  const discountedPrice = calculateDiscountedPrice(product.price, product.discount);

  const handleCartClick = async () => {
    const url = import.meta.env.VITE_SERVER_URL;

    try{
      await axios.put(`${url}/api/cart`,{productId:product._id,action:true,quantity},{withCredentials:true})
      const response = await axios.get(`${url}/api/cart`,{withCredentials:true})

      dispatch(addProductToCart(response.data.cartData.products));
                         
    }catch(e){
      console.log("Error",e)
    }
  }


  let isFavourite = false;

  if(favourite.length > 0){
    isFavourite = favourite.filter((item)=>(item._id === productId)).length>0 ? true :false
    }

    const handleFavouriteClick = async (_id:string) => {

      const url = import.meta.env.VITE_SERVER_URL;
  
      try{
        await axios.put(`${url}/api/favourite`,{productId: _id,action:!isFavourite},{withCredentials:true});
  
  
        const response = await axios.get(`${url}/api/favourite`,{withCredentials:true});
  
        dispatch(addProductToFavourite(response.data.favouriteData.products));
  
      }catch(error){
        console.log("Favourite Error",error)
      }
  
    }

  return (
    <div className="w-full">
      <div className="px-5 sm:p-10 pt-10 sm:pt-28 lg:pt-44">
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Images Section */}
            <div className="w-full">
              <Tabs value={product.images[0]}>
                <TabsBody className="">
                  {product.images.map((el) => (
                    <TabPanel
                      key={el}
                      value={el}
                      className="flex justify-start  sm:justify-center items-center mx-auto "
                    >
                      <div className="relative">
                        <img
                          src={el}
                          alt="image"
                          className="max-h-96 mx-auto"
                        />
                      </div>
                    </TabPanel>
                  ))}
                </TabsBody>
                <TabsHeader className="bg-transparent space-x-5 justify-center relative z-0">
                  {product.images.map((el) => (
                    <Tab key={el} value={el} className="w-12">
                      <img
                        className="w-12 h-12 rounded-full"
                        src={el}
                        alt="image"
                      />
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs>
            </div>
            <div className="pt-3 space-y-3 relative">
              {/* Heading */}
              <div>
                <h2 className="text-2xl font-bold">{product.name}</h2>
              </div>
              <div className="w-full flex justify-start items-center gap-x-2">
                <span>Brand:</span>
                <h5 className="font-bold">{product.brand}</h5>
              </div>

              <div className="flex justify-start items-baseline space-x-2">
                <p className="line-through opacity-80">
                  {formatCurrency(Number(product.price))}
                </p>
                <p className="font-semibold text-xl">
                  {formatCurrency(Number(discountedPrice))}
                </p>
                <p className="text-xl text-green-500 font-semibold">
                  {product.discount}% off
                </p>
              </div>

              {/* description */}
              <div>
                <p className="w-full lg:w-[70%] text-gray-800 text-sm tracking-wide">
                  {product.description}
                </p>
              </div>

              {/* Quantity  */}
              <div className="flex justify-start items-center gap-3">
                <IconButton
                  size="sm"
                  variant="outlined"
                  color="light-green"
                  disabled={quantity===product.quantity}
                  onClick={() => setQuantity((pre) => ++pre)}
                >
                  <IoAdd className="text-base" />
                </IconButton>
                <span>{quantity}</span>
                <IconButton
                  size="sm"
                  variant="outlined"
                  color="light-green"
                  disabled={quantity === 1}
                  onClick={() => setQuantity((pre) => --pre)}
                >
                  <RiSubtractFill />
                </IconButton>

                <Button
                  size="md"
                  color="green" 
                  className="px-5 rounded-full flex justify-center items-center font-medium"
                  onClick={async ()=>{
                    if(!isPresentInCart){
                    await handleCartClick()
                    }
                    dispatch(onCartOpen());
                  }}
                >
                  <MdAddShoppingCart className="w-4 h-4 mr-2" />
                  {isPresentInCart ? <span>Go to cart</span> : <span>Add to cart</span>}
                </Button>
              </div>

              <div className="flex gap-4 group cursor-pointer" onClick={async () => {
                handleFavouriteClick(product._id)
              }}>
                {isFavourite ? (
                  <>
                  <BiSolidLeaf className="text-green-500 w-6 h-6" />
                <p className="group-hover:underline">Favourite</p>
                  
                  </>
                ) : (<><BiLeaf className="w-6 h-6" />
                <p className="group-hover:underline">Add to favourites</p></>)}
              </div>
              <div className="mt-2">
                <Button className="flex justify-center items-center space-x-2">
                  <div className="bg-white rounded-full w-5 h-5 text-sm text-black">
                    ?
                  </div>{" "}
                  <span className="text-white">Ask a question</span>
                </Button>
              </div>

              <div className="w-full mt-5 flex justify-start items-start gap-2">
                <p>SubCategory:</p>
                <p>
                  {product.subCategories
                    .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
                    .join(", ")}
                </p>
              </div>
            </div>
            <div>{/* Todo */}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
