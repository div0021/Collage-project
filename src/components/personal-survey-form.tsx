import { useEffect, useState } from "react";
import Input from "./ui/input";
import { FaUser } from "react-icons/fa";
import Select from "./ui/select";
import {v4 as uuid} from "uuid"
import FilterOption from "./categories/FilterOption";
import { Radio } from "@material-tailwind/react";
import Button from "./ui/button";
import { cn } from "../lib/cn";


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
    label:"Asthma",
  },
  {
    label:"Cancer",
  },
  {
    label:"Cardiac disease",
  },
  {
    label:"Diabetes",
  },
  {
    label:"Hypertension",
  },
  {
    label:"Psychiatric disorder",
  },
  {
    label:"Epilepsy",
  },
  {
    label:"Other diseases",
  },
]
const DiseaseSymptoms=[
  {
    label:"Chest pain",
  },
  {
    label:"Respiratory",
  },
  {
    label:"Cardiac disease",
  },
  {
    label:"Hematological",
  },
  {
    label:"Lymphatic",
  },
  {
    label:"Neurological",
  },
  {
    label:"Gastrointestinal",
  },
  {
    label:"Genitourinary",
  },
  {
    label:"Weight gain",
  },
  {
    label:"Musculoskeletal",
  },
  {
    label:"Other symptoms",
  },
]

const PersonalSurveyForm = () => {


  const [open, setOpen] = useState<boolean | undefined>(false);

  const [surveyComplete,setSurveyComplete] = useState<boolean>(false);

  const [scrollWidth, setScrollWidth] = useState<number>(0);

  const [surveyOpen,setSurveyOpen] = useState<boolean>(false);

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

              <form action="" className="space-y-10">

                {/*  Name */}
                <div className="w-full flex flex-col sm:flex-row  justify-between items-center gap-x-10 gap-y-10">

                  <Input icon={FaUser} label="First Name"/>
                  <Input icon={FaUser} label="Last Name"/>
                </div>

                {/* Age, Gender */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 justify-between items-center gap-x-10 gap-y-10">

                  <Input icon={FaUser} label="Age" type="number" placeholder="e.g., 24" className=""/>

                  <Select data={genderData} name="Select your gender" />

                </div>
                
                <div className="w-full flex flex-col sm:flex-row gap-y-10 justify-between items-center gap-x-10">

                  <Input icon={FaUser} label="Contact Number" placeholder="9988776655" type="number"/>
                  <Input icon={FaUser} label="Email"/>
                </div>

                {/* conditions */}

                <div className="w-full">
                  <p className="text-sm">Check the conditions that apply to you or any member of your immediate relatives:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2">
                    {DiseaseCondition.map(el=>(
                    <FilterOption label={el.label} key={el.label + "disease"}/>
                    ))}

                  </div>
                </div>

                {/* Symptoms */}
                <div className="w-full">
                  <p className="text-sm">Check the symptoms that you' re currently experiencing:</p>
                  <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3">
                    {DiseaseSymptoms.map(el=>(
                    <FilterOption label={el.label} key={el.label + "symptoms"}/>
                    ))}

                  </div>
                </div>

                {/* medication */}

                <div className="w-full">
                  <p className="text-sm">
                  Are you currently taking any medication?
                  </p>
                  <div className="flex justify-start items-center gap-x-10 text-sm">
                    <Radio crossOrigin={""} name="medication" label="Yes" />
                    <Radio crossOrigin={""} name="medication" label="No" />

                  </div>
                </div>

                {/* Alcohol */}
                <div className="w-full">
                  <p className="text-sm">
                  How often do you consume alcohol?
                  </p>
                  <div className="flex justify-start items-center gap-x-10 text-sm flex-wrap">
                    <Radio crossOrigin={""} name="alcohol" label="Daily" />
                    <Radio crossOrigin={""} name="alcohol" label="Weekly" />
                    <Radio crossOrigin={""} name="alcohol" label="Monthly" />
                    <Radio crossOrigin={""} name="alcohol" label="Occasionally" />
                    <Radio crossOrigin={""} name="alcohol" label="Never" />

                  </div>
                </div>

                {/* Tobacco */}

                <div className="w-full">
                  <p className="text-sm">Do you use any kind of tobacco or have you ever used them?</p>
                  <div className="flex justify-start items-center gap-x-10 text-sm">
                    <Radio crossOrigin={""} name="tobacco" label="Yes" />
                    <Radio crossOrigin={""} name="tobacoo" label="No" />
                  </div>
                </div>


                {/* Drugs */}

                <div className="w-full">
                  <label className="text-sm" htmlFor="drugs">Do you use any kind of illegal drugs or have you ever used them?</label>
                  <div className="flex justify-start items-center gap-x-10 text-sm">
                    <Radio crossOrigin={""} name="drugs" label="Yes" />
                    <Radio crossOrigin={""} name="drugs" label="No" />
                  </div>
                </div>

                <div className="w-full bg-gray-500/50 rounded-xl py-[0.25px] my-5" />

                <div className="my-10 w-full flex items-center justify-center">

                  <Button label="Submit" onClick={(e)=>{e.preventDefault()
                    setOpen(false)
                    setTimeout(()=>{
                      setSurveyComplete(true)
                    },300)

                    setTimeout(()=>{
                      setSurveyComplete(false)
                    },1700)
                    setTimeout(()=>{
                      setSurveyOpen(false)
                    },2000)
                    
                    }} className="w-52 rounded-full hover:text-white"/>

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
          <div className="w-full p-10 rounded-xl bg-white">
               Thank you for the survey
          </div>

        </div>
      </div>
    </div>
  );
};
export default PersonalSurveyForm;
