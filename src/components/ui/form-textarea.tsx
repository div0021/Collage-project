import { useState, ReactNode, useEffect, DetailedHTMLProps, TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { FieldError, FieldValues, Path, PathValue, UseFormRegister } from "react-hook-form";


interface FormTextAreaProps<T extends FieldValues> extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>,HTMLTextAreaElement> {
  disabled?: boolean;
  label?:string;
  placeholder?:string;
  className?:string;
  changeValue?:(value:string)=>void;
  children?:ReactNode;
  reset?:boolean;
  register:UseFormRegister<T>;
  errors?:FieldError;
  name:Path<T>;
}

function FormTextArea<T extends FieldValues>({disabled,label,placeholder,className,changeValue,reset,children,register,errors,name,required,...props }:FormTextAreaProps<T>) {
  const [parentHover, setParentHover] = useState<boolean>(false);
  const [parentFocus, setParentFocus] = useState<boolean>(false);

  const [value, setValue] = useState<PathValue<T,Path<T>>>();

  useEffect(()=>{
    if(reset){
      setParentFocus(false);
      setValue(undefined);
    }

  },[reset])


  return (
    <div
      className={cn(`rounded-lg border border-green-500 flex px-4 py-2.5 items-center relative group transition-all duration-300 ease-in-out tracking-wide ${
        parentFocus ? "ring-1 ring-offset-2 ring-[#679F0A]" : null
      } ${children ? "pr-0":"pr-5"}`,{" ring-red-500 border-red-500":errors},className)}
      onMouseEnter={() => setParentHover(true)}
      onMouseLeave={() => setParentHover(false)}
      onFocus={() => setParentFocus(true)}
      onBlur={() => setParentFocus(false)}
    >
      <label
        htmlFor=""
        className={`absolute top-2 left-5 transition-all duration-200 ease-in-out bg-white text-sm md:text-base ${
          parentHover || parentFocus 
          || (value && value.toString().length > 0)  
            ? " text-sm -translate-x-5 -translate-y-6 px-1 scale-90"
            : "px-0 translate-x-0 scale-100 -translate-y-0"
        } ${errors ? "text-red-500":"text-black"}`}
      >
        {label}{required && (parentHover || parentFocus 
          || value
          ) && <span className="text-red-500">*</span>}
      </label>

      <textarea 
        className={cn(`text-sm tracking-wide flex-auto hover:outline-none focus-within:outline-none bg-red w-10  ${children ? "py-1 md:w-5/12 pr-5" : "py-0 md:w-full pr-0"} tracking-wide`)}
        placeholder={parentHover || parentFocus  ? placeholder : ""}
        {...props}

        {...register(name,{value:value,onChange:(e) => {
          setValue(e.target.value)
          changeValue && changeValue(e.target.value);
        },
        disabled:disabled,
      })}
      />

      {errors?.message && (<>
      <p className="absolute -bottom-3 right-0 h-5 text-xs text-red-500 font-semibold max-w-[86%] truncate bg-white">{errors.message}</p>
      </>)}
      {children}
    </div>
  );
}
export default FormTextArea;
