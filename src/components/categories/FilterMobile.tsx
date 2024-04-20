import { Drawer, Typography } from "@material-tailwind/react";
import { RxCross2 } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  onFilterClose,
  resetFilterOptions,
  selectFilterOpen,
} from "../../app/features/filterSlice";
import FilterSectionMobile from "./FilterSectionMobile";
import { useEffect } from "react";
import Button from "../ui/button";
import { selectSubCategories } from "../../app/features/subCategoriesSlice";
import FilterCheckboxSection from "./FilterCheckboxSection";
import { price } from "../../lib/price";
import { GrPowerReset } from "react-icons/gr";

const FilterMobile = () => {

  const filterOpen = useAppSelector(selectFilterOpen);

  const dispatch = useAppDispatch();

  const subCategories = useAppSelector(selectSubCategories);

  useEffect(() => {
    const handleFilter = () => {
      if (window.innerWidth > 960) {
        dispatch(onFilterClose({category:filterOpen.category}));
      }
    };
    window.addEventListener("resize", handleFilter);

    return () => window.removeEventListener("resize", handleFilter);
  }, [dispatch, filterOpen]);


  return (
    <Drawer
      className="overflow-y-scroll"
      open={filterOpen.open}
      onClose={() => {
        dispatch(onFilterClose({category:filterOpen.category}));
      }}
    >
      <div className="w-full">
        <div className="mb-2 m-4 flex items-center justify-between">
          <Typography variant="h5" color="green" className="text-2xl">
            Filter Products
          </Typography>
          <RxCross2
            className="w-5 h-5 cursor-pointer hover:scale-105 opacity-60 hover:opacity-90 transition-all duration-300 ease-in-out"
            onClick={() => dispatch(onFilterClose({category:filterOpen.category}))}
          />
        </div>

        <div className="m-4 space-y-3" onClick={(e) => e.stopPropagation()}>
          <FilterSectionMobile categoryTitle={filterOpen.category}
            filterHeading="Sub Categories"
            data={subCategories}
          />

          <FilterCheckboxSection categoryTitle={filterOpen.category} filterHeading="Price" data={price} />
        </div>

        <div className="w-full mb-10 flex justify-center items-center">
          <Button
            label="Reset"
            className="w-52 hover:text-white"
            icon={GrPowerReset}
            onClick={() => {
              dispatch(resetFilterOptions({category:filterOpen.category}));
              dispatch(onFilterClose({category:filterOpen.category}));
            }}
          />
        </div>
      </div>
    </Drawer>
  );
};

export default FilterMobile;
