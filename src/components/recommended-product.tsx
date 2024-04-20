import Product from "./product";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProductType } from "../lib/schema";
import CircularLoader from "./loaders/circular-loader";
import { useAppSelector } from "../app/hooks";
import { selectCurrentUser } from "../app/features/authSlice";
import { selectUserProfile } from "../app/features/profileSlice";

const RecommendedProducts = () => {

  const [products,setProducts] = useState<ProductType[]>([]);

  const [loading,setLoading] = useState<boolean>(false);

  useEffect(()=>{

    const getRecommandedProducts = async () => {

    const url = import.meta.env.VITE_SERVER_URL;

    try{
      setLoading(true);
      const response = await axios.get(`${url}/api/survey`,{withCredentials:true});

      const resultProduct:ProductType[]= response.data.selectProduct

      resultProduct.sort((a,b)=>{
        if(a.isFeatured && !b.isFeatured) return -1;
        else if(!a.isFeatured && b.isFeatured) return 1;
        else return 0;
      })

      setProducts(resultProduct);

    
    }catch(error){
      console.log("RECOMMENDError",error);
    }finally{
      setLoading(false);
    }
  }

  getRecommandedProducts();

  },[])

  const currentuser = useAppSelector(selectCurrentUser);
  const currentProfile = useAppSelector(selectUserProfile);

 if(!currentuser || !currentProfile){
  return null;
 }
  return (
    <>
      <div>
        <div className="w-full">
          <div className="w-full flex justify-center items-center text-center mt-5">
            <div className="space-y-1.5">
              <p className="text-sm font-bold text-[#679F0A]">
                Top Picks for You
              </p>

              <h2 className="text-4xl font-semibold">Recommended Products</h2>
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
           {currentuser && (<div className="w-full sm:w-auto grid-cols-1 sm:grid-cols-2 grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-6 xl:gap-8 justify-end sm:px-2 gap-y-10 sm:gap-y-4">
              {products.map((el) => {
                return (
                <div className="w-full h-full flex justify-center items-center" key={el._id}>
                  <Product
                    key={el._id}
                    productData={el}
                  
                  />
                </div>
              )})}
            </div>)
            }
          </div>
        </div>
      </div>
    </>
  );
};
export default RecommendedProducts;
