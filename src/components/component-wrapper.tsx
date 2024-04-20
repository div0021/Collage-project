import { ReactNode } from "react";
import { cn } from "../lib/cn";

interface ComponentWrapperProps{
    children:ReactNode;
    className?:string;
}

const ComponentWrapper = ({children,className}:ComponentWrapperProps) => {
    return (
        <div className={cn("w-full h-auto flex flex-col items-center sm:overflow-x-hidden relative z-0",className)}>
            <div className="w-full h-auto min-w-[310px] max-w-[1640px]">
              {children}
            </div>

        </div>
    )
}
export default ComponentWrapper;