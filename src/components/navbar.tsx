import NavSection from "./nav-section";
import Logo from "./logo";
import Search from "./search";
import Cart from "./cart";
import UserSection from "./user-section";
import {useRef } from "react";

const Navbar = () => {

  const ref = useRef<HTMLElement|null>(null)

    return (
        <nav ref={ref} className="fixed left-0 right-0 top-0 sm:top-5 md:top-8 left z-20 mx-auto max-w-7xl w-full sm:w-5/6">
            <div className="flex flex-row items-center justify-between px-3 py-3 bg-white sm:rounded-xl shadow-sm shadow-[#679F0A] relative space-x-2">
                <Logo className="relative -top-2"/>

                <div className="flex items-center space-x-4 md:space-x-5 lg:space-x-10">
                <Search />
                <div className='hidden md:flex flex-row justify-center items-center space-x-3 '>
                <NavSection />
              </div>
              <div className="flex items-center gap-3  md:gap-5">
                <img src="/leaves.png" alt="leaves" className="w-5 h-5"/>
                <Cart number={5}/>
              </div>
              
              <UserSection />
                </div>
                
            </div>

        </nav>
    )
}
export default Navbar;