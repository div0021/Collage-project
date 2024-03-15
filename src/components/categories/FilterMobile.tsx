import { Drawer, Typography } from "@material-tailwind/react";
import { RxCross2 } from "react-icons/rx";
import { data, price } from "./Ayurvedic";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { onFilterClose, selectFilterOpen } from "../../app/features/filterSlice";
import FilterSectionMobile from "./FilterSectionMobile";
import { useEffect } from "react";


const FilterMobile = () => {

  const dispatch = useAppDispatch();


  useEffect(()=>{

    const handleFilter = ()=>{
      if(window.innerWidth>960){
        dispatch(onFilterClose())
  }
}
   window.addEventListener('resize',handleFilter)

    return () => window.removeEventListener('resize',handleFilter)

  },[])

  const filterOpen = useAppSelector(selectFilterOpen)

  return (
    <Drawer
      className=""
      open={filterOpen}
      onClose={() => {dispatch(onFilterClose())}}
    >
      <div className="w-full border border-red-500">
        <div className="mb-2 m-4 flex items-center justify-between">
          <Typography variant="h5" color="green" className="text-2xl">
            Filter Products
          </Typography>
          <RxCross2 className="w-5 h-5 cursor-pointer hover:scale-105 opacity-60 hover:opacity-90 transition-all duration-300 ease-in-out" onClick={()=> dispatch(onFilterClose())} />
        </div>

        <div className="m-4 space-y-3" onClick={(e)=>e.stopPropagation()}>
          <FilterSectionMobile filterHeading="Sub Categories" data={data} />
          <FilterSectionMobile filterHeading="Price" data={price} />
        </div>
      </div>
    </Drawer>
  );
};

export default FilterMobile;
