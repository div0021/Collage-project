import { Checkbox, ListItemPrefix, Typography } from '@material-tailwind/react';

export interface FilterOptionMobileProps {
  // Define your component props here
  label:string
}

const FilterOptionMobile = ({label}: FilterOptionMobileProps) => {

  return (
    <label htmlFor={`${label.toLowerCase()}mobile`} className="flex w-full cursor-pointer items-center px-1 py-2">
      <ListItemPrefix className="mr-3">
        <Checkbox id={`${label.toLowerCase()}mobile`} 
        color="light-green"
        className=" before:hover:opacity-0" containerProps={{className:'p-1'}}  crossOrigin="" />
      </ListItemPrefix>
      <Typography className="font-medium">
        {label}
      </Typography>
    </label>
  );
};

export default FilterOptionMobile;