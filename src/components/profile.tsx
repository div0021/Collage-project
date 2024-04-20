import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";

import { addProfile, onProfileClose, selectProfileOpen, selectUserProfile } from "../app/features/profileSlice";
import { selectCurrentUser } from "../app/features/authSlice";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { AiFillPlusCircle } from "react-icons/ai";


const Profile = () => {
  const dispatch = useAppDispatch();

  const profileOpen = useAppSelector(selectProfileOpen);

  const currentUser = useAppSelector(selectCurrentUser);


  const [open, setOpen] = useState<boolean | undefined>(profileOpen);

  useEffect(() => {
    setOpen(profileOpen);
  }, [profileOpen]);

  useEffect(()=>{
    const getUserProfile = async () => {
      const url = import.meta.env.VITE_SERVER_URL;

      try{

        const response = await axios.get(`${url}/api/profile`,{withCredentials:true});
        
        dispatch(addProfile(response.data.profile))

      }catch(error){
        console.log("Profile not found");
      }
    }

    getUserProfile();

  },[currentUser,dispatch]);

  const profile = useAppSelector(selectUserProfile)

  if (!profileOpen) {
    return null;
  }

  return (
    <div
      className={`h-full fixed overflow-x-hidden bg-gray-800/90 inset-0 flex justify-center items-center z-50 focus:outline-none outline-none overflow-hidden`}
    >
      <div className="relative w-full md:w-5/6 lg:w-4/6 max-w-screen-md mx-auto h-full sm:h-[32rem] rounded-xl lg:max-h-[50rem] xl:max-h-[60rem] ">
        <div
          className={`translate duration-300  h-full w-full ${
            open ? "translate-y-0" : "translate-y-full"
          } ${open ? "opacity-100" : "opacity-0"}`}
        >
          <div className="h-full w-full px-5 py-3 pb-5 rounded-xl overflow-hidden border border-green-500 bg-white overflow-y-scroll">

            <div className="w-full py-5">
              <h2 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl text-center font-medium lg:font-semibold">User Profile</h2>
            </div>

           {profile && ( <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-10">
              
              {/* Name */}

              <div className="w-full flex justify-center items-center gap-3 flex-wrap text-nowrap">
                <div className="w-full">
                  <p className="text-sm">First Name</p>
                  <p className="px-2 py-1 border border-green-900 rounded-lg bg-green-200 text-white">{profile?.firstName}</p>
                  </div>

              </div>
              <div className="w-full flex justify-center items-center flex-wrap text-nowrap">
                <div className="w-full">
                  <p className="text-sm">Last Name</p>
                  <p className="px-2 py-1 border border-green-900 rounded-lg bg-green-200 text-white">{profile?.lastName}</p>

                  </div>

              </div>

              {/* Email */}

              <div className="w-full flex justify-center items-center flex-wrap text-nowrap">
                <div className="w-full">
                  <p className="text-sm">Email</p>
                  <p className="px-2 py-1 border border-green-900 rounded-lg bg-green-200 text-white">{profile.user.email}</p>

                  </div>

              </div>

              {/* Contact */}

              <div className="w-full flex justify-center items-center flex-wrap text-nowrap">
                <div className="w-full">
                  <p className="text-sm">Contact</p>
                  <p className="px-2 py-1 border border-green-900 rounded-lg bg-green-200 text-white">{profile.contact}</p>

                  </div>

              </div>

              {/* email verified */}

              <div className="w-full flex justify-start items-center flex-wrap text-nowrap gap-2">

              {profile.user.isEmailVerified ? (
                    <FaCheckCircle className="text-green-500 w-5 h-5" />
                  ) : (
                    <AiFillPlusCircle className="text-red-500 w-5 h-5 rotate-45"/>
                  )}
                  <p className="text-sm">Email Verified</p>
              </div>

              {/* Survey */}
              <div className="w-full flex justify-start items-center flex-wrap text-nowrap gap-2">

              {profile.user.userSurvey ? (
                    <FaCheckCircle className="text-green-500 w-5 h-5" />
                  ) : (
                    <RxCross2 className="text-red-500 w-5 h-5"/>
                  )}
                  <p className="text-sm">User Survey</p>
              </div>

              {/* Age, Gender */}

              <div className="w-full flex justify-center items-center flex-wrap text-nowrap">
                <div className="w-full">
                  <p className="text-sm">Age</p>
                  <p className="px-2 py-1 border border-green-900 rounded-lg bg-green-200 text-white">{profile?.age}</p>

                  </div>

              </div>

              {/* gender */}

              <div className="w-full flex justify-center items-center flex-wrap text-nowrap">
                <div className="w-full">
                  <p className="text-sm">Gender</p>
                  <p className="px-2 py-1 border border-green-900 rounded-lg bg-green-200 text-white">{profile?.gender.charAt(0).toUpperCase() + profile?.gender.substring(1)}</p>

                  </div>

              </div>


              {/* Address */}

              {profile.address && (<div className="w-full flex justify-center items-center flex-wrap text-nowrap">
                <div className="w-full">
                  <p className="text-sm">Address</p>
                  <p className="px-2 py-1 border border-green-900 rounded-lg bg-green-200 text-white text-wrap">{profile.address}</p>

                  </div>

              </div>)}

              {profile.city && (<div className="w-full flex justify-center items-center flex-wrap text-nowrap">
                <div className="w-full">
                  <p className="text-sm">City</p>
                  <p className="px-2 py-1 border border-green-900 rounded-lg bg-green-200 text-white">{profile.city}</p>

                  </div>

              </div>)}

              {profile.state && (<div className="w-full flex justify-center items-center flex-wrap text-nowrap">
                <div className="w-full">
                  <p className="text-sm">State</p>
                  <p className="px-2 py-1 border border-green-900 rounded-lg bg-green-200 text-white">{profile.state}</p>

                  </div>

              </div>)}

              {profile.pincode && (<div className="w-full flex justify-center items-center flex-wrap text-nowrap">
                <div className="w-full">
                  <p className="text-sm">Pincode</p>
                  <p className="px-2 py-1 border border-green-900 rounded-lg bg-green-200 text-white">{profile.pincode}</p>

                  </div>

              </div>)}

              

              
            </div>)}
            

          </div>
          <button
            className="absolute top-0.5 right-0.5 md:-right-2 md:-top-2 p-1 bg-red-600 flex iemc justify-center text-white rounded-full"
            onClick={() => {
              setOpen(false);
              setTimeout(() => {
                dispatch(onProfileClose());
              }, 300);
            }}
          >
            <RxCross2 className="w-4 h-4 font-bold" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Profile;
