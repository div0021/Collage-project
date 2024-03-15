import { MouseEvent, useEffect, useState } from "react";
import { cn } from "../../lib/cn";
import { FaAngleDown } from "react-icons/fa";
// import { useAppDispatch } from "../app/hooks";
// import { setSort } from "../app/features/filterSlice";
import { Country } from "country-state-city";


interface SelectProps {
    data:{
        label:string,
        id:string,
    }[];
    name:string
}

const Select = ({name,data}:SelectProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [anotherOpen, setAnotherOpen] = useState<boolean>(false);
//   const queryParams = new URLSearchParams(window.location.search);

//   const newSortOption = queryParams.get("sort");
  const [currentData, setCurrentData] = useState("");

//   const dispatch = useAppDispatch();

  useEffect(() => {
    if (open) {
      setAnotherOpen(true);
    }
  }, [open]);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const selectId = e.currentTarget.id;

    setCurrentData(data.find((el) => el.id === selectId)?.label || "");

    // const newSearchParams = new URLSearchParams(window.location.search);
    // newSearchParams.set("sort", selectId);
    // window.history.pushState(
    //   { sort: selectId },
    //   `Sort ${selectId}`,
    //   `?${newSearchParams.toString()}`
    // );

    // dispatch(setSort(selectId))
    setAnotherOpen(false);
    setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  console.log(Country.getAllCountries());

  return (
    <div
      className="w-full relative rounded-full"
      onClick={() => setOpen(pre=>!pre)}
    >
      <div className="w-full border rounded-full border-green-500 py-3 flex items-center justify-between cursor-pointer px-5">
        <span className="">{currentData.length > 0 ? currentData : name}</span>
        <FaAngleDown
          className={cn(
            "h-5 w-5 rotate-0 transition-all duration-300 ease-in-out",
            { "rotate-180": open }
          )}
        />
      </div>

      <div
        className={cn(
          "absolute w-full top-14 p-1 shadow-sm shadow-secondary rounded-xl bg-green-50 transition-all duration-300 translate-y-5 ease-in-out opacity-0 hidden gap-y-1 max-h-44 overflow-scroll",
          { "block opacity-0": open, "opacity-100 translate-y-0": anotherOpen }
        )} id="selectOptionBox"
      >
        {data.map((el) => (
          <div
            className="w-full p-2 hover:bg-secondary rounded-xl cursor-pointer transition-all duration-300 ease-in-out hover:text-white"
            key={el.id}
            id={el.id}
            onClick={handleClick}
          >
            {el.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
