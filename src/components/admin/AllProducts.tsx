import Button from '../ui/button';
import { FaStore } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { formatCurrency } from '../../lib/formatCurrency';
import { RxDotsHorizontal } from 'react-icons/rx';
import {GoTriangleDown} from "react-icons/go"
import { Link, useNavigate } from 'react-router-dom';
import { IoTrashOutline } from 'react-icons/io5';
import { MdOutlineModeEdit } from 'react-icons/md';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ProductType } from '../../lib/schema';
import { storeObjectInLocalStorage } from '../../lib/user-store';


const AllProducts = () => {


  const navigate = useNavigate();

  const [searchValue,setSearhValue] = useState<string>('');
  const [searchProductsList, setSearchProductList] = useState([] as Array<ProductType>)

  const [products,setProducts] = useState<ProductType[]>([]);

  useEffect(()=>{
    const getAllProducts = async () => {

      
      const url = import.meta.env.VITE_SERVER_URL

      try{

      const response = await axios.get(`${url}/api/admin/products`,{withCredentials:true});


      const products:ProductType[] = response.data.products;

      setProducts(products);
      setSearchProductList(products);

      }catch(error){
        console.log("GET ALL PRODUCT ERROR");
        toast.error('Error while fetching products');
      }
    }
    getAllProducts();
  },[]);

  // handleSearch value

  const handleSearchValue = (e:ChangeEvent<HTMLInputElement>)=>{
    setSearhValue(e.currentTarget.value);

    if(e.currentTarget.value.length<3){
      setSearchProductList(products);
      return;
    }

    setSearchProductList(products.filter((product) => product.name.toLowerCase().includes(e.currentTarget.value.toLowerCase())))  
  }

  const handleDeleteClick = async (id:string) =>{

    const url = import.meta.env.VITE_SERVER_URL

    try{
      await axios.delete(`${url}/api/admin/product/${id}`,{withCredentials:true})

      toast.success("This product is put under archived section.")

      window.location.reload()
    }catch(error){
        console.log("Delete PRODUCT ERROR");
        toast.error('Error while Delete a products');
      }

  }
  return (
    <div className='w-full mt-32 px-5 min-h-screen min-w-[600px] shrink-0 overflow-x-scroll sm:overflow-x-hidden'>

       <div className="w-full flex justify-between items-center">
        <h1 className='text-3xl font-body text-black'>All Products({products.length})</h1>

        <Button label='Add product' onClick={()=>{navigate("/admin/products/create")}} icon={FaStore} className='w-52 font-medium' />
       </div>

       {/* Search */}

       <div className="w-full my-5  relative">
        <input type="text" className='outline-none w-80 h-12 border border-gray-800/60 hover:border-gray-800 transition-all duration-300 ease-in-out pl-10 px-5 py-2 rounded-lg text-sm font-medium tracking-wide peer focus-within:ring-1 focus-within:ring-offset-1 focus-within:ring-gray-900 disabled:cursor-not-allowed' placeholder='Search here...' disabled={products.length===0} value={searchValue} onChange={handleSearchValue}/>
        <CiSearch className="absolute top-3 left-1.5 w-6 h-6 z-10 text-gray-800/60 peer-hover:text-gray-800 transition-all duration-300 ease-in-out" />
       </div>

       {products.length===0 && (
        <div className="my-10 w-full">
          No products found!
        </div>
       )}

       {products.length > 0 && <div className="mt-10 w-full">

        <div className="grid grid-cols-12 gap-x-1">

          {/* Name */}

          <div className="flex w-full h-full justify-start items-center col-span-3 sm:col-span-2 font-semibold tracking-wide  px-2 py-1 rounded-lg">
            Name

          </div>

          {/* Description */}

          <div className="hidden xl:flex w-full h-full justify-start items-center col-span-2  px-2 py-1 rounded-lg font-semibold tracking-wide">
            Description

          </div>

          {/* Quantity */}

          <div className="flex w-full h-full justify-start items-center col-span-2  px-2 xl:col-span-1 py-1 rounded-lg font-semibold tracking-wide">
            Quantity

          </div>

          {/* Price */}

          <div className="flex w-full h-full justify-start items-center col-span-3 sm:col-span-2 xl:col-span-1 px-2 py-1 rounded-lg font-semibold tracking-wide">
            Price

          </div>

          <div className="hidden xl:flex w-full h-full justify-start items-center col-span-1  px-2 py-1 rounded-lg font-semibold tracking-wide">
            Discount(%)

          </div>

          {/* Category */}

          <div className="flex w-full h-full justify-start items-center col-span-4 sm:col-span-2 px-2 py-1 rounded-lg font-semibold tracking-wide">
            Category

          </div>

          {/* Featured */}

          <div className="hidden xl:flex w-full h-full justify-start items-center col-span-1 px-2 py-1 rounded-lg font-semibold tracking-wide">
            Featured

          </div>

          {/* subcateogries */}

          <div className="hidden sm:flex w-full h-full justify-start items-center col-span-2 xl:col-span-2 px-2 py-1 rounded-lg font-semibold tracking-wide">
            SubCategories

          </div>

        </div>

        <div className="mt-4 w-full space-y-3 pb-10">

          {searchProductsList.map(el=>(

<div className="w-full h-fit grid grid-cols-12 gap-x-1 border-b border-b-gray-400 py-2 " key={el.name}>

  <div className="flex w-full h-full justify-start items-center col-span-3 sm:col-span-2 px-2 py-1 rounded-lg text-sm">
    {el.name}

  </div>

  {/* Description */}

  <div className="hidden xl:flex w-full h-full justify-start items-center col-span-2 px-2 py-1 rounded-lg text-sm">
            {el.description.length>100 ? `${el.description.substring(0,100)}...` : el.description }

          </div>

  {/* Quantity */}

  <div className="flex w-full h-full justify-start items-center col-span-2 xl:col-span-1 px-2 py-1 rounded-lg text-sm">
    {el.quantity}

  </div>

  {/* Price */}

  <div className="flex w-full h-full justify-start items-center col-span-3 sm:col-span-2 xl:col-span-1 px-2 py-1 rounded-lg text-sm">
    {formatCurrency(Number(el.price)).charAt(0) + " " + formatCurrency(Number(el.price)).substring(1)}

  </div>

  {/* Discount */}

  <div className="hidden xl:flex w-full h-full justify-start items-center col-span-1 px-2 py-1 rounded-lg text-sm">
    {el.discount}

  </div>

  {/* Category */}

  <div className="flex w-full h-full justify-start items-center col-span-2 px-2 py-1 rounded-lg text-sm">
    {el.category.name.toUpperCase()}

  </div>

  {/* Featured */}

  <div className="hidden xl:flex w-full h-full justify-start items-center col-span-1 px-2 py-1 rounded-lg text-sm">
            {el.isFeatured.toString()}

          </div>

  {/* subCategories */}

  <div className="hidden sm:flex w-full h-full justify-start items-center col-span-2 xl:col-span-1 py-1 rounded-lg text-sm gap-2 flex-wrap">

    {el.subCategories.map(sub=>(
      <span className='px-2 py-1 rounded-full border border-gray-400 bg-gray-200 text-nowrap' key={sub}>{sub}</span>
    ))}

  </div>

  {/* Edit */}

  <div className="flex w-full h-full justify-center items-center col-span-2 xl:col-span-1 px-2 py-1 rounded-lg text">
    <div className='p-2 rounded-full hover:bg-gray-400/20 border border-transparent hover:border-gray-900/40 cursor-pointer transition-all duration-300 ease-in-out relative group'>
      <RxDotsHorizontal className="w-4 h-4"/>
      <GoTriangleDown className="w-5 h-5 absolute -top-2 left-1 text-gray-200 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto" />

      <div className="opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto absolute bottom-8 -left-6 text-sm bg-gray-200 p-1 rounded-lg">
        <Link to={`/admin/products/${el._id}`} className='w-full hover:bg-white p-1 rounded-lg flex justify-start items-center transition-all duration-300 ease-in-out' onClick={()=>{
          storeObjectInLocalStorage<ProductType>(`${el._id}`,el)
        }}>
          <MdOutlineModeEdit className="w-4 h-4 mr-2" />
          <span>Edit</span>
        </Link>
        {!el.isArchived && <button className='w-full hover:bg-white p-1 rounded-lg flex justify-center items-center transition-all duration-300 ease-in-out' onClick={()=> handleDeleteClick(el._id)}>
          <IoTrashOutline className="w-4 h-4 mr-2" />
          <span>Delete</span>
        </button>}
      </div>
    </div>

  </div>

</div>

          ))}
            
        </div>

       </div>}
    </div>
  );
};

export default AllProducts;