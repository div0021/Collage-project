import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../lib/formatCurrency";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { ProductType } from "../lib/schema";
import { calculateDiscountedPrice } from "../lib/calculateDiscountedPrice";
import { storeObjectInLocalStorage } from "../lib/user-store";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addProductToFavourite, selectFavouriteProduct } from "../app/features/favouriteSlice";
import { selectCurrentUser } from "../app/features/authSlice";

interface ProductProps {
  productData:ProductType
  isSmall? : boolean;
}

const Product = ({
  productData,
  isSmall=false
}: ProductProps) => {
  const {_id,isFeatured,price,discount,name,images,description} = productData;

  const dispatch = useAppDispatch();

  const selectFavourite = useAppSelector(selectFavouriteProduct)

  const favourite = selectFavourite.find((product)=> product._id===_id)

  const discountedPrice = calculateDiscountedPrice(price, discount);
  const navigate = useNavigate();

  const handleFavouriteClick = async () => {

    const url = import.meta.env.VITE_SERVER_URL;

    try{
      await axios.put(`${url}/api/favourite`,{productId: _id,action:!favourite},{withCredentials:true});


      const response = await axios.get(`${url}/api/favourite`,{withCredentials:true});

      dispatch(addProductToFavourite(response.data.favouriteData.products));

    }catch(error){
      console.log("Favourite Error",error)
    }

  }

  const currentUser = useAppSelector(selectCurrentUser);


  return (
    <>
   {isSmall ? (
     <Card className="min-w-56 overflow-hidden h-72 flex flex-col justify-between border border-gray-300 pt-2 hover:border-green-500 relative group">
     {isFeatured &&  <div className="absolute px-10 sm:px-5 md:px-10 top-0 right-0 z-10 bg-green-700 text-white py-1">
        Featured
      </div>}
      {currentUser && (<div className="absolute px-3 py-1 top-10 right-1 z-10 cursor-pointer">

        <div className="rounded-lg relative shadow-sm shadow-gray-400 px-2 py-1 cursor-pointer" onClick={handleFavouriteClick}>
          <img src={favourite ? "/leaves1.png":"/leaves.png"} alt="favourite" className="w-4 h-4" />

        </div>

      </div>)}
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none cursor-pointer"
        onClick={() => {
          storeObjectInLocalStorage('productdata',productData);
          navigate(`/products/${_id}`)
        }}
      >
        <img src={images[0]} alt={name} className="w-full h-36" />
      </CardHeader>
      <CardBody className="space-y-2">
        <Typography variant="h6" color="blue-gray">
          {name.length > 15 ? name.substring(0,15) + "..." : name}
        </Typography>
        <Typography
          variant="lead"
          color="gray"
          className="mt-3 font-normal text-sm"
        >
          <p className="line-clamp-1">{description}</p>
        </Typography>
        <div className="flex justify-start items-end gap-x-3 flex-wrap gap-y-3">
          <Typography className="line-through text-gray-500/90 text-sm">
            {formatCurrency(price)}
          </Typography>
          <div className="flex justify-start items-center gap-x-3">
          <Typography className="font-semibold text-lg">
            {formatCurrency(discountedPrice)}
          </Typography>
          <Typography className="text-green-500 font-bold text-sm shrink-0">
            ({Math.round(discount)}% OFF)
          </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
   ) : ( <Card className="max-w-[24rem] max-h-[33rem] overflow-hidden h-full flex flex-col justify-between border border-gray-300 pt-2 hover:border-green-500 relative group">
     {isFeatured &&  <div className="absolute px-10 sm:px-5 md:px-10 top-0 right-0 z-10 bg-green-700 text-white py-1">
        Featured
      </div>}
      {currentUser && (<div className="absolute px-3 py-1 top-10 right-1 z-10 ">

        <div className="rounded-lg relative shadow-sm shadow-gray-400 px-2 py-1 cursor-pointer bg-white" onClick={handleFavouriteClick}>
          <img src={favourite ? "/leaves1.png":"/leaves.png"} alt="favourite" className="w-6 h-6" />

        </div>

      </div>)}
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none cursor-pointer"
        onClick={() => {
          storeObjectInLocalStorage('productdata',productData);
          navigate(`/products/${_id}`)}}
      >
        <img src={images[0]} alt={name} />
      </CardHeader>
      <CardBody className="space-y-2">
        <Typography variant="h4" color="blue-gray">
          {name.length>40 ? name.substring(0,40) + "..." : name}
        </Typography>
        <Typography
          variant="lead"
          color="gray"
          className="mt-3 font-normal text-sm"
        >
          <p className="line-clamp-2">{description}</p>
        </Typography>
        <div className="flex justify-start items-end gap-x-3 flex-wrap">
          <Typography className="line-through text-gray-500/90">
            {formatCurrency(price)}
          </Typography>
          <div className="flex justify-center items-center gap-x-3">
          <Typography className="font-semibold text-lg lg:text-2xl">
            {formatCurrency(discountedPrice)}
          </Typography>
          <Typography className="text-green-500 font-bold text-lg lg:text-2xl shrink-0">
            ({Math.round(discount)}% OFF)
          </Typography>
          </div>
        </div>
      </CardBody>
    </Card>)}
    </>
  );
};
export default Product;
