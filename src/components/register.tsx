import { IoLockClosedOutline, IoMailOutline } from "react-icons/io5";
import Button from "./ui/button";
import { FaGoogle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { CiLogin } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  onRegisterClose,
  selectRegisterOpen,
} from "../app/features/registerSlice";
import { onLoginOpen } from "../app/features/loginSlice";
import { useForm } from "react-hook-form";
import FormInput from "./ui/form-input";
import {
  CreateUserInput,
  createUserSchema,
  handleErrorResponse,
} from "../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignupMutation } from "../app/services/authApiSlice";
import { toast } from "react-toastify";


const Register = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      confirmPassword: "",
      email: "",
      password: "",
    },
  });

  const [signup, { isLoading }] = useSignupMutation();

  const onSubmit = async (values: CreateUserInput) => {
    // console.log(values);
    try {
       await signup({
        name:values.name as string,
        email:values.email as string,
        password:values.password as string,
        passwordConfirmation: values.confirmPassword as string,
      }).unwrap();
      reset();
      toast.success("Registration Successful");
      
      setOpen(false);
      setTimeout(() => {
        dispatch(onRegisterClose());
        dispatch(onLoginOpen());
      }, 300);
      setTimeout(() => {
        toast("Please login to continue", { hideProgressBar: true });
      }, 1000);
    } catch (errors) {
      const { status } = handleErrorResponse.parse(errors);
      if (status === 409) toast.error("This email already exist!");
      else {
        toast.error("unknown registration error");
        console.log("Error:: ", errors);
      }
    }
  };

  const registerOpen = useAppSelector(selectRegisterOpen);

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
      <div className="relative w-full md:w-5/6 lg:w-4/6 max-w-screen-md mx-auto h-full sm:h-[32rem] rounded-xl lg:max-h-[50rem] ">
        <div
          className={`translate duration-300  h-full w-full ${
            open ? "translate-y-0" : "translate-y-full"
          } ${open ? "opacity-100" : "opacity-0"}`}
        >
          <div className="h-full w-full flex  flex-col-reverse sm:flex-row items-center justify-center rounded-xl overflow-hidden border border-green-500">
            <div className="h-full w-full sm:w-2/5  flex-auto flex flex-col items-center justify-center bg-[url(/banner2.jpg)] object-cover bg-no-repeat gap-3">
              <h1 className="text-2xl lg:text-4xl font-semibold">Sign In</h1>

              <p className="text-sm lg:text-base text-center font-medium lg:px-7">
                Already have an account?
              </p>

              <button
                className="px-10 bg-[#679F0A]/80 hover:bg-[#679F0A] rounded-full py-4 transition-all duration-200 ease-in-out tracking-wide hover:ring-1 hover:ring-offset-2 hover:ring-white text-sm font-medium w-60 sm:w-auto"
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => {
                    dispatch(onRegisterClose());
                    dispatch(onLoginOpen());
                  }, 300);
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
                className="rounded-full w-60 sm:w-36 lg:w-48"
                icon={FaGoogle}
              />
            </div>
            <div className="h-full py-6 sm:py-0 w-full sm:w-3/5 bg-white flex-auto flex flex-col justify-center items-center">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col justify-center items-center gap-8"
              >
                <h1 className="text-xl lg:text-3xl mb-3">
                  Create a new account
                </h1>

                <FormInput
                  label="Name"
                  type="text"
                  icon={IoMailOutline}
                  name="name"
                  register={register}
                  className="w-60 md:w-full"
                  errors={errors.name}
                  disabled={isLoading}
                />

                <FormInput
                  label="Email"
                  type="email"
                  icon={IoMailOutline}
                  name="email"
                  register={register}
                  className="w-60 md:w-full"
                  errors={errors.email}
                  disabled={isLoading}
                />

                <FormInput
                  label="Password"
                  type="password"
                  icon={IoLockClosedOutline}
                  isPassword={true}
                  name="password"
                  register={register}
                  className="w-60 md:w-full"
                  errors={errors.password}
                  disabled={isLoading}
                />

                <FormInput
                  label="Confirm Password"
                  type="password"
                  icon={IoLockClosedOutline}
                  isPassword={true}
                  name="confirmPassword"
                  register={register}
                  className="w-60 md:w-full"
                  errors={errors.confirmPassword}
                  disabled={isLoading}
                />

                <Button
                  label="SignUp"
                  onClick={() => {}}
                  loading={isLoading}
                  type="submit"
                  className="rounded-full hover:text-white transition-all ease-in-out duration-100"
                  disabled={isLoading}
                  icon={CiLogin}
                />
              </form>
            </div>
          </div>
          <button
            className="absolute top-0.5 right-0.5 md:-right-2 md:-top-2 p-1 bg-red-600 flex iemc justify-center text-white rounded-full"
            onClick={() => {
              setOpen(false);
              setTimeout(() => {
                dispatch(onRegisterClose());
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
