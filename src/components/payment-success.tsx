import { useState } from "react";
import { MdArrowDropUp } from "react-icons/md";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "./ui/button";

const PaymentSuccess = () => {

    const navigate = useNavigate();

    const [URLSearchParams] = useSearchParams();

    const referenceNumber = URLSearchParams.get('reference');

    const [show,setShow] = useState<boolean>(false);

    if(!referenceNumber){
        window.location.href="/";
        return;
    }

  return (
    <div className='min-h-[30rem] w-full flex justify-center items-center'>
       <div className="max-w-screen-md border border-gray-400 shadow shadow-gray-300 rounded-lg px-10 py-5">
       <h1 className="text-green-500 font-semibold text-3xl tracking-wide text-center">Order Successfull</h1>

       <div className="flex justify-between items-center border border-gray-400 text-sm my-5 gap-x-10 px-2 py-1 rounded-lg">

        <div className="flex justify-center items-center gap-x-2">

        <p className="font-md">Reference No:</p>
        <p className="font-md bg-gray-400 rounded-sm">{referenceNumber}</p>

        </div>

        <button className="relative group disabled:cursor-not-allowed" disabled={show} onClick={()=>{
            navigator.clipboard.writeText(referenceNumber)
            toast.success("Reference number is copied!");

            setShow(true);
            setTimeout(()=>{
                setShow(false);
            },4000);

        }}>
            <div className="absolute top-7 -left-4 text-xs bg-black px-3 py-1 rounded-xl text-white opacity-0 pointer-events-none group-hover:opacity-100 group-disabled:opacity-0 transition-all duration-300 ease-in-out">
                <div className="relative w-full">
                    <span>Copy</span>
                    <MdArrowDropUp className="w-5 h-5 absolute -top-4 left-1.5 text-black" />
                </div>
            </div>
            {!show ? (<LuCopy className="w-5 h-5" />):(
                <LuCopyCheck className="w-5 h-5" />
            )}
        </button>

       </div>

       <div className="w-full flex justify-between items-center gap-x-10 pt-5">
             <Button className="max-w-52 rounded-full" label="Home" onClick={()=>{navigate("/")}}/>
             <Button className="max-w-52 rounded-full" label="Orders" onClick={()=>{navigate('/orders')}}/>
               </div>

       </div>

    </div>
  );
};

export default PaymentSuccess;