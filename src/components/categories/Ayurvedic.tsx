import { SlArrowUp } from "react-icons/sl";
import ComponentWrapper from "../component-wrapper";
import { IoFilterCircleOutline } from "react-icons/io5";
import { Option, Select } from "@material-tailwind/react";

interface AyurvedicProps {
  // Define your component props here
}

const Ayurvedic = ({}: AyurvedicProps) => {
  return (
    <div className="w-full">
      <ComponentWrapper>
        <div className="flex flex-col items-center justify-center overflow-x-hidden">
          <div className="mt-32 mb-10 max-w-7xl border border-red-500">
            <div className="flex items-center text-sm text-gray-800/90 gap-x-1.5">
              <SlArrowUp
                className={`h-3.5 w-3.5   transition-transform -rotate-90`}
              />
              <span>cateogy</span>
              <span>/</span>
              <span>ayurvedic</span>
            </div>
            <div className="mt-10 lg:flex lg:justify-between lg:items-center">
              <h2 className="text-5xl font-bold tracking-wide">Ayurvedic</h2>
              <p className="lg:w-2/3 text-gray-700">
                Immerse yourself in natural wellness with our curated collection
                of Ayurvedic products, carefully crafted to promote holistic
                health. Explore the power of Ayurveda for a balanced and
                rejuvenated lifestyle, available at your fingertips
              </p>
            </div>

            {/* Filter */}

            <div className="mt-20 flex justify-between items-center px-5">
              <div className="flex justify-start items-center h-10 w-32 rounded-full cursor-pointer p-2 gap-x-3 border border-green-900 bg-green-200/50">
                <IoFilterCircleOutline className="h-10 w-10" />
                <p className="text-xl font-medium tracking-wider text-green-800">
                  Filter
                </p>
              </div>
              <div className="w-72">
                <Select label="Sort by" className="h-5 w-[262px]">
                  <Option value="dsc">Price (high to low)</Option>
                  <Option value="asc">Price (low to high)</Option>
                  <Option value="feature">Feature</Option>
                  <Option value="bestSeller">Best Seller</Option>
                </Select>
              </div>
            </div>

            <div className="flex">
              <div className="lg:w-1/4">
                <h6 className="">Sub Categories</h6>
              </div>
            </div>
          </div>
        </div>
      </ComponentWrapper>
    </div>
  );
};

export default Ayurvedic;
