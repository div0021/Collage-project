import Input from "./ui/input";
import { IoLockClosedOutline, IoMailOutline } from "react-icons/io5";
import Button from "./ui/button";
import { FaGoogle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { ProviderContext, ProviderContextType } from "./provider/provider";
import { useContext, useEffect, useState } from "react";
import { CiLogin } from "react-icons/ci";
const Register = () => {
  const { registerOpen, setRegisterOpen, setLoginOpen } = useContext(
    ProviderContext
  ) as ProviderContextType;

  const [open, setOpen] = useState<boolean | undefined>(registerOpen);

  useEffect(() => {
    setOpen(registerOpen);
  }, [registerOpen]);

  if (!registerOpen) {
    return null;
  }
  return (
    <div
      className={`h-full fixed overflow-x-hidden bg-gray-800/90 inset-0 flex justify-center items-center z-50 focus:outline-none outline-none overflow-hidden`}
    >
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-3/6 mx-auto h-96 rounded-xl lg:max-h-96 ">
        <div
          className={`translate duration-300  h-full w-full ${
            open ? "translate-y-0" : "translate-y-full"
          } ${open ? "opacity-100" : "opacity-0"}`}
        >
          <div className="h-full w-full flex items-center justify-center rounded-xl overflow-hidden">
            <div className="h-full w-2/5  flex-auto flex flex-col items-center justify-center bg-[url(/banner2.jpg)] object-cover bg-no-repeat gap-3">
              <h1 className="text-2xl lg:text-4xl font-semibold">Sign In</h1>

              <p className="text-sm lg:text-base text-center font-medium lg:px-7">
                Already have an account?
              </p>

              <button
                className="px-10 bg-[#679F0A]/80 hover:bg-[#679F0A] rounded-full py-4 transition-all duration-200 ease-in-out tracking-wide hover:ring-1 hover:ring-offset-2 hover:ring-white text-sm font-medium"
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => {
                    setRegisterOpen(false);
                    setLoginOpen(true);
                  },300);
                }}
              >
                SignIn
              </button>

              <div className="h-0.5 w-52 bg-[#679F0A]/50 rounded-full" />

              <Button
                label="Google"
                onClick={() => {
                  //TOdo google login
                }}
                className="rounded-full w-36 lg:w-48"
                icon={FaGoogle}
              />
            </div>
            <div className="h-full w-3/5 bg-white flex-auto flex flex-col justify-center items-center">
              <form className="flex flex-col justify-center items-center gap-6">
                <h1 className="text-xl lg:text-3xl mb-3">
                  Create a new account
                </h1>

                <Input
                  label="Email"
                  type="email"
                  icon={IoMailOutline}
                  className=" w-40 md:w-full"
                />

                <Input
                  label="Password"
                  type="password"
                  icon={IoLockClosedOutline}
                  isPassword={true}
                  className="w-40 md:w-full"
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  icon={IoLockClosedOutline}
                  isPassword={true}
                  className="w-40 md:w-full"
                />

                <Button
                  label="SignUp"
                  onClick={() => {
                    //TODO login
                  }}
                  className="rounded-full hover:text-white transition-all ease-in-out duration-100"
                  icon={CiLogin}
                />
              </form>
            </div>
          </div>
          <button
            className="absolute -right-2 -top-2 p-1 bg-red-600 flex iemc justify-center text-white rounded-full"
            onClick={() => {
              setOpen(false);
              setTimeout(() => {
                setRegisterOpen(false);
              }, 300);
            }}
          >
            <RxCross2 className="w-4 h-4 font-bold" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Register;
