import { useParams } from "react-router-dom";
import {
  Button,
  IconButton,
  Rating,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import {useContext, useEffect, useState } from "react";
import { BiLeaf } from "react-icons/bi";
import productData from "../data/product.json"
import { CartActionKind, ProviderContext, ProviderContextType } from "./provider/provider";
import { IoAdd } from "react-icons/io5";
import {RiSubtractFill} from "react-icons/ri"




const ProductPage = () => {
  const { productId } = useParams();

  const {setIsOpen,dispatch,cartState} = useContext(ProviderContext) as ProviderContextType;

  const product = productData.filter(el=>el.id===productId)[0];

  const [quantity, setQuantity] = useState<number>(1);

  const isPresentInCart = cartState.productsInCart.filter(item=>item.id === productId).length > 0;

  useEffect(()=>{
    window.scrollTo(0,0);
  },[])

  return (
    <div className="w-full">
        <div className="px-5 sm:p-10 pt-10 sm:pt-28 lg:pt-44">
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

              {/* Images Section */}
              <div className="w-full">
                <Tabs value="image1">
                  <TabsBody className="">
                    {product.image.map((el) => (
                      <TabPanel key={el.label} value={el.label} className="flex justify-start  sm:justify-center items-center mx-auto ">
                        <div className="relative">
                        <img src={el.url} alt="image" className="max-h-96 mx-auto"/>
                        </div>
                       
                      </TabPanel>
                    ))}
                  </TabsBody>
                  <TabsHeader className="bg-transparent space-x-5 justify-center">
                    {product.image.map((el) => (
                      <Tab key={el.label} value={el.label} className="w-12">
                        <img className="w-12 h-12 rounded-full" src={el.url} alt="image" />
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

                <div className="flex justify-start items-baseline space-x-2">
                  <p className="line-through opacity-80">₹{product.price.original}</p>
                  <p className="font-semibold">₹{product.price.original}</p>
                  <p className="text-xs text-green-500 font-semibold">{product.price.percent}% off</p>
                </div>

                {/* description */}
                <div>
                  <p className="w-full lg:w-[70%] text-gray-800 text-sm tracking-wide">
                    {product.description}</p>
                </div>

                {/* Quantity  */}
                <div className="flex justify-start items-center gap-3">
                  <IconButton
                    size="sm"
                    variant="outlined"
                    color="light-green"
                    onClick={() => setQuantity((pre) => ++pre)}
                  >
                    <IoAdd className="text-base" />
                  </IconButton>
                  <span>{quantity}</span>
                  <IconButton
                    size="sm"
                    variant="outlined"
                    color="light-green"
                    disabled={quantity===1}
                    onClick={() => setQuantity((pre) => --pre)}
                  >
                    <RiSubtractFill />
                  </IconButton> 

                  <Button size="md" color="green" className="px-5 rounded-full" onClick={()=>{

                    if(!isPresentInCart){
                      dispatch({type:CartActionKind.ADD,payload:Number(productId)})
                    }
                    
                    setIsOpen(true)
                    }}>{isPresentInCart ? "Go to Cart" : "Add to cart"}</Button>
                </div>

                
              {/* Rating */}
              <Rating value={Number(product.rating)} ratedColor={Number(product.rating) > 4 ? "green" : Number(product.rating) > 2 ? "yellow" : "red"} unratedColor={Number(product.rating) > 4 ? "green" : Number(product.rating) > 2 ? "yellow" : "red"} readonly/>


                <div className="flex gap-4">
                    <BiLeaf className="w-6 h-6"/>
                    <p>Add to favourites</p>

                </div>
                <div className="mt-2">
                    <Button className="flex justify-center items-center space-x-2"><div className="bg-white rounded-full w-5 h-5 text-sm text-black">?</div>  <span className="text-white">Ask a question</span></Button>
                </div>

                <div className="w-full mt-5 flex justify-start items-start gap-2">
                  <p>Categories:</p>
                  <p>{product.categories.map(el=>el.charAt(0).toUpperCase() + el.slice(1,)).join(', ')}</p>

                </div>
              </div>
              <div>
                {/* Todo */}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ProductPage;
