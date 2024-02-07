import { ReactNode } from "react";

interface BannerProps {
  src: string;
  titleContent: ReactNode;
  description?: string;
  buttonLabel: string;
}
const Banner = ({
  buttonLabel,
  src,
  titleContent,
  description,
}: BannerProps) => {
  return (
    <div className="relative min-w-full">
      <img
        src={src ? src : "/banner3.png"}
        alt="banner pic"
        className="rounded-b-xl w-screen"
      />

      <div className="absolute z-10 top-4 sm:top-1/3 md:top-1/3 lg:top-1/3 w-7/12 sm:w-3/6 h-2/3">
        <div className="pl-7 py-3 lg:pl-20 lg:py-5">
          <h6 className="font-bold text-[10px] lg:text-sm lg:font-semibold">
            Healthy herbal
          </h6>
          {titleContent ? (
            titleContent
          ) : (
            <>
              <h1 className="text-[#679F0A] text-base sm:text-lg lg:text-3xl xl:text-5xl font-serif">
                Get 15% off
              </h1>
              <h1 className="text-[#679F0A] text-base sm:text-lg lg:text-3xl font-serif mb-1 lg:mb-3">
                Fresh Organic Product
              </h1>{" "}
            </>
          )}
          <p className="line-clamp-2 sm:line-clamp-none text-[9px] lg:text-xs mb-3 pr-5">
            {description
              ? description
              : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore, nobis? Quibusdam aut, voluptatum at illum quo sint vitae? Voluptatum facere sint veritatis dicta earum illo expedita ipsam sapiente consequatur aliquam?"}
          </p>
          <button
            className="px-2 py-2 md:px-5 text-[10px]  md:py-3 font-semibold md:text-xs text-white bg-[#679F0A] rounded-full cursor-pointer border-2 border-transparent hover:border-[#679F0A]
           hover:text-black transition-all duration-200 ease-in-out hover:shadow-md hover:shadow-gray-400/90 hover:bg-transparent"
          >
            {buttonLabel ? buttonLabel : "Button"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Banner;
