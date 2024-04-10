import Button from "../ui/button";
import { CiSearch } from "react-icons/ci";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import { TbCategoryPlus } from "react-icons/tb";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { GoTriangleDown } from "react-icons/go";
import { RxDotsHorizontal } from "react-icons/rx";
import { ChangeEvent, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { storeObjectInLocalStorage } from "../../lib/user-store";
import { toast } from "react-toastify";

export type CategoryItemType = {
  _id: string;
  name: string;
  description: string;
  subCategories: string[];
  createdAt: Date;
  updatedAt: Date;
};

const AllCategories = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<CategoryItemType[]>([]);

  const [searchValue,setSearhValue] = useState<string>('');

  const [searchCategoriesList,setSearchCategoriesList] = useState<CategoryItemType[]>([])


  useEffect(() => {
    const getCategories = async () => {
      const url = import.meta.env.VITE_SERVER_URL;

      try {
        const response = await axios.get(`${url}/api/allCategories`);

        // console.log(response.data);

        setCategories(response.data.categories);
        setSearchCategoriesList(response.data.categories);
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.response?.status === 404) {
            console.log("No category found");
            toast.info("Add new Category!")
          } else {
            console.log(e);
          }
        } else {
          console.log("AllCategoryError:", e);
        }
      }
    };
    getCategories();

    return () => {
      setCategories([]);
    };
  }, []);

  const handleSearchValue = (e:ChangeEvent<HTMLInputElement>)=>{
    setSearhValue(e.currentTarget.value);

    if(e.currentTarget.value.length < 3) {
      setSearchCategoriesList(categories);
      return
    }

    setSearchCategoriesList(categories.filter(category=>category.name.toLowerCase().includes(e.currentTarget.value.toLowerCase())))
  }

  const handleDeleteClick = async (id: string) => {
    const url = import.meta.env.VITE_SERVER_URL;

    try {
      await axios.delete(`${url}/api/admin/category/${id}`, {
        withCredentials: true,
      });

      setCategories((pre) => pre.filter((cate) => cate._id !== id));

      toast.success("Category deleted successfully");
    } catch (error) {
      console.log("c[[CATEGORY DELETE ERROR]]:", error);
    }
  };

  return (
    <div className="w-full mt-32 px-5 min-h-screen min-w-[600px] shrink-0 overflow-x-scroll sm:overflow-x-hidden">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-body text-black">All Categories</h1>

        <Button
          label="Add category"
          onClick={() => {
            navigate("/admin/category/create");
          }}
          icon={TbCategoryPlus}
          className="w-52 font-medium"
        />
      </div>

      <div className="w-full my-5  relative">
        <input
          type="text"
          className="outline-none w-80 h-12 border border-gray-800/60 hover:border-gray-800 transition-all duration-300 ease-in-out pl-10 px-5 py-2 rounded-lg text-sm font-medium tracking-wide peer focus-within:ring-1 focus-within:ring-offset-1 focus-within:ring-gray-900 disabled:cursor-not-allowed"
          placeholder="Search here..." disabled={categories.length===0} value={searchValue} onChange={handleSearchValue}
        />
        <CiSearch className="absolute top-3 left-1.5 w-6 h-6 z-10 text-gray-800/60 peer-hover:text-gray-800 transition-all duration-300 ease-in-out" />
      </div>

      
      {categories.length===0 && (
            <div className="mt-24 w-full h-1/4 flex justify-center items-center">
              No Category found

            </div>

          )}

      {categories.length > 0 && (
      <div className="mt-10 w-full">
        <div className="grid grid-cols-12 gap-x-1">
          {/* Name */}

          <div className="flex w-full h-full justify-start items-center col-span-3 sm:col-span-2 font-semibold tracking-wide  px-2 py-1 rounded-lg">
            Name
          </div>

          {/* Description */}

          <div className="flex w-full h-full justify-start items-center col-span-3 px-2 py-1 rounded-lg text-sm font-semibold">
            Description
          </div>

          {/* SubCategories */}

          <div className="flex w-full h-full justify-start items-center col-span-4 sm:col-span-5 xl:col-span-6  px-2 py-1 rounded-lg font-semibold tracking-wide">
            SubCategories
          </div>
          <div className="flex w-full h-full justify-center items-center col-span-2 xl:col-span-1  px-2 py-1 rounded-lg font-semibold tracking-wide">
            Edit
          </div>
        </div>

        <div className="mt-4 w-full space-y-3">
          {searchCategoriesList.map((el) => (
              <div className="w-full grid grid-cols-12 gap-x-1" key={uuid()}>
                <div className="flex w-full h-full justify-start items-center col-span-3 sm:col-span-2 px-2 py-1 rounded-lg text-sm">
                  {el.name}
                </div>

                {/* Description */}

                <div className="flex w-full h-full justify-start items-center col-span-3 px-2 py-1 rounded-lg text-sm">
                  {el.description.length > 100
                    ? el.description.substring(0, 100) + "..."
                    : el.description}
                </div>

                {/* sub category */}

                <div className="flex w-full h-full justify-start items-center col-span-4 sm:col-span-5 xl:col-span-6 px-2 py-1 rounded-lg text-sm gap-5 shrink-0 flex-wrap">
                  {el.subCategories.map((subcat) => (
                    <span
                      key={subcat}
                      className="px-1.5 py-1 rounded-full border shrink-0 border-gray-400 bg-gray-200"
                    >
                      {subcat}
                    </span>
                  ))}
                </div>

                {/* Edit */}

                <div className="flex w-full h-full justify-center items-center col-span-2 xl:col-span-1 px-2 py-1 rounded-lg text">
                  <div className="p-2 rounded-full hover:bg-gray-400/20 border border-transparent hover:border-gray-900/40 cursor-pointer transition-all duration-300 ease-in-out relative group">
                    <RxDotsHorizontal className="w-4 h-4" />
                    <GoTriangleDown className="w-5 h-5 absolute -top-2 left-1 text-gray-200 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto" />

                    <div className="opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto absolute -top-16 -left-7 text-sm bg-gray-200 p-1 rounded-lg">
                      <Link
                        to={`/admin/category/${el._id}`}
                        className="w-full hover:bg-white p-1 rounded-lg flex justify-start items-center transition-all duration-300 ease-in-out"
                        onClick={() => {
                          storeObjectInLocalStorage<CategoryItemType>(
                            `${el._id}`,
                            el
                          );
                        }}
                      >
                        <MdOutlineModeEdit className="w-4 h-4 mr-2" />
                        <span>Edit</span>
                      </Link>
                      <button
                        className="w-full hover:bg-white p-1 rounded-lg flex justify-center items-center transition-all duration-300 ease-in-out"
                        type="button"
                        onClick={() => handleDeleteClick(el._id)}
                      >
                        <IoTrashOutline className="w-4 h-4 mr-2" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div> 
      </div>)}
    </div>
  );
};

export default AllCategories;
