import { useState, useCallback,HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode, useEffect, DetailedHTMLProps } from "react";
import { TbEye, TbEyeOff } from "react-icons/tb";
import { IconType } from "react-icons";
import { cn } from "../../lib/cn";
import { FieldError, FieldValues, Path, PathValue, UseFormRegister } from "react-hook-form";


interface FormInputProps<T extends FieldValues> extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,HTMLInputElement> {
  icon: IconType;
  isPassword?: boolean;
  disabled?: boolean;
  type?:HTMLInputTypeAttribute;
  label?:string;
  placeholder?:string;
  className?:string;
  endIcon?:IconType;
  isSearch?:boolean;
  onClose?:()=>void;
  changeValue?:(value:string)=>void;
  children?:ReactNode;
  reset?:boolean;
  register:UseFormRegister<T>;
  errors?:FieldError;
  name:Path<T>
}

function FormInput<T extends FieldValues>({ icon: Icon, disabled, isPassword,type="text",label,placeholder,className,endIcon:EndIcon,isSearch,onClose,changeValue,reset,children,register,errors,name,required,...props }:FormInputProps<T>) {
  const [parentHover, setParentHover] = useState<boolean>(false);
  const [parentFocus, setParentFocus] = useState<boolean>(false);
  const [showPassword,setShowPassword] = useState<boolean>(false);

  const [value, setValue] = useState<PathValue<T,Path<T>>>();

  useEffect(()=>{
    if(reset){
      setParentFocus(false);
      setValue(undefined);
    }

  },[reset])

 
  const handleClick = useCallback(() => {
      setShowPassword(pre=>!pre)

  }, []);

  return (
    <div
      className={cn(`w-full h-12 rounded-full border border-green-500 flex pl-5 items-center relative group py-1 transition-all duration-300 ease-in-out ${
        parentFocus ? "ring-1 ring-offset-2 ring-[#679F0A]" : null
      } ${children ? "pr-0":"pr-5"}`,{" ring-red-500 border-red-500":errors},className)}
      onMouseEnter={() => setParentHover(true)}
      onMouseLeave={() => setParentHover(false)}
      onFocus={() => setParentFocus(true)}
      onBlur={() => setParentFocus(false)}
    >
      <label
        htmlFor=""
        className={`absolute transition-all duration-200 ease-in-out bg-white text-sm md:text-base ${
          parentHover || parentFocus 
          || value
            ? " text-sm -translate-x-1 -translate-y-7 scale-90 px-1"
            : "px-0 translate-x-7 scale-100 -translate-y-0"
        } ${errors ? "text-red-500":"text-black"}`}
      >
        {label}{required && (parentHover || parentFocus 
          || value
          ) && <span className="text-red-500">*</span>}
      </label>

      <Icon className={`w-5 h-5 mr-2   transition-all duration-300 ease-in-out ${parentFocus || parentHover ? "opacity-90":"opacity-60"}`} />

      <input 
        type={isPassword ? showPassword ? "text":type:type}
        className={cn(`text-sm tracking-wide flex-auto hover:outline-none focus-within:outline-none bg-red w-10  ${children ? "py-1 md:w-5/12 pr-5" : "py-0 md:w-full pr-0"}`)}
        placeholder={parentHover || parentFocus || isSearch ? placeholder : ""}
        {...props}

        {...register(name,{value:value,onChange:(e) => {
          setValue(e.target.value)
          changeValue && changeValue(e.target.value);
        },
        disabled:disabled,
      })}
      />

      {isPassword && (
        <button onClick={()=>handleClick()} disabled={disabled} type="button">
          {showPassword ? <TbEyeOff className="w-5 h-5 opacity-60 hover:opacity-90  transition-all duration-300 ease-in-out" />:<TbEye className="w-5 h-5 opacity-60 hover:opacity-90  transition-all duration-300 ease-in-out" />}
        </button>
      )}
      {
        EndIcon && <EndIcon className="w-5 h-5 opacity-60 hover:opacity-90 cursor-pointer transition-all duration-300 ease-in-out" onClick={()=>{
          changeValue && changeValue("")
          onClose && onClose()
        }}/>
      }
      {errors?.message && (<>
      <p className="absolute -bottom-3 right-0 h-5 text-xs text-red-500 font-semibold max-w-[86%] truncate bg-white">{errors.message}</p>
      </>)}
      {children}
    </div>
  );
}
export default FormInput;
