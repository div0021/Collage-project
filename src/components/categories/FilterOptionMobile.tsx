import { Checkbox, ListItemPrefix, Typography } from "@material-tailwind/react";
import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { Category, selectFilterCategory } from "../../app/features/filterSlice";

export interface FilterOptionMobileProps {
  // Define your component props here
  label: string;
  handleCheck?: (feature: boolean) => void;
  handlemultipleCheck?: (label: string, action: boolean) => void;
  className?: string;
  actives?: string[];
  active?: boolean;
  categoryTitle:Category
}

const FilterOptionMobile = ({
  label,
  active,
  actives,
  handleCheck,
  handlemultipleCheck,
  categoryTitle,
}: FilterOptionMobileProps) => {
  useEffect(() => {
    const isChecked = actives
      ? actives.indexOf(label) !== -1
        ? true
        : false
      : active
      ? true
      : false;

    setValue(isChecked);
  }, [label, active, actives]);

  const [value, setValue] = useState<boolean>(false);

  
  const selectCategory = useAppSelector(selectFilterCategory);

  let sub:string[] = useMemo(()=>[],[]);

  selectCategory.forEach(item=>{
    if(item.category===categoryTitle){
      sub=item.subcategories
    }
  })


  useEffect(() => {
    if (sub && sub.length === 0) {
      setValue(false);
    }
  }, [sub]);

  return (
    <label
      htmlFor={`${label.toLowerCase()}mobile`}
      className="flex w-full cursor-pointer items-center px-1 py-2"
    >
      <ListItemPrefix className="mr-3">
        <Checkbox
          id={`${label.toLowerCase()}mobile`}
          color="light-green"
          className=" before:hover:opacity-0"
          containerProps={{ className: "p-1" }}
          crossOrigin=""
          checked={value}
          onChange={(e) => {
            setValue(e.target.checked);
            handleCheck && handleCheck(e.currentTarget.checked);

            handlemultipleCheck &&
              handlemultipleCheck(label, e.currentTarget.checked);
          }}
        />
      </ListItemPrefix>
      <Typography className="font-medium">{label}</Typography>
    </label>
  );
};

export default FilterOptionMobile;
