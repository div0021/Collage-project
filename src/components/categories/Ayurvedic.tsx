import { SlArrowUp } from "react-icons/sl";
import ComponentWrapper from "../component-wrapper";
import { IoFilterCircleOutline } from "react-icons/io5";
import { Option, Select } from "@material-tailwind/react";
import { FilterOptionProps } from "./FilterOption";
import { formatCurrency } from "../../lib/formatCurrency";
import FilterSection from "./FilterSection";
import Product from "../product";
import TotalProducts from "../../data/product.json";

// interface AyurvedicProps {
//   // Define your component props here
// }

const data: FilterOptionProps[] = [
  { label: "Supplements" },
  { label: "Herbal Teas" },
  { label: "Skincare" },
  { label: "Hair care" },
  { label: "Oral care" },
  { label: "Digestive Health" },
  { label: "Cosmetics" },
  { label: "Immunity Booseter" },
];

const price: FilterOptionProps[] = [
  { label: `<= ${formatCurrency(100)}` },
  { label: `${formatCurrency(100)} - ${formatCurrency(500)}` },
  { label: `${formatCurrency(500)} - ${formatCurrency(1000)}` },
  { label: `${formatCurrency(1000)} - ${formatCurrency(2000)}` },

  { label: `>= ${formatCurrency(2000)}` },
];
const Ayurvedic = () => {
  const productData = TotalProducts.filter(
    (el) => el.categories.indexOf("aurvedic") !== -1
  );
  return (
    <div className="w-full">
      <ComponentWrapper>
        <div className="flex flex-col items-center justify-center overflow-x-hidden">
          <div className="mt-10 sm:mt-32 mb-10 max-w-7xl px-5 sm:px-10 2xl:px-0">
            <div className="flex items-center text-sm text-gray-800/90 gap-x-1.5">
              <SlArrowUp
                className={`h-3.5 w-3.5   transition-transform -rotate-90`}
              />
              <span>cateogy</span>
              <span>/</span>
              <span>ayurvedic</span>
            </div>
            <div className="space-y-3 lg:space-y-0 lg:px-0 mt-10 lg:flex lg:justify-between lg:items-center">
              <h2 className="text-5xl font-bold tracking-wide">Ayurvedic</h2>
              <p className="lg:w-2/3 text-gray-700">
                Immerse yourself in natural wellness with our curated collection
                of Ayurvedic products, carefully crafted to promote holistic
                health. Explore the power of Ayurveda for a balanced and
                rejuvenated lifestyle, available at your fingertips
              </p>
            </div>

            {/* Filter */}

            <div className="mt-14 sm:mt-20 space-y-3 sm:space-y-0 sm:flex justify-between items-center">
              <div className="flex justify-start items-center h-10 w-32 rounded-full cursor-pointer p-2 gap-x-3 border border-green-900 hover:bg-green-200/50 transition-all duration-300 ease-in-out text-green-800">
                <IoFilterCircleOutline className="h-10 w-10" />
                <p className="text-xl font-medium tracking-wider">Filter</p>
              </div>
              <div className="w-80 sm:w-72">
                <Select label="Sort by" className="h-5 w-[91.5%] sm:w-[260.5px]">
                  <Option value="dsc">Price (high to low)</Option>
                  <Option value="asc">Price (low to high)</Option>
                  <Option value="feature">Feature</Option>
                  <Option value="bestSeller">Best Seller</Option>
                </Select>
              </div>
            </div>

            <div className="flex mt-5">
              <div className="hidden lg:block lg:w-1/4 space-y-5">
                <FilterSection filterHeading="Sub Categories" data={data} />
                <FilterSection filterHeading="Price" data={price} />
              </div>

              {/* List Ayurvedic Products */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-3">
                {productData.map((el) => (
                  <div className="flex justify-center items-center" key={el.id}>
                    <Product
                      description={el.description}
                      discount={Number(el.price.discount)}
                      id={el.id}
                      image={el.image[0].url}
                      name={el.name}
                      orginalPrice={Number(el.price.original)}
                      price={Number(el.price.discount)}
                      rating={el.rating}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ComponentWrapper>
    </div>
  );
};

export default Ayurvedic;
