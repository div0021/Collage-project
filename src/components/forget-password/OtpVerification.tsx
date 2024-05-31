import ComponentWrapper from "../component-wrapper";
import Button from "../ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { cn } from "../../lib/cn";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";


const OtpVerification = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<boolean>(false)

  const handleSubmit = async () => {
    if(otp.length!== 6){
        setError(true);
        return;
    }else{
        setError(false);
    }
    const url = import.meta.env.VITE_SERVER_URL;
    try{

         await axios.post(`${url}/api/reset/${id}`,{otp:otp},{withCredentials:true});

        toast.success("OTP is verified, Reset your password");

        // console.log(response.data);
        navigate("/resetPassword",{replace:true})


    }catch(error){
       if(error instanceof AxiosError){
        toast.error("OTP is not valid")
       }else{
        toast.error("Something went wrong!");
       }
       console.log(error);

    }

  }

  return (
    <div className="w-full h-screen max-h-screen">
      <ComponentWrapper>
        <div className="w-full h-screen border border-red-500 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-y-5 w-96 px-5 py-8 rounded shadow shadow-gray-400">
            <h1 className="text-3xl font-semibold">Forget Password</h1>

            <div className="my-2 h-[1px] bg-gray-400 w-full" />

            <form className="w-full space-y-5">
              <label htmlFor="" className="pl-2">
                Enter you Otp
              </label>

              <div className="w-full relative">

              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span> </span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="mx-2 border border-gray-500 w-20 hover:border-green-500 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-offset-1 focus-within:ring-green-400 transition-all duration-300 ease-in-out focus-within:outline-none rounded h-10" type="text"
                  />
                )}
                inputStyle={{ width: "40px" }}
              />

              <p className={cn("text-red-500 absolute text-xs font-semibold -bottom-5 right-0 opacity-0 transition-all duration-300 ease-in-out",{"opacity-100":error})}>All field are required!</p>

              </div>

              <div className="pt-5 w-full flex justify-between items-center">
                <Button
                  label="back"
                  onClick={() => navigate("/")}
                  className="w-32"
                  icon={IoIosArrowBack}
                  type="button"
                />

                <Button
                  label="Continue"
                  onClick={(e)=>{e.preventDefault()
                    handleSubmit()
                }}
                  className="w-36"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      </ComponentWrapper>
    </div>
  );
};

export default OtpVerification;
