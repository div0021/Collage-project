import { useCallback, useState } from "react";
import { PiSignIn } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { cn } from "../lib/cn";
import { CiLogout } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { onLoginOpen } from "../app/features/loginSlice";
import { selectCurrentUser } from "../app/features/authSlice";
import { useLogOutMutation } from "../app/services/authApiSlice";
import { toast } from "react-toastify";
const UserSection = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    dispatch(onLoginOpen());
  }, [dispatch]);

  const currentUser = useAppSelector(selectCurrentUser);

  const [logOut, { isLoading }] = useLogOutMutation();

  const handleLogOut = async () => {

    try{
    await logOut("");
    toast.success("Logout successfully");
    }catch(error){
        toast.error("LogOut failed! Try again.")
        console.log("LogOutError::",error);
    }
  };

  // implement logout
  const isLogin = currentUser !== null;

  return (
    <div
      className="flex items-center p-2 rounded-3xl bg-[#D2E9BB] gap-2 cursor-pointer relative z-10"
      onMouseEnter={() => setIsOpen((pre) => !pre)}
      onMouseLeave={() => setIsOpen((pre) => !pre)}
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
            <div className="flex items-center hover:bg-gray-200/80 p-2 text-sm">
              <FaUserCircle className="w-5 h-5 mr-2" />
              Profile
            </div>
            <button
              className="flex items-center hover:bg-gray-200/80 p-2 text-sm"
              onClick={handleLogOut}
              disabled={isLoading}
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
