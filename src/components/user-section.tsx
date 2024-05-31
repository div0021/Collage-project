import { useCallback, useEffect, useState } from "react";
import { PiSignIn } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { cn } from "../lib/cn";
import { CiLogout } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { onLoginOpen } from "../app/features/loginSlice";
import { selectCurrentUser } from "../app/features/authSlice";
import { useCurrentUserMutation, useLogOutMutation } from "../app/services/authApiSlice";
import { toast } from "react-toastify";
import { resetFavourite } from "../app/features/favouriteSlice";
import { resetCart } from "../app/features/cartSlice";
import { onProfileOpen } from "../app/features/profileSlice";
import { MdOutlineInventory } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const UserSection = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const [currentUser,{isLoading:userLoading}] = useCurrentUserMutation()

  const navigate = useNavigate();

  useEffect(()=>{
    const getUser = async () => {
       await currentUser('')
    }
    getUser();

  },[]);

  const handleClick = useCallback(() => {
    setIsOpen(false);
    dispatch(onLoginOpen());
  }, [dispatch]);

  const user = useAppSelector(selectCurrentUser);

  const [logOut, { isLoading:logOutLoading }] = useLogOutMutation();

  const handleLogOut = async () => {

    try{
    await logOut("");
    toast.success("Logout successfully");
    dispatch(resetFavourite());
    dispatch(resetCart())
    setTimeout(()=>{
      window.location.reload();
    },500)
    }catch(error){
        toast.error("LogOut failed! Try again.")
        console.log("LogOutError::",error);
    }
  };

  // implement logout
  const isLogin = user !== null;

  return (
    <div
      className="flex items-center p-2 rounded-3xl bg-[#D2E9BB] gap-2 cursor-pointer relative z-10"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="">
        <img src="/menu.png" alt="user menu" className="w-6 h-6" />
      </div>
      <div className="">
        <img src="/avatar.png" alt="user avatar" className="w-6 h-6" />
      </div>
      <div
        className={cn(
          "absolute z-40 top-10 -left-4 sm:left-0 h-auto w-32 sm:w-36 bg-gray-50 rounded-xl overflow-hidden hidden",
          {
            "flex flex-col": isOpen,
          }
        )}
      >
        {isLogin ? (
          <>
            <div className="flex items-center hover:bg-gray-200/80 p-2 text-sm" onClick={()=>{
              setIsOpen(false);
              dispatch(onProfileOpen())
            }}>
              <FaUserCircle className="w-5 h-5 mr-2" />
              Profile
            </div>
            <div className="flex items-center hover:bg-gray-200/80 p-2 text-sm" onClick={()=>{
              setIsOpen(false);
              navigate("/orders");
            }}>
              <MdOutlineInventory className="w-5 h-5 mr-2" />
              My orders
            </div>
            <button
              className="flex items-center hover:bg-gray-200/80 p-2 text-sm"
              onClick={handleLogOut}
              disabled={logOutLoading || userLoading}
            >
              <PiSignIn className="w-5 h-5 mr-2" />
              LogOut
            </button>
          </>
        ) : (
          <div
            className="flex items-center hover:bg-gray-200/80 p-2 text-sm"
            onClick={() => handleClick()}
          >
            <CiLogout className="w-5 h-5 mr-2" />
            Login
          </div>
        )}
      </div>
    </div>
  );
};
export default UserSection;
