import { PropsWithChildren } from "react";

const ComponentWrapper = ({children}:PropsWithChildren) => {
    return (
        <div className="w-full h-auto flex flex-col items-center sm:overflow-x-hidden relative z-0">
            <div className="w-full h-auto min-w-[310px] max-w-[1640px]">
              {children}
            </div>

        </div>
    )
}
export default ComponentWrapper;