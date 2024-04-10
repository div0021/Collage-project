import axios from 'axios';
import { ChangeEvent, MouseEvent, useRef, useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import CircularLoader from '../loaders/circular-loader';

interface UploadImageProps {
  // Define your component props here
  handleImages:(image:string)=>void;
}

const UploadImage = ({handleImages}: UploadImageProps) => {  
    
    const [image,setImage]=useState<File | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    const [isLoading,setIsLoading] = useState<boolean>(false);
    const handleChange = async (e:ChangeEvent<HTMLInputElement>)=>{

        if(e.currentTarget.files){
        setImage(e.currentTarget.files[0])

        }
    }

    const saveImage = async (e:MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        const data = new FormData();
        data.append("file",image!);

        // Preset name
        data.append("upload_preset",import.meta.env.VITE_CLOUDINARY_PRESET);

        // cloudName
        data.append("cloud_name",import.meta.env.VITE_CLOUDINARY_CLOUD_NAME)

        setIsLoading(true);

        try{
            if(image===null){
                return toast.error("Please upload image.");
            }

            const res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,data);

            const cloudData = await res.data;
            handleImages(cloudData.url)
            // console.log("url ",cloudData.url);
            toast.success("Image uploaded");
            setImage(null);
        }catch(error){
            console.log("Upload image error",error);
            toast.error("Upload Image error!");
        }
        setIsLoading(false);
    }
  return (
    <div className='flex justify-start items-center'>

    <div className={`w-52 h-52 ${image ? "border-solid" :"border-dashed"} border-2 hover:ring-1 hover:ring-green-500/50 hover:ring-offset-2 border-gray-500 flex justify-center items-center rounded-lg relative cursor-pointer transition-all ease-in-out duration-300 overflow-hidden`} onClick={()=>inputRef.current?.click()}>
    {image ? (
        <>
        <img className='w-52' src={image ? URL.createObjectURL(image): ""} />
        <button className='absolute bottom-1 flex justify-center items-center bg-green-400 px-3 py-1.5 w-40 rounded-lg hover:text-white transition-all duration-300 ease-in-out' type='button' onClick={saveImage}>
            {isLoading ? (
                <CircularLoader />
            ) :(<>
                <AiOutlineCloudUpload className="w-4 h-4 mr-2"/>
            <span>Upload</span>
            </>)}
        </button>
        </>
    ) : (
        <>
        <BiImageAdd className="w-5 h-5 mr-2" />
        <span>Upload</span>
        </>
    )}
    </div>

    <input ref={inputRef} type="file" accept='image/png, image/jpeg,  image/jpg' id="image-upload" className='hidden' onChange={handleChange}/>

    </div>
  );
};

export default UploadImage;