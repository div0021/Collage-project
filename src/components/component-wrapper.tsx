import { PropsWithChildren } from "react";

const ComponentWrapper = ({children}:PropsWithChildren) => {
    return (
        <div className="w-screen h-screen flex flex-col items-center overflow-x-hidden relative z-0">
            <div className="w-full h-auto min-w-[310px] max-w-[1440px]">
              {children}
            </div>

        </div>
    )
}
export default ComponentWrapper;