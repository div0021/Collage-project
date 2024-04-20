import { useCallback, useEffect, useState } from "react";
import Banner from "./banner";
import TopProducts from "./top-product";
import Testimonial from "./testimonial";
import RecommendedProducts from "./recommended-product";
import ShowCase from "./showcase";


const LandingSection = () => {
  const [banner, setBanner] = useState<number>(0);

  const handleBannerSlide = useCallback(() => {
    if (banner === 2) {
      setBanner(0);
    } else {
      setBanner((pre) => pre + 1);
    }
  }, [banner]);
  useEffect(() => {
    const interval = setInterval(() => {
      handleBannerSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [handleBannerSlide]);


  useEffect(()=>{
    window.scrollTo({
      top:0,behavior:"smooth"
    })
      },[])



  return (
    <>
      <div className="space-y-20 lg:space-y-40">
        <div className=" w-full flex justify-center">
          <div className="w-full relative h-full">
            <div className="absolute z-10 left-[48%] bottom-2 px-2 py-1 bg-gray-50/10 rounded-full flex gap-2 items-center">
              <div
                className={`cursor-pointer bg-gray-500/60 hover:bg-gray-500/90 w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                  banner === 0 && "bg-gray-900 shadow-sm shadow-gray-400"
                }`}
                onClick={() => setBanner(0)}
              />

              <div
                className={`cursor-pointer bg-gray-500/60 hover:bg-gray-500/90 w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                  banner === 1 && "bg-gray-900 shadow-sm shadow-gray-400"
                }`}
                onClick={() => setBanner(1)}
              />

              <div
                className={`cursor-pointer bg-gray-500/60 hover:bg-gray-500/90 w-2 h-2 md:w-3 md:h-3 rounded-full ${
                  banner === 2 && "bg-gray-900 shadow-sm shadow-gray-400"
                }`}
                onClick={() => setBanner(2)}
              />
            </div>
            <div className="w-full overflow-hidden">
              <div
                className={`w-auto flex gap-10 transition-all duration-500 ease-in-out ${
                  banner === 0 && "translate-x-0"
                }
          ${banner === 1 && "-translate-x-[calc(100%+2.5rem)]"}
          ${banner === 2 && "-translate-x-[calc(2*(100%+2.5rem))]"}
          `}
              >
                <Banner
                name="Healthy herbal"
                  src="/banner3.jpg"
                  buttonLabel="Shop Now"
                  titleContent={
                    <>
                      <h1 className="text-[#679F0A] text-base sm:text-lg lg:text-3xl xl:text-6xl font-serif">
                        Get 15% off
                      </h1>
                      <h1 className="text-[#679F0A] text-base sm:text-lg lg:text-3xl font-serif mb-1 lg:mb-3 xl:text-5xl">
                        Fresh Organic Product
                      </h1>{" "}
                      
                    </>
                  }
                  buttonLink="/category/organic"
                  description="Explore our discount page for fresh, organic herbal products. Enjoy exclusive savings on a wide selection of premium herbs. Discover nature's best at unbeatable prices. Start your wellness journey with our discounted herbal offerings today!"
                />
                <Banner
                name="Natural supplements"
                  src="/banner4.png"
                  buttonLabel="Shop Now"
                  description="Discover incredible savings on our Ayurvedic supplements discount page. Dive into the world of ancient wellness with our curated selection of discounted herbal remedies. Explore natural solutions for holistic health at affordable prices. Embrace Ayurveda and elevate your well-being with our special offers!"
                  buttonLink="/category/ayurvedic"
                  titleContent={
                    <>
                      <h1 className="text-[#679F0A] text-base sm:text-lg lg:text-3xl font-serif xl:text-6xl">
                        Get upto 10% off
                      </h1>
                      <h1 className="text-[#679F0A] text-base sm:text-lg lg:text-3xl font-serif mb-1 lg:mb-3">
                         Ayurvedic Product
                      </h1>{" "}
                      
                    </>
                  }
                />
                <Banner
                name="Green house"
                  src="/banner3.jpg"
                  description="Explore our discount page for a range of eco-friendly household products. Discover sustainable solutions for every room in your home, from kitchen essentials to cleaning supplies. Enjoy exclusive discounts on environmentally conscious products that promote a greener lifestyle. Shop now and embrace a more eco-friendly way of living with our discounted household items!"
                  buttonLink="/category/ecofriendly"
                  buttonLabel="Shop Now"
                  titleContent={
                    <>
                      <h1 className="text-[#679F0A] text-base sm:text-lg lg:text-3xl xl:text-6xl font-serif">
                        Get upto 10% off
                      </h1>
                      <h1 className="text-[#679F0A] text-base sm:text-lg lg:text-3xl font-serif mb-1  xl:text-5xllg:mb-3">
                      Eco Products
                      </h1>{" "}
                    </>
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <RecommendedProducts />


        <TopProducts />

        <Testimonial />

        <ShowCase />
      </div>
    </>
  );
};
export default LandingSection;
