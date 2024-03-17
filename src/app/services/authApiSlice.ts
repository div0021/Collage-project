import { apiSlice } from "../api/apiSlice"
import { logOut, setCredentials } from "../features/authSlice";

export interface RegisterRequest{
    name:string;
    email:string;
    password:string;
    passwordConfirmation:string;
}
export interface RegisterResponse{
    statusCode:number;
}

export interface  LoginRequest{
    email: string,
    password: string
}

export interface LoginResponse{
    accessToken:string
}

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
        signup:builder.mutation<RegisterResponse,RegisterRequest>({
            query:(credentials)=>({
                url:"/api/users",
                method:"POST",
                body:credentials,
            }),
        }),
        login:builder.mutation<LoginResponse,LoginRequest>({
            query:(credentials)=>({
                url:'/api/sessions',
                method:'POST',
                body: credentials,
            }),
        }),
        logOut:builder.mutation({
            query:()=>({
                url:"/api/sessions",
                method:"DELETE",
            }),
            async onQueryStarted(_,{dispatch,queryFulfilled}){
                try{
                    await queryFulfilled
                    dispatch(logOut())
                    setTimeout(()=>{
                        dispatch(apiSlice.util.resetApiState());
                    },1000)  
                 }catch(error){
                    console.error("[LogOut Error]",error)
                 }
            }
        }),
        currentUser:builder.mutation({
            query:()=>({
                url:'/api/me',
                method:"GET",
            }),
            async onQueryStarted(_,{dispatch,queryFulfilled}){
                const response = await queryFulfilled

                dispatch(setCredentials(response.data))
                // console.log("User data",data.);
            }
        })
    })
})

export const {useSignupMutation,useLoginMutation,useLogOutMutation,useCurrentUserMutation} = authApiSlice