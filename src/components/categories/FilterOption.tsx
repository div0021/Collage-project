import { Checkbox, ListItemPrefix, Typography } from '@material-tailwind/react';

export interface FilterOptionProps {
  // Define your component props here
  label:string
}

const FilterOption = ({label}: FilterOptionProps) => {
  return (
    <label htmlFor={label.toLowerCase()} className="flex w-full cursor-pointer items-center px-1 py-2">
      <ListItemPrefix className="mr-3">
        <Checkbox id={label.toLowerCase()} 
        color="light-green"
        className=" before:hover:opacity-0" containerProps={{className:'p-1'}}  crossOrigin="" />
      </ListItemPrefix>
      <Typography className="font-medium">
        {label}
      </Typography>
    </label>
  );
};

export default FilterOption;