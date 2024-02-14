import { Button } from "@material-tailwind/react";
import { useState } from "react";
import Input from "./ui/input";
import { MdEmail } from "react-icons/md";

const NewsLetter = () => {
  const [email, setEmail] = useState<string>("");
  const [reset,setReset] = useState<boolean>(false);

  return (
    <div className="bg-white px-3 sm:px-10 py-2 sm:py-10 flex flex-col gap-y-10 sm:flex-row items-center justify-around">
      <h2>SIGN UP TO NEWSLETTER</h2>

      <div className="w-[70%] sm:w-fit">

        <form onSubmit={(e) => {e.preventDefault();
        setReset(true)
        setEmail("")
        }}>
        <Input icon={MdEmail} label="Email" type="email" changeValue={(value)=> {setEmail(value)
        setReset(false)}} reset={reset} placeholder="Eg: john@doe.com">
            <Button disabled={!email} type="submit" className="relative right-0 top-0 h-6 rounded-r-full bg-[#679F0A] lg:w-4/12">Suscribe</Button>
        </Input>

        </form>
        
      </div>
    </div>
  );
};
export default NewsLetter;
