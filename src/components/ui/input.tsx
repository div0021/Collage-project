import { useRef, useState, useCallback,HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
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
}

const Input: React.FC<InputProps> = ({ icon: Icon, disabled, isPassword,type="text",label,placeholder,className,endIcon:EndIcon,isSearch,onClose,changeValue,...props }) => {
  const [parentHover, setParentHover] = useState<boolean>(true);
  const [parentFocus, setParentFocus] = useState<boolean>(true);
  const ref = useRef<HTMLInputElement>(null);
  const [showPassword,setShowPassword] = useState<boolean>(false);

  const [value, setValue] = useState<string>("");

 
  const handleClick = useCallback(() => {
       if(ref && ref.current){
        ref.current.type==="password" ? ref.current.type="text":ref.current.type="password"
        setShowPassword(pre=>!pre)
       }

  }, []);
  return (
    <div
      className={cn(`w-full h-10 rounded-full border border-green-500 flex px-5 items-center relative group py-1 ${
        parentFocus ? "ring-1 ring-offset-2 ring-[#679F0A]" : null
      }`,className)}
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
        {label}
      </label>

      <Icon className={`w-5 h-5 mr-2   transition-all duration-300 ease-in-out ${parentFocus || parentHover ? "opacity-90":"opacity-60"}`} />

      <input {...props}
        ref={ref}
        type={type}
        className="text-sm tracking-wide flex-auto hover:outline-none focus-within:outline-none bg-red w-10 md:w-full"
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
    </div>
  );
};
export default Input;
