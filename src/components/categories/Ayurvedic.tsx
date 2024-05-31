import { SlArrowUp } from "react-icons/sl";
import ComponentWrapper from "../component-wrapper";
import { IoFilterCircleOutline } from "react-icons/io5";
import { Option, Select } from "@material-tailwind/react";
import FilterSection from "./FilterSection";
import Product from "../product";
import { useEffect, useState } from "react";
import { cn } from "../../lib/cn";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  onFilterOpen,
  resetFilterOptions,
  selectFilterCategory,
} from "../../app/features/filterSlice";
import axios from "axios";
import { ProductType } from "../../lib/schema";
import CircularLoader from "../loaders/circular-loader";
import Button from "../ui/button";
import FilterCheckboxSection from "./FilterCheckboxSection";
import { price } from "../../lib/price";
import { calculateDiscountedPrice } from "../../lib/calculateDiscountedPrice";
import { GrPowerReset } from "react-icons/gr";
import {
  addSubCategories,
  selectSubCategories,
} from "../../app/features/subCategoriesSlice";
import { formatCurrency } from "../../lib/formatCurrency";

const Ayurvedic = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleFilterClick = () => {
    if (window.innerWidth <= 960) {
      dispatch(onFilterOpen({ category: "Ayurvedic" }));
    } else {
      setShowFilter((pre) => !pre);
    }
  };

  const [ayurvedicProducts, setAyurvedicProducts] = useState<ProductType[]>([]);

  const [filterProducts, setFilterProducts] = useState<ProductType[]>([]);

  // const priceOptions = useAppSelector(selectFilterPriceOptions);

  const selectCategory = useAppSelector(selectFilterCategory);

  const priceOptions = selectCategory.map((item) =>
    item.category === "Ayurvedic" ? item.filterPriceOption : undefined
  )[0];

  const categoryOptions = selectCategory.map((item) =>
    item.category === "Ayurvedic" ? item.subcategories : []
  )[0];

  const [selectValue, setSelectValue] = useState<string>("featured");

  const handleSelectChange = (e: string | undefined) => {
    if (e) {
      setSelectValue(e);

      const result: ProductType[] = filterProducts;

      if (e === "featured") {
        result.sort((a, b) => {
          const featuredA = a.isFeatured ? 1 : 0;
          const featuredB = b.isFeatured ? 1 : 0;

          return featuredB - featuredA;
        });
      } else if (e === "dsc") {
        result.sort((a, b) => {

          const aPrice = Math.round(calculateDiscountedPrice(a.price,a.discount));
          const bPrice = Math.round(calculateDiscountedPrice(b.price,b.discount));
          if (aPrice !== bPrice) {
            return bPrice - aPrice;
          }

          if (a.isFeatured !== b.isFeatured) {
            const featuredA = a.isFeatured ? 1 : 0;
            const featuredB = b.isFeatured ? 1 : 0;

            return featuredB - featuredA;
          }

          return 0;
        });
      } else if (e === "asc") {
        result.sort((a, b) => {
          const aPrice = Math.round(calculateDiscountedPrice(a.price,a.discount));
          const bPrice = Math.round(calculateDiscountedPrice(b.price,b.discount));
          if (aPrice !== bPrice) {
            return aPrice - bPrice;
          }

          if (a.isFeatured !== b.isFeatured) {
            const featuredA = a.isFeatured ? 1 : 0;
            const featuredB = b.isFeatured ? 1 : 0;

            return featuredB - featuredA;
          }

          return 0;
        });
      }
      setFilterProducts(result);

      const url = new URL(window.location.href);
      const currentUrl = window.location.href;
      const params = new URLSearchParams(url.search);

      params.delete("sort");
      params.append("sort", e as string);

      const newURL = `${currentUrl.split("?")[0]}?${params.toString()}`;

      window.history.pushState({ path: newURL }, "", newURL);
    }
  };

  useEffect(() => {
    if (ayurvedicProducts && ayurvedicProducts.length > 0) {
      let result: ProductType[] = ayurvedicProducts;

      // price filter
      if (priceOptions) {
        result = ayurvedicProducts.filter((product) => {
          return (
            calculateDiscountedPrice(product.price, product.discount) >=
              priceOptions.min &&
            calculateDiscountedPrice(product.price, product.discount) <=
              priceOptions.max
          );
        });
      }

      // Category filter
      if (categoryOptions && categoryOptions.length > 0) {
        result = result.filter((product) => {
          for (const sub1 of product.subCategories) {
            for (const sub2 of categoryOptions) {
              if (sub1 === sub2) return true;
            }
          }
        });
      }

      result.sort((a, b) => {
        const featuredA = a.isFeatured ? 1 : 0;
        const featuredB = b.isFeatured ? 1 : 0;

        return featuredB - featuredA;
      });

      setFilterProducts(result);
    }
  }, [ayurvedicProducts, categoryOptions, priceOptions, selectValue]);

  const subCategories = useAppSelector(selectSubCategories);

  useEffect(() => {
    const getAyurvedicProduct = async () => {
      try {
        const url = import.meta.env.VITE_SERVER_URL;

        const response = await axios.get(
          `${url}/api/products/category/6612674f59193eeb4d734225`
        );


        setAyurvedicProducts(response.data.products);
      } catch (error) {
        console.log("GETAP", error);
      }
    };
    getAyurvedicProduct();
  }, []);

  useEffect(() => {
    if (ayurvedicProducts.length > 0) {
      const temp = ayurvedicProducts[0].category.subCategories.map((el) => {
        return { label: el };
      });

      temp.sort((a, b) => {
        return a.label.localeCompare(b.label);
      });

      dispatch(addSubCategories(temp));
    }
  }, [ayurvedicProducts, dispatch]);

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

            <div className="mt-14 sm:mt-20 space-y-5 sm:space-y-0 sm:flex justify-between items-center">
              <div
                className="flex justify-start items-center h-14 w-32 rounded-full cursor-pointer p-2 gap-x-3 border border-green-900 hover:bg-green-200/50 transition-all duration-300 ease-in-out text-green-800"
                onClick={handleFilterClick}
              >
                <IoFilterCircleOutline className="h-10 w-10" />
                <p className="text-xl font-medium tracking-wider">Filter</p>
              </div>
              <div className="w-80 sm:w-72 mb">
                <Select
                  label="Sort by"
                  className="h-10 w-full sm:w-[288.5px]"
                  color="green"
                  value={selectValue}
                  onChange={handleSelectChange}
                >
                  <Option value="dsc">Price (high to low)</Option>
                  <Option value="asc">Price (low to high)</Option>
                  <Option value="featured">Featured</Option>
                </Select>
              </div>
            </div>

            {(priceOptions || categoryOptions) && (
              <div className="w-full py-5 px-32 flex flex-wrap justify-start items-center gap-5">
                {categoryOptions.map((sub) => (
                  <span
                    key={sub}
                    className="px-3 py-1.5 border border-green-700 rounded-full bg-green-400/40"
                  >
                    {sub}
                  </span>
                ))}

                {priceOptions && (
                  <span className="px-3 py-1.5 border border-green-700 rounded-full bg-green-400/40">
                    {`${formatCurrency(priceOptions.min)} - ${formatCurrency(
                      priceOptions.max
                    )}`}
                  </span>
                )}
              </div>
            )}

            {/* For Large Screens */}

            <div className="flex mt-5">
              <div
                className={cn("hidden lg:block lg:w-1/4 space-y-5", {
                  "lg:hidden": showFilter,
                })}
              >
                {subCategories.length > 0 ? (
                  <FilterSection
                    categoryTitle="Ayurvedic"
                    filterHeading="Sub Categories"
                    data={subCategories}
                  />
                ) : (
                  <div className="w-full h-52 flex justify-center items-center">
                    <CircularLoader />
                  </div>
                )}

                <FilterCheckboxSection
                  categoryTitle="Ayurvedic"
                  filterHeading="Price"
                  data={price}
                />

                <div className="w-full flex justify-start items-center">
                  <Button
                    icon={GrPowerReset}
                    label="Reset"
                    className="w-52 hover:text-white"
                    onClick={() => {
                      dispatch(resetFilterOptions({ category: "Ayurvedic" }));
                    }}
                  />
                </div>
              </div>

              {/* List Ayurvedic Products */}

              {ayurvedicProducts.length === 0 && (
                <div className="w-full py-10 flex justify-center items-start">
                  <CircularLoader />
                </div>
              )}

              {ayurvedicProducts.length > 0 && (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-3 gap-3">
                  {filterProducts.map((el) => {
                    return (
                      <div
                        className="w-full h-full flex justify-center items-start"
                        key={el._id}
                      >
                        <Product key={el._id} productData={el} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </ComponentWrapper>
    </div>
  );
};

export default Ayurvedic;
