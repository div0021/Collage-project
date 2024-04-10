import { DetailedHTMLProps, SelectHTMLAttributes, useState } from "react";
import { cn } from "../../lib/cn";
import { FaAngleDown } from "react-icons/fa";
import { FieldError, FieldValues, Path, PathValue, UseFormRegister } from "react-hook-form";


interface FormSelectProps<T extends FieldValues> extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>,HTMLSelectElement> {
    data:{
        label:string,
        id:string,
    }[];
    label:string;
    register:UseFormRegister<T>;
  errors?:FieldError;
  name:Path<T>;
  handleValueChange?:(value:string)=>void;
}

function FormSelect<T extends FieldValues>({label,register,name,data,handleValueChange,errors,...props}:FormSelectProps<T>) {

  const [selectValue,setSelectValue] = useState<PathValue<T,Path<T>>>();

  return (
    <div
      className={cn("w-full h-14 relative flex justify-between items-center border rounded-full border-green-500 px-2 py-1 focus-within:ring-1 focus-within:ring-offset-2 focus-within:ring-green-400 transition-all duration-300 ease-in-out group",{"border-red-500 focus-within:ring-red-400":errors})}
    >



      <select className="w-full flex py-1 items-center justify-between cursor-pointer px-3 appearance-none outline-none focus-within:outline-none peer" {...props}  {...register(name,{value:selectValue,onChange:(e)=>{
        setSelectValue(e.target.value)
        handleValueChange && handleValueChange(String(e.target.value))
      }})} defaultValue={""}>
        <option className="" value="" disabled></option>
        {data.map(el=>(
          <option value={el.id} key={el.id}>{el.label}</option>

        ))}
      </select>

          {/* label */}

          <label htmlFor="" className={`absolute px-1 py-1 bg-white rounded-lg top-2.5 left-3.5 group-focus-within:scale-90 group-focus-within:-translate-x-0 group-focus-within:-translate-y-7 ${!selectValue ? "scale-100 translate-x-1 translate-y-0" : "scale-90 translate-x-0 -translate-y-7"}
          transition-all duration-300 ease-in-out`}>
          {label}
      </label>

      {errors?.message && (<>
      <p className="absolute -bottom-3 right-2 h-5 text-xs text-red-500 font-semibold max-w-[80%] truncate bg-white">{errors.message}</p>
      </>)}

      <FaAngleDown
          className={cn(
            "absolute top-5 right-4 h-5 w-5 rotate-0 transition-all duration-300 ease-in-out  peer-focus-within:-rotate-180"
          )}
        />
    </div>
  );
}

export default FormSelect;
