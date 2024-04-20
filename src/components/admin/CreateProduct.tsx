import { useCallback, useEffect, useMemo, useState } from "react";
import ComponentWrapper from "../component-wrapper";
import UploadImage from "../ui/upload-image";
import { IoPricetagOutline, IoTrashOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { ProductSchemaType, productSchema } from "../../lib/schema";
import FormInput from "../ui/form-input";
import FormTextArea from "../ui/form-textarea";
import FormSelect from "../ui/form-select";
import Button from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { RiNumbersLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { TbDiscount } from "react-icons/tb";
import axios, { AxiosError } from "axios";
import { CategoryDataType } from "../../lib/types";
import {SiBrandfolder} from "react-icons/si"
import { useNavigate } from "react-router-dom";
import AdminFilterOption from "./AdminFilterOption";

const CreateProduct = () => {
  const [images, setImages] = useState<string[]>([]);

  const navigate= useNavigate();

  const handleImage = useCallback((image: string) => {
    setImages((prev) => [...prev, image]);
  }, []);

  const [isFeatured,setIsFeatured] = useState<boolean>(false);

  const [isLoading,setIsLoading] = useState<boolean>(false);

  const handleFeatured = (featured:boolean)=>{
    setIsFeatured(featured);
  }
  const [isArchived,setIsArchived] = useState<boolean>(false);

  const handleArchived = (archived:boolean)=>{
    setIsArchived(archived);
  }

  const [subCategory, setSubCategory] = useState<string[]>([]);

  const [allCategoriesData, setAllCategoriesData] = useState<CategoryDataType[]>([]);

  const categories = useMemo(()=>{
    const data:{label:string,id:string}[] = [];

    allCategoriesData.forEach(el=>{
      data.push({label:el.name,id:el._id})
    })

    return data;

  },[allCategoriesData])

  // get All Categories
  useEffect(()=>{

    const getAllCategory = async () => {

      const url = import.meta.env.VITE_SERVER_URL;

      try{
        const response = await axios.get(`${url}/api/allCategories`);

        console.log(response.data);

        const categories:CategoryDataType[] = response.data.categories;

        setAllCategoriesData(categories);

      }catch(e){
        if(e instanceof AxiosError){
          console.log(e);
        }else{
          console.log("Error:",e);
        }
      }
      
    }

    getAllCategory();

  },[]);


  const [activeSubCategories, setActiveSubCategories] = useState<string[]>([]);

  // handle Category value change

  const handleValueChange = useCallback((value:string)=>{

    if(value.length===0) return;

    if(allCategoriesData.length>0){
    allCategoriesData.forEach(el=>{
      if(el._id===value){
        setActiveSubCategories(el.subCategories)
      }
    })}

  
  },[allCategoriesData]);

  const handleSubCategory = useCallback((sub:string,action:boolean)=>{

    if(action){
      setSubCategory(pre=>[...pre,sub]);
    }else if(!action){
      setSubCategory(pre=>pre.filter(cat=>cat!==sub));
    }


  },[])

  // React hook form

  const {handleSubmit,reset,register,formState:{errors}} = useForm<ProductSchemaType>({
    resolver:zodResolver(productSchema),
    defaultValues:{
      name:'',
      category:"",
      description:"",
      }

  });

  const onSubmit =async (values:ProductSchemaType) => {


    if(images.length!== 4){
      toast.error("Upload 4 product images!");
      return;
    }

    if(subCategory.length<1){
      toast.error("Choose atleast one subcategory!");
      return;
    }

    const finalValue = {...values,images:images,subCategories:subCategory,isFeatured,isArchived};

    console.log(finalValue);

    const url = import.meta.env.VITE_SERVER_URL

    setIsLoading(true);
    try{
      await axios.post(`${url}/api/admin/product`,finalValue,{withCredentials:true})

      reset();

      toast.success("Product created successfully!");

      setActiveSubCategories([]);
      setAllCategoriesData([]);
      setSubCategory([]);
      setImages([]);
      setIsLoading(false);
      navigate("/admin/products",{replace: true});

    }catch(e){
      console.log(e);
      toast.error("Something went wrong");
    }finally{
      setIsLoading(false)
    }

   

  }



  return (
    <div className="w-full min-h-screen pt-32 py-16">
      <ComponentWrapper>
        <div className="w-full px-5">
          {/* heading */}

          <div className="w-full">
            <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold">
              Create Product
            </h1>
            <p className="text-sm xl:text-base">Add a new product.</p>
          </div>

          {/* Add product form */}

          <form className="py-3" onSubmit={handleSubmit(onSubmit)}>

            {/* Product Image */}

            <div className="w-full">
            <p className="text-sm">Product Image</p>

            <div className="flex justify-start items-center gap-5 flex-wrap">
              {images.length < 4 && <UploadImage handleImages={handleImage} />}


              {images.map((el) => (
                <div className="h-52 w-52 relative rounded-lg overflow-hidden border border-gray-400" key={el}>
                  <img src={el} alt="product images" className="w-full h-full" />

                  <button
                    className="px-3 py-2 bg-red-600 rounded-lg absolute right-2 top-2 hover:text-white transition-all duration-300 ease-in-out"
                    type="button"
                    onClick={() =>
                      setImages((pre) => pre.filter((image) => image !== el))
                    } disabled={isLoading}
                  >
                    <IoTrashOutline className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            </div>


            <div className=" my-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-8 gap-y-16">

            {/* Name */}

            <FormInput<ProductSchemaType> icon={FiUser} name="name" register={register} label="Name" errors={errors.name} className="col-span-1" disabled={isLoading} />

            {/* Brand */}
            <FormInput<ProductSchemaType> icon={SiBrandfolder} name="brand" register={register} label="Brand" errors={errors.name} className="col-span-1" disabled={isLoading}/>

            {/* Quantity */}

            <FormInput<ProductSchemaType> icon={RiNumbersLine} name="quantity" register={register} label="Quantity" type="number" errors={errors.quantity} className="col-span-1" disabled={isLoading}/>

            {/* Price */}

            <FormInput<ProductSchemaType> icon={IoPricetagOutline} name="price" register={register} label="Price" type="number" errors={errors.price} className="col-span-1" disabled={isLoading}/>

            {/* description */}

            <FormTextArea<ProductSchemaType> name="description" register={register} rows={5} label="Description" placeholder="Write about product..." errors={errors.description} className="col-span-1" disabled={isLoading}/>

            {/* Featured */}

            <div className="w-full flex justify-start items-center">
            <AdminFilterOption label="Featured" handleCheck={handleFeatured}  />
            </div>

            {/* Archived */}
            <div className="w-full flex justify-start items-center">
            <AdminFilterOption label="Archived" handleCheck={handleArchived} />

            </div>

            {/* Category */}

            <FormSelect label="Category" data={categories} name="category" register={register} errors={errors.category} handleValueChange={handleValueChange} disabled={isLoading} />

            {/* Discount */}

            <FormInput<ProductSchemaType> icon={TbDiscount} name="discount" register={register} label="Discount" type="number" errors={errors.discount} className="col-span-1" disabled={isLoading}/>

            {/* subcategory */}

            <div className="col-span-1 md:col-span-2 xl:col-span-3 w-full">

              <label htmlFor="subcategories" className="ml-2 font-md pb-1">
                Sub Categories
              </label>

              <div className="w-full flex justify-start items-center gap-5 flex-wrap">
                {activeSubCategories.length===0 && (
                  <p className="mt-2 ml-2">Choose a category...</p>
                )}
              {activeSubCategories.length > 0 && (activeSubCategories.map(el=>(
                <AdminFilterOption key={el} label={el} handlemultipleCheck={handleSubCategory} className="w-auto"/>
              )))}

              </div>

            </div>

            
            

            </div>
            <Button label="Create" type="submit" onClick={()=>{}} loading={isLoading} disabled={isLoading} className="sm:max-w-96"/>
          </form>
        </div>
      </ComponentWrapper>
    </div>
  );
};

export default CreateProduct;
