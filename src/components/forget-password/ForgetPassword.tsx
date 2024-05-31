import ComponentWrapper from '../component-wrapper';
import FormInput from '../ui/form-input';
import { MdEmail, MdHome } from 'react-icons/md';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Button from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { ForgetPasswordMailType, forgetPasswordMailSchema } from '../../lib/schema';
import axios, { AxiosError } from "axios"
import { toast } from 'react-toastify';
import { useState } from 'react';


const ForgetPassword = () => {

    const navigate = useNavigate();

    const [isLoading,setIsLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        
      } = useForm<ForgetPasswordMailType>({
        resolver: zodResolver(forgetPasswordMailSchema),
        defaultValues: {
          email: "",
        },
      });
      const onSubmit = async (data: ForgetPasswordMailType) => {

        const url = import.meta.env.VITE_SERVER_URL;
        try{

            setIsLoading(true)

        const response = await axios.post(`${url}/api/reset`,{email:data.email},{withCredentials:true});

        // console.log(response.data);
        toast.success('Please check your Email');
        reset();
        setIsLoading(false);
        navigate(`/forgetPassword/${response.data.token}`);

        }catch(error){
            if(error instanceof AxiosError){
                const status = error.response?.status;

                if(status === 404){
                    toast.error("This email doesn't exist");
                }else{
                    toast.error("Try again after some time!");
                }

                console.log(error);
            }else{
                console.log(error);
            }
            setIsLoading(false);

        }
      };
  return (
    <div className='w-full h-screen max-h-screen'>
        <ComponentWrapper>
            <div className="w-full h-screen border border-red-500 flex justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-y-5 w-96 px-5 py-8 rounded shadow shadow-gray-400">

                    <h1 className='text-3xl font-semibold'>Forget Password</h1>

                    <div className="my-2 h-[1px] bg-gray-400 w-full" />

                    <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-8'>
                        <FormInput icon={MdEmail} name='email' register={register} errors={errors.email} placeholder='email' label='Email' disabled={isLoading}/>

                        <div className="w-full flex justify-between items-center">
                        <Button label='home' onClick={()=> navigate("/")} className='w-36' icon={MdHome} type='button' disabled={isLoading}/>

                        <Button label='Continue' onClick={()=> {}} className='w-36' type='submit' disabled={isLoading}/>
                    </div>
                    </form>

                </div>
            </div>
        </ComponentWrapper>
    </div>
  );
};

export default ForgetPassword;