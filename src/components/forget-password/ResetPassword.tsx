import ComponentWrapper from '../component-wrapper';
import FormInput from '../ui/form-input';
import { MdLock } from 'react-icons/md';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ResetPasswordType, resetPasswordSchema } from '../../lib/schema';
import Button from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const ResetPassword = () => {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<ResetPasswordType>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
         password:'',
         confirmPassword:""
        },
      });
      const [isReset,setIsReset]= useState<boolean>(false);
      const onSubmit = async (data: ResetPasswordType) => {
        console.log("Data submitted: ", data);
        alert(`password Sent to ${data.password}`);

        try{

            await axios.patch("http://localhost:1337/api/reset",{password:data.password,passwordConfirmation:data.confirmPassword},{withCredentials:true})

          // console.log(response.data);

          toast.success("Password is reset is successfully");


          reset();
          setIsReset(true);
          navigate("/",{replace:true});

        }catch(error){

          console.log(error);

        }
      };
  return (
    <div className='w-full h-screen max-h-screen'>
          <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        <ComponentWrapper>
            <div className="w-full h-screen border border-red-500 flex justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-y-5 w-96 px-5 py-8 rounded shadow shadow-gray-400">

                    <h1 className='text-3xl font-semibold'>Reset Password</h1>

                    <div className="my-2 h-[1px] bg-gray-400 w-full" />

                    <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-8'>
                        <FormInput icon={MdLock} name='password' register={register} errors={errors.password} type='password' 
                        isPassword
                        placeholder='password' label='Password' reset={isReset}/>
                        <FormInput icon={MdLock} name='confirmPassword' register={register} isPassword errors={errors.confirmPassword} placeholder='confirmPassword' label='Confirm Password' type='password' reset={isReset}/>

                        <div className="w-full flex justify-between items-center">

                        <Button label='Continue' onClick={()=> {}} type='submit'/>
                    </div>
                    </form>

                </div>
            </div>
        </ComponentWrapper>
    </div>
  );
};

export default ResetPassword;