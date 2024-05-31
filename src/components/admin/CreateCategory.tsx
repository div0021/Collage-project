import { useCallback, useState } from "react";
import ComponentWrapper from "../component-wrapper";
import { FaCheck } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { CategorySchemaType, categorySchema, handleErrorResponse } from "../../lib/schema";
import FormInput from "../ui/form-input";
import Button from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { MdOutlineCategory } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import FormTextArea from "../ui/form-textarea";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {

  const [subCategory, setSubCategory] = useState<string[]>([]);
  const navigate = useNavigate();

  const [loading,setLoading] = useState<boolean>(false);

  const [inputValue,setInputValue] = useState<string>('')

  const handleSubCategory = useCallback((sub:string,action:boolean)=>{

    if(action){
      if(subCategory.indexOf(sub)!== -1){
        toast.error("This subcategory already exists");
        return;
      }
      setSubCategory(pre=>[...pre,sub]);
    }else if(!action){
      setSubCategory(pre=>pre.filter(cat=>cat!==sub));
    }


  },[subCategory])

  // React hook form

  const {handleSubmit,reset,register,formState:{errors}} = useForm<CategorySchemaType>({
    resolver:zodResolver(categorySchema),
    defaultValues:{
      name:'',
      description:''
      }

  });

  const onSubmit = async (values:CategorySchemaType) => {

    if(subCategory.length<1){
      toast.error("Create atleast one subcategory!");
      return;
    }

    const finalValue = {...values,subCategories:subCategory};

    setLoading(true);

    const url = import.meta.env.VITE_SERVER_URL

    try{

    await axios.post(`${url}/api/admin/category/create`,finalValue,{withCredentials:true});

    toast.success("Category is created!");

    //reset all
    reset()
    setSubCategory([])

    navigate("/admin/category");
    }catch(err){
      const { status } = handleErrorResponse.parse(errors);
      if (status === 500) toast.error("Currently service is unavailable");
      else {
        toast.error("unknown error");
        console.log("Error:: ", err);
    }

  }
  setLoading(false);
}




  return (
    <div className="w-full min-h-screen pt-32 pb-16">
      <ComponentWrapper>
        <div className="w-full px-5">
          {/* heading */}

          <div className="w-full">
            <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold">
              Create Category
            </h1>
            <p className="text-sm xl:text-base">Add a new Category.</p>
          </div>

          {/* Add product form */}

          <form className="py-3" onSubmit={handleSubmit(onSubmit)}>


            <div className=" my-10 grid grid-cols-2 gap-8">

            {/* Name */}

            <FormInput<CategorySchemaType> icon={MdOutlineCategory} name="name" register={register} label="Name" errors={errors.name} className="max-w-96 col-span-2 md:col-span-1" disabled={loading} />

            {/* description */}

            <FormTextArea<CategorySchemaType> name="description" register={register} rows={5} label="Description" placeholder="Write about product..." errors={errors.description} className="col-span-2 md:col-span-1" disabled={loading} />

          

            {/* subcategory */}
            <div className="col-span-2 w-full mt-3 space-y-2">
              <p>Add Sub Categories</p>
              <div className="w-full flex justify-between items-center max-w-96 relative border pl-5 pr-3 py-1 border-green-500 rounded-full">

                <input type="text" className="outline-none focus-within:outline-none text-sm w-full tracking-wide" placeholder="Write..." value={inputValue} onChange={(e)=>{setInputValue(e.currentTarget.value)}} disabled={loading} />

                <button className="rounded-full p-2 border border-transparent hover:border-green-500 transition-all duration-300 ease-in-out cursor-pointer hover:text-green-400" type="button" disabled={loading} onClick={()=>{
                  handleSubCategory(inputValue,true)
                  setInputValue('')
                }}>
                  <FaCheck className="w-4 h-4" />
                </button>


                  
              </div>

              <div className="w-full mt-2 flex justify-start items-center flex-wrap gap-5">

                {subCategory.map(subcat=>(
                  <div key={subcat} className="px-3 py-1 rounded-full flex justify-center items-center gap-x-2 border border-gray-400 bg-gray-200 mt-2 ">
                    <span>{subcat}</span>
                    <button type="button" disabled={loading} onClick={() => {handleSubCategory(subcat,false)

                    setInputValue('')
                    
                    }}>
                      <AiOutlineCloseCircle className="w-5 h-5 text-red-700" />
                    </button>
                  </div>
                ))}

              </div>


            </div>

            </div>

            <Button label="Create" type="submit" onClick={()=>{}} loading={loading} className="max-w-96"/>
            
          </form>
        </div>
      </ComponentWrapper>
    </div>
  );
};

export default CreateCategory;
