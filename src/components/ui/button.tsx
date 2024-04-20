import { IconType } from "react-icons";
import { cn } from "../../lib/cn";
import { ButtonHTMLAttributes } from "react";
import CircularLoader from "../loaders/circular-loader";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  className?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  icon: Icon,
  outline,
  small,
  loading,
  className,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        `relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 border border-transparent hover:border-[#679F0A] transition-all duration-300 ease-in-out hover:ring-2 hover:ring-offset-2 hover:ring:ring-[#679F0A] w-full flex justify-center items-center 
        ${outline ? "bg-transparent" : "bg-[#679F0A]"}
        ${outline ? "border-black text-black" : "border-[#679F0A] text-black"}
        ${
          small
            ? "py-1 text-sm font-light border-[1px]"
            : "py-3 text-md font-semibold border-2"
        }
        `,
        className
      )}
      {...props}
    >
      {loading ? (
        <CircularLoader />
      ) : (
        <>
          {Icon && <Icon className="w-5 h-5 absolute left-4 top-3.5" />}
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
export default Button;
