import { FaRegUserCircle } from "react-icons/fa";
import ComponentWrapper from "./component-wrapper";
import Input from "./ui/input";
import { AiOutlineMail } from "react-icons/ai";
import { MdLocalPhone } from "react-icons/md";
import Select from "./ui/select";


const data = [
  {
    label: "Ascending order",
    id: "asc",
  },
  {
    label: "Descending order",
    id: "desc",
  },
  {
    label: "Descending order",
    id: "desc",
  },
  {
    label: "Descending order",
    id: "desc",
  },
  {
    label: "Descending order",
    id: "desc",
  },
];


const ShippingDetails = () => {
  return (
    <div className='w-full pt-32'>
       <ComponentWrapper>
        <div className="w-full py-10 border border-green-500 flex justify-center items-center">
            <div className="max-w-screen-lg py-5 border border-green-500 w-full px-10 space-y-4">
                <h1 className="text-3xl font-semibold">Shipping Details</h1>
                <p>Please provide the following information to complete your order.</p>

                <form action="" className="space-y-8">
                    <div className="flex justify-between items-center gap-x-10 w-full">

                        <Input icon={FaRegUserCircle} label="First Name" type="text" required />
                        <Input icon={FaRegUserCircle} label="LastName" type="text" required />

                    </div>

                    <div className="w-full flex justify-between items-center gap-x-8">
                        <Input icon={AiOutlineMail} label="Email" type="email" className="" required />
                        <Input icon={MdLocalPhone} label="Phone" type="tel" className="" required />
                    </div>
                    <div className="w-full flex justify-between items-center gap-x-8">
                        <Input icon={AiOutlineMail} label="Email" type="email" className="" required />
                        <Input icon={MdLocalPhone} label="Phone" type="tel" className="" required />
                    </div>
                    <Select data={data} name="Select your country"/>
                    <div className="py-20">
                        hello
                    </div>
                </form>
            </div>

        </div>
       </ComponentWrapper>
    </div>
  );
};

export default ShippingDetails;