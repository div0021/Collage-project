import NavSection from "./nav-section";
import Logo from "./logo";
import Cart from "./cart";
import UserSection from "./user-section";
import Favourite from "./favourite";
import { useAppSelector } from "../app/hooks";
import { selectCurrentUser } from "../app/features/authSlice";

const Navbar = () => {

  const currentUser = useAppSelector(selectCurrentUser);


    return (
        <nav className="fixed left-0 right-0 top-0 sm:top-5 md:top-8 left z-20 mx-auto max-w-7xl w-full sm:w-5/6">
            <div className="flex flex-row items-center justify-between px-3 py-3 bg-white sm:rounded-xl shadow-sm shadow-[#679F0A] relative space-x-2">
                <Logo className="relative -top-2"/>

                <div className="flex items-center space-x-4 md:space-x-5 lg:space-x-10">
                <div className='hidden md:flex flex-row justify-center items-center space-x-3 '>
                <NavSection />
              </div>
              <div className="flex items-center gap-3  md:gap-5">
                <div className="relative group cursor-pointer">

                  <Favourite />
                </div>
                <Cart />
              </div>
              
              <UserSection />
                </div>

                {currentUser && !currentUser.isEmailVerified && (<div className="absolute w-80 -bottom-5 bg-red-500 right-3 rounded-b text-white font-medium px-3 text-sm">
                  Please verify you mail.
                </div>)}
                
            </div>

        </nav>
    )
}
export default Navbar;