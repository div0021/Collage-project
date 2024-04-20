import Product from "./product";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ProductType } from "../lib/schema";
import CircularLoader from "./loaders/circular-loader";
import { useAppSelector } from "../app/hooks";
import { selectCurrentUser } from "../app/features/authSlice";

const TopProducts = () => {

  const [products,setProducts] = useState<ProductType[]>([]);

  const [loading,setLoading] = useState<boolean>(false);

  useEffect(()=>{

    const getAllProducts = async () => {

    const url = import.meta.env.VITE_SERVER_URL;

    try{
      setLoading(true);
      const response = await axios.get(`${url}/api/products`);

      const resultProduct:ProductType[]= response.data.products.filter((_:ProductType,index:number)=>index<=6)

      resultProduct.sort((a,b)=>{
        if(a.isFeatured && !b.isFeatured) return -1;
        else if(!a.isFeatured && b.isFeatured) return 1;
        else return 0;
      })

      setProducts(resultProduct);

    
    }catch(error){
      console.log("Error",error);
    }finally{
      setLoading(false);
    }
  }

  getAllProducts();

  },[])
  // const topProduct = productData.filter((_, index) => index < 6);

  const currentuser = useAppSelector(selectCurrentUser);

  const carouselRef = useRef<HTMLDivElement>(null);

    const scrollProducts = (direction: 'prev' | 'next') => {
        const scrollAmount = direction === 'prev' ? -240 : 240;
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });
        }
    };

  return (
    <>
      <div>
        <div className="w-full">
          <div className="w-full flex justify-center items-center text-center mt-10">
            <div className="space-y-1.5">
              <p className="text-sm font-bold text-[#679F0A]">
                Exclusive products
              </p>

              <h2 className="text-4xl font-semibold">Top Products</h2>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:m-10 pt-5">
          <div className="w-full h-full">
          {
                loading && products.length===0 && (
                  <div className="w-full py-10 flex justify-center items-center">
                    <CircularLoader />
                  </div>
                )
              }

              {/* Not login */}
           {!currentuser ? (<div className="w-full sm:w-auto grid-cols-1 sm:grid-cols-2 grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-6 justify-end sm:px-2 gap-y-10 sm:gap-y-4">
              {products.map((el) => {
                return (
                <div className="w-full h-full flex justify-center items-center" key={el._id}>
                  <Product
                    key={el._id}
                    productData={el}
                  
                  />
                </div>
              )})}
            </div>):(
                
                  <div className="w-full">
                   <div className="relative w-full overflow-hidden">
            <div className="flex items-center space-x-4 py-4 px-10">
                <button
                    className="absolute inset-y-0 left-0 z-10 bg-white bg-opacity-50 text-xl flex items-center justify-center w-12 h-full"
                    onClick={() => scrollProducts('prev')}
                >
                    ❮
                </button>
                <div
                    ref={carouselRef}
                    className="flex flex-nowrap overflow-x-auto gap-x-5 scrollbar-hide"
                >
                    {products.map((el) => {
                
                return (
                <div className="w-full h-full flex justify-center items-center" key={el._id}>
                  <Product
                    key={el._id}
                    productData={el}
                    isSmall={true}
                  />
                </div>
              )})}
                </div>
                <button
                    className="absolute inset-y-0 right-0 z-10 bg-white bg-opacity-50 text-xl flex items-center justify-center w-12 h-full"
                    onClick={() => scrollProducts('next')}
                >
                    ❯
                </button>
            </div>
        </div>
                  </div>
                )
            }
          </div>
        </div>
      </div>
    </>
  );
};
export default TopProducts;
