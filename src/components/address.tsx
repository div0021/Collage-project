import { useNavigate } from "react-router-dom";
import ComponentWrapper from "./component-wrapper";
import Button from "./ui/button";
import Input from "./ui/input";
import Select from "./ui/select";
import {State,City} from "country-state-city"
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { TbMapPinCode } from "react-icons/tb";
import axios from "axios";
import { toast } from "react-toastify";

const Address = () => {

  const navigate = useNavigate();

  const [stateData,setStateData] = useState<{label:string,id:string}[]>([])

  useEffect(()=>{

    const states:{label:string,id:string}[] = []

    State.getAllStates().filter(el=>el.countryCode==="IN").forEach(state=>{

      states.push({label:state.name,id:state.isoCode})
  
    })

    setStateData(states);
  

  },[]);


  const [currentState,setCurrentState]=useState<{label:string,id:string}|undefined>();

  const [citiesData,setCitiesData] = useState<{label:string,id:string}[] | undefined>()


  const [currentCity,setCurrentCity] = useState<string>('')


  const [pinCode,setPinCode] = useState<string>()

  const [address,setAddress] = useState<string>('')

  const handleCityChange = useCallback((city:string)=>{
    setCurrentCity(city)

  },[])

  const handlePinCodeChange = useCallback((value:string)=>{

    setPinCode(value)



  },[])

  const handleStateSelect = useCallback((value:string,id:string)=>{

    setCurrentState({label:value,id});

    const cities:{label:string,id:string}[] = []

    City.getCitiesOfState("IN",id).forEach(city=>{
       cities.push({label:city.name,id:city.name.toLowerCase()})
    })

    setCitiesData(cities);

  },[])

  const handleAddressChange = (e:ChangeEvent<HTMLTextAreaElement>)=>{
    setAddress(e.currentTarget.value);
  }

  const handleSubmit = async () => {

    if(!currentState || !currentCity || !pinCode || !address){
      toast.error("All field are required");
      return;
    }
    if(pinCode.length!==6){
      toast.error("Please enter a valid pincode")
      return ;
    }
    if(address.length<10){
      toast.error("Address is too short")
      return ;
    }

    const url = import.meta.env.VITE_SERVER_URL;

    try{

      await axios.put(`${url}/api/profile`,{state:currentState.label,city:currentCity,pincode:pinCode,address},{withCredentials:true});

      setAddress('')
      setCurrentCity('')
      setCurrentState(undefined)
      setPinCode('');

      toast.success('Address succesfully updated')

      window.location.href="/cart";

    }catch(error){
      console.log("Error",error);
    }

  }



  return (
    <div className='w-full pt-20'>
       <ComponentWrapper>
        <div className="w-full py-10  flex justify-center items-center">
            <div className="max-w-screen-lg py-14 border border-green-200 rounded-xl min-h-96 w-full px-10 space-y-4 h-auto overflow-y-auto">
                <h1 className="text-3xl font-semibold">Address</h1>
                <p>Please provide the following information.</p>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">

                  <div className="w-full">
                    <p className="py-1">State</p>
                  <Select data={stateData} name="Choose State" handleSelect={handleStateSelect}/>
                  </div>

                  {/* City */}

                  <div className="w-full">
                    <p className="py-1">City</p>
                  <Select data={citiesData ? citiesData : []} name="Choose City" handleSelectValue={handleCityChange}/>
                  </div>

                  {/* pincode */}

                  <div className="w-full">
                    <p className="py-1">
                      Pincode
                    </p>
                  <Input icon={TbMapPinCode} type="number" placeholder="eg:751011" changeValue={handlePinCodeChange} />
                  </div>

                  {/* Address */}

                 <div className="w-full">
                  <p className="py-1">Address</p>
                  <textarea rows={5} className="w-full outline-none focus-within:outline-none focus-within:ring-1 focus-within:ring-offset-2 focus-within:ring-green-400 border rounded-xl border-green-500 transition-all duration-300 ease-in-out py-2 px-3 text-sm" placeholder="Write your address..." value={address} onChange={handleAddressChange}/>
                 </div>

                 

                </div>

                <div className="w-full py-5 flex justify-between items-center">
                <Button label="Cancel" className="max-w-60 hover:text-white bg-gray-500" onClick={()=>{navigate("/")}}/>
               
               
                <Button label="Save" className="max-w-60 hover:text-white" onClick={handleSubmit}/>
                </div>

               

               
            </div>

        </div>
       </ComponentWrapper>
    </div>
  );
};

export default Address;