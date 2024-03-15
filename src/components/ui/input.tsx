import { useRef, useState, useCallback,HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode, useEffect } from "react";
import { TbEye, TbEyeOff } from "react-icons/tb";
import { IconType } from "react-icons";
import { cn } from "../../lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>  {
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
  reset?:boolean
}

const Input: React.FC<InputProps> = ({ icon: Icon, disabled, isPassword,type="text",label,placeholder,className,endIcon:EndIcon,isSearch,onClose,changeValue,reset,children,required,...props }) => {
  const [parentHover, setParentHover] = useState<boolean>(false);
  const [parentFocus, setParentFocus] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);
  const [showPassword,setShowPassword] = useState<boolean>(false);

  const [value, setValue] = useState<string>("");

  useEffect(()=>{
    if(reset){
      setParentFocus(false);
      setValue("");
    }

  },[reset])

 
  const handleClick = useCallback(() => {
       if(ref && ref.current){
        ref.current.type==="password" ? ref.current.type="text":ref.current.type="password"
        setShowPassword(pre=>!pre)
       }

  }, []);
  return (
    <div
      className={cn(`w-full h-10 rounded-full border border-green-500 flex pl-5 items-center relative group py-1 ${
        parentFocus ? "ring-1 ring-offset-2 ring-[#679F0A]" : null
      } ${children ? "pr-0":"pr-5"}`,className)}
      onMouseEnter={() => setParentHover(true)}
      onMouseLeave={() => setParentHover(false)}
      onFocus={() => setParentFocus(true)}
      onBlur={() => setParentFocus(false)}
    >
      <label
        htmlFor=""
        className={`absolute transition-all duration-200 ease-in-out bg-white ${
          parentHover || parentFocus || value
            ? " text-sm -translate-x-1 -translate-y-7 px-1"
            : "px-0 translate-x-7 -translate-y-0.5"
        }`}
      >
        {label}{required && (parentHover || parentFocus || value) && <span className="text-red-500">*</span>}
      </label>

      <Icon className={`w-5 h-5 mr-2   transition-all duration-300 ease-in-out ${parentFocus || parentHover ? "opacity-90":"opacity-60"}`} />

      <input {...props}
        ref={ref}
        type={type}
        className={cn(`text-sm tracking-wide flex-auto hover:outline-none focus-within:outline-none bg-red w-10  ${children ? "py-1 md:w-5/12 pr-5" : "py-0 md:w-full pr-0"}`)}
        onChange={(e) => {
          setValue(e.target.value)
          changeValue && changeValue(e.target.value);
        }}
        value={value}
        disabled={disabled}
        placeholder={parentHover || parentFocus || isSearch ? placeholder : ""}
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
      {children}
    </div>
  );
};
export default Input;
