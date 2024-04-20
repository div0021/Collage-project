import { Checkbox, ListItemPrefix, Typography } from '@material-tailwind/react';
import { cn } from '../../lib/cn';

export interface AdminFilterOptionProps {
  // Define your component props here
  label:string;
  handleCheck?: (feature: boolean) => void;
  handlemultipleCheck?:(label:string,action:boolean) => void;
  className?:string;
  actives?:string[];
  active?:boolean;
}

const AdminFilterOption = ({active,actives,handlemultipleCheck,label,handleCheck,className}: AdminFilterOptionProps) => {

  const isChecked = actives ? actives.indexOf(label)!== -1 ? true : false : active ? true : false;

  return (
    <label htmlFor={label.toLowerCase()} className={cn("flex w-full cursor-pointer items-center px-1 py-2",className)}>
      <ListItemPrefix className="mr-3">
        <Checkbox id={label.toLowerCase()} 
        color="light-green"
        className=" before:hover:opacity-0" containerProps={{className:'p-1'}}  crossOrigin="" onChange={(e)=>{
        handleCheck && handleCheck(e.currentTarget.checked)

        handlemultipleCheck && handlemultipleCheck(label,e.currentTarget.checked)
        
        }} defaultChecked={isChecked}/>
      </ListItemPrefix>
      <Typography className="font-medium">
        {label}
      </Typography>
    </label>
  );
};

export default AdminFilterOption;