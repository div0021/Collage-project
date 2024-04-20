import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { FaCheckDouble, FaUser } from "react-icons/fa";
import Select from "./ui/select";
import {v4 as uuid} from "uuid"
import { Radio } from "@material-tailwind/react";
import Button from "./ui/button";
import { cn } from "../lib/cn";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {  setSurveyClose } from "../app/features/surveySlice";
import { IoIosContact } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { selectCurrentUser } from "../app/features/authSlice";
import CheckboxOption from "./CheckboxOption";
import { useForm } from "react-hook-form";
import { PersonalSurveyType, personalSurveySchema } from "../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./ui/form-input";
import { toast } from "react-toastify";
import axios from "axios";
import { useCurrentUserMutation } from "../app/services/authApiSlice";
import { removeObjectFromLocalStorage } from "../lib/user-store";


const genderData = [
  {
    id:uuid(),
    label: 'Male',
  },
  {
    id:uuid(),
    label: 'Female',
  },
  {
    id:uuid(),
    label: 'Other',
  },
]

const DiseaseCondition=[
  {
    label:"Hair fall",
  },
  {
    label:"Skin problem",
  },
  {
    label:"Dry skin",
  },
  {
    label:"Poor digestive health",
  },
  {
    label:"Oral problem",
  },
  {
    label:"Low immunity",
  },
]

const PersonalSurveyForm = () => {


  const user = useAppSelector(selectCurrentUser);
  const survey = user !==null ? user.userSurvey ? false : true : false;

  const [surveyOpen,setSurveyOpen] = useState<boolean>(survey)

  const [open, setOpen] = useState<boolean | undefined>(false);
  const dispatch = useAppDispatch()

  const [surveyComplete,setSurveyComplete] = useState<boolean>(false);

  const [scrollWidth, setScrollWidth] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      // Get the reference element (the one being scrolled)
      const referenceElement = document.getElementById('referenceElement');
      
      if (referenceElement) {
        const scrollPosition = referenceElement.scrollTop;
        const totalHeight = referenceElement.scrollHeight - referenceElement.clientHeight;
        const newWidth = (scrollPosition / totalHeight) * 100;
        setScrollWidth(newWidth);
      }
    };

    // Add scroll event listener to the reference element
    const referenceElement = document.getElementById('referenceElement');
    if (referenceElement) {
      referenceElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      // Remove scroll event listener when component unmounts
      if (referenceElement) {
        referenceElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);


  useEffect(() => {
    setOpen(surveyOpen);
  }, [surveyOpen]);

  // Survey States

  const [problem,setProblems] = useState<string[]>([]);

  const [medication,setMedication] = useState<boolean|undefined>(undefined);
  const [wood,setWood] = useState<boolean|undefined>(undefined);

  const [sleep,setSleep] = useState<boolean|undefined>(undefined);
  const [gender,setGender] = useState<string>('');
  const [kids,setKids] = useState<boolean|undefined>(undefined);
  const [supplements,setSupplements] = useState<boolean|undefined>(undefined);
  const [pet,setPet] = useState<boolean|undefined>(undefined);

  const handleGenderValue = useCallback( (str:string)=>{

    setGender(str)

  },[])

  const handleProblemValues = useCallback((label:string,action:boolean)=>{

    if(label.length===0) return;
    
    if(action){
      setProblems(pre=>[...pre, label])
    }else if(!action){
      setProblems(pre=>pre.filter(problem=>problem!==label));
    }


  },[]);

  const handleRadioMedicationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    if(value==='yes'){
    setMedication(true);
    }else if(value==="no"){
      setMedication(false);
    }
  }
  const handleRadioKidsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    if(value==='yes'){
    setKids(true);
    }else if(value==="no"){
      setKids(false);
    }
  }
  const handleRadioPetsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    if(value==='yes'){
    setPet(true);
    }else if(value==="no"){
      setPet(false);
    }
  }
  const handleRadioWoodChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    if(value==='yes'){
    setWood(true);
    }else if(value==="no"){
      setWood(false);
    }
  }
  const handleRadioSupplementChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    if(value==='yes'){
    setSupplements(true);
    }else if(value==="no"){
      setSupplements(false);
    }
  }
  const handleRadioSleepChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    if(value==='yes'){
    setSleep(true);
    }else if(value==="no"){
      setSleep(false);
    }
  }

  const [currentUser] = useCurrentUserMutation()

  const [loading,setLoading] = useState<boolean>(false);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PersonalSurveyType>({
    resolver: zodResolver(personalSurveySchema),
    defaultValues: {
      firstName:"",
      lastName:"",
    },
  });

  const onsubmit = async (values: PersonalSurveyType) => {

    if(typeof pet !== "boolean" || typeof medication !== "boolean" ||typeof sleep !== "boolean" ||typeof wood !== "boolean" ||typeof kids !== "boolean" ||typeof supplements !== "boolean" || problem.length===0 || gender.length===0){
      toast.error("Please select fields!");
      return;
    }

    removeObjectFromLocalStorage('user');

    const url = import.meta.env.VITE_SERVER_URL;

    setLoading(true);

    try{
       await axios.post(`${url}/api/survey`,{...values,kids,pet,medication,problem,wood,supplements,gender:gender.toLowerCase(),sleep},{withCredentials:true});

       await currentUser('').unwrap()


      reset()

      setMedication(undefined)
      setSleep(undefined)
      setKids(undefined)
      setPet(undefined)
      setGender('')
      setWood(undefined)
      setSupplements(undefined)
      setProblems([])

      setOpen(false)
                    setTimeout(()=>{
                      setSurveyComplete(true)
                    },300)

                    setTimeout(()=>{
                      setSurveyComplete(false)
                    },1700)
                    setTimeout(()=>{
                      dispatch(setSurveyClose())
                      setSurveyOpen(false);
                    },2000)

      toast.success("Successfully submit survey form")

      setTimeout(()=>{
        window.location.href="/"

      },2400)

    }catch(error){
      console.log("Survey Error:",error);
    }
    finally{
      setLoading(false);
    }

  }

  if (!surveyOpen) {
    return null;
  }
  return (
    <div
      className={`h-full fixed overflow-x-hidden bg-gray-800/90 inset-0 flex justify-center items-center z-50 focus:outline-none outline-none overflow-hidden`}
    >
      <div className="relative w-full md:w-5/6 lg:w-4/6 max-w-screen-lg mx-auto h-[35rem] sm:h-5/6 rounded-xl ">
        <div
          className={`translate duration-300 h-full w-full ${
            open ? "translate-y-0" : "translate-y-full"
          } ${open ? "opacity-100" : "opacity-0"}`}
        >
          <div className="h-full w-full flex flex-col-reverse sm:flex-row items-center justify-center rounded-xl overflow-hidden relative">

            {/* Scroller */}

            <div className={cn(`absolute top-0 left-0 h-1 bg-green-500 z-20`)} style={{width: `${scrollWidth}%`}}></div>

            <div className="w-full h-full p-5 flex flex-col gap-y-5 pt-10 bg-white overflow-y-auto overflow-x-hidden" id="referenceElement">

              <h2 className=" text-center text-2xl font-semibold">Personal Survey</h2>

              <div className="w-full bg-gray-500/50 rounded-xl py-[0.25px] my-5" />

              <form 
              onSubmit={handleSubmit(onsubmit)}
               className="space-y-10">

                {/*  Name */}
                <div className="w-full flex flex-col sm:flex-row  justify-between items-center gap-x-10 gap-y-10">

                  <FormInput icon={FaUser} label="First Name" name="firstName" register={register} errors={errors.firstName} disabled={loading}/>

                  <FormInput register={register} name="lastName" icon={FaUser} label="Last Name" errors={errors.lastName} disabled={loading}/>
                </div>

                {/* Age, Gender */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 justify-between items-center gap-x-10 gap-y-10">

                  <FormInput icon={CiUser} label="Age" name="age" register={register} type="number" placeholder="e.g., 24" className="" disabled={loading} errors={errors.age}/>

                  <Select data={genderData} name="Select your gender" handleSelectValue={handleGenderValue} />

                </div>
                
                <div className="w-full flex flex-col sm:flex-row gap-y-10 justify-between items-center gap-x-10">

                  <FormInput icon={IoIosContact} label="Contact Number" placeholder="9988776655" type="tel" register={register} name="contact" errors={errors.contact} disabled={loading} className="max-w-[22rem]"/>

                </div>

                {/* conditions */}

                <div className="w-full">
                  <p className="text-sm">Check the problem that you're currently experiencing:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2">
                    {DiseaseCondition.map(el=>(
                    <CheckboxOption label={el.label} key={el.label + "disease"} handlemultipleCheck={handleProblemValues}/>
                    ))}

                  </div>
                </div>

                {/* medication */}

                <div className="w-full">
                  <p className="text-sm">
                  Are you currently taking any medication?
                  </p>
                  <div className="flex justify-start items-center gap-x-10 text-sm">
                    <Radio disabled={loading} crossOrigin={""} name="medication" value="yes"  label="Yes" onChange={handleRadioMedicationChange} />
                    <Radio disabled={loading} crossOrigin={""} name="medication" value="no" label="No" onChange={handleRadioMedicationChange} />

                  </div>
                </div>

                {/* Sleep */}
                <div className="w-full">
                  <p className="text-sm">
                  How often do you sleep less than 6 hours?
                  </p>
                  <div className="flex justify-start items-center gap-x-10 text-sm flex-wrap">
                    <Radio disabled={loading} crossOrigin={""} name="sleep" value="yes" label="Daily" onChange={handleRadioSleepChange} />
                    <Radio disabled={loading} crossOrigin={""} name="sleep" value="yes" label="Weekly" onChange={handleRadioSleepChange} />
                    <Radio disabled={loading} crossOrigin={""} name="sleep" label="Monthly" value="yes" onChange={handleRadioSleepChange} />
                    <Radio disabled={loading} crossOrigin={""} name="sleep" label="Never" value="no" onChange={handleRadioSleepChange} />

                  </div>
                </div>

                {/* Wood */}

                <div className="w-full">
                  <p className="text-sm">Are you currently using or planning to use wooden stuffs ?</p>
                  <div className="flex justify-start items-center gap-x-10 text-sm">
                    <Radio disabled={loading} crossOrigin={""} name="wood" value="yes" label="Yes" onChange={handleRadioWoodChange} />
                    <Radio disabled={loading} crossOrigin={""} name="wood" value="no" label="No" onChange={handleRadioWoodChange} />
                  </div>
                </div>

                {/* kids */}

                <div className="w-full">
                  <p className="text-sm">
                  Are there kids in your life?
                  </p>
                  <div className="flex justify-start items-center gap-x-10 text-sm flex-wrap">
                    <Radio disabled={loading} crossOrigin={""} name="kids" value="yes" label="Yes" onChange={handleRadioKidsChange} />
                    <Radio disabled={loading} crossOrigin={""} name="kids" value="no" label="No" onChange={handleRadioKidsChange} />

                  </div>
                </div>


                {/* supplements */}

                <div className="w-full">
                  <label className="text-sm" htmlFor="supplement">Do you use any kind of natural supplements?</label>
                  <div className="flex justify-start items-center gap-x-10 text-sm">
                    <Radio disabled={loading} crossOrigin={""} name="supplement" value="yes" label="Yes" onChange={handleRadioSupplementChange} />
                    <Radio disabled={loading} crossOrigin={""} name="supplement" value="no" label="No" onChange={handleRadioSupplementChange} />
                  </div>
                </div>

                {/* pets */}

                <div className="w-full">
                  <label className="text-sm" htmlFor="drugs">Do you have pets?</label>
                  <div className="flex justify-start items-center gap-x-10 text-sm">
                    <Radio disabled={loading} crossOrigin={""} name="pets" value="yes" label="Yes" onChange={handleRadioPetsChange} />
                    <Radio disabled={loading} crossOrigin={""} name="pets" value="no" label="No" onChange={handleRadioPetsChange} />
                  </div>
                </div>

                <div className="w-full bg-gray-500/50 rounded-xl py-[0.25px] my-5" />

                <div className="my-10 w-full flex items-center justify-center">

                  <Button label="Submit" type="submit" onClick={()=>{}}className="w-52 rounded-full hover:text-white" loading={loading} disabled={loading}/>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Thanks for survey */}

        <div
          className={`translate duration-300 h-full w-full ${
            surveyComplete ? "-translate-y-96" : "translate-y-full"
          } ${surveyComplete ? "opacity-100" : "opacity-0"}`}
        >
          <div className="w-full p-10 rounded-xl bg-white flex justify-center items-center">
            <FaCheckDouble className="text-green-500 w-5 h-5 mr-3" />
               <span className="text-semibold">Thank you for the survey</span>
          </div>

        </div>
      </div>
    </div>
  );
};
export default PersonalSurveyForm;
