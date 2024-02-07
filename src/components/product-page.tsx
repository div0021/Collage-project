import { useParams } from "react-router-dom";
import ComponentWrapper from "./component-wrapper";
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
import {useContext, useState } from "react";
import { BiLeaf } from "react-icons/bi";
import productData from "../data/product.json"
import { ProviderContext, ProviderContextType } from "./provider/provider";
import { IoAdd } from "react-icons/io5";
import {RiSubtractFill} from "react-icons/ri"

const data = [
  { img: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGlua2VkaW4lMjBiYW5uZXJ8ZW58MHx8MHx8fDA%3D",
    value:'product_img1'
},
  { img: "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
    value:'product_img2'
},
  { img: "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
    value:'product_img3'
},
  { img: "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
    value:'product4_img'
},
];


const ProductPage = () => {
  const { productId } = useParams();

  const {setIsOpen} = useContext(ProviderContext) as ProviderContextType;

  const product = productData.filter(el=>el.id===productId)[0];

  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="w-screen">
      <ComponentWrapper>
        <div className="p-10 pt-28 lg:pt-44">
          <div>
            <div className="grid grid-cols:1 lg:grid-cols-2 gap-16">

              {/* Images Section */}
              <div>
                <Tabs value="image1">
                  <TabsBody className="">
                    {product.image.map((el) => (
                      <TabPanel key={el.label} value={el.label} className="flex justify-center items-center">
                        <div className="relative">
                        <img src={el.url} alt="image" className="max-h-96"/>
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

                  <Button size="md" color="green" className="px-5 rounded-full" onClick={()=>setIsOpen(true)}>Add to Cart</Button>
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
      </ComponentWrapper>
    </div>
  );
};

export default ProductPage;
