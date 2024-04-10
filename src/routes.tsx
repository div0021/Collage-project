import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "./App";
import ProductPage from "./components/product-page";
import LandingSection from "./components/landing-section";
import Ayurvedic from "./components/categories/Ayurvedic";
import ShippingDetails from "./components/shipping-details";
import ForgetPassword from "./components/forget-password/ForgetPassword";
import OtpVerification from "./components/forget-password/OtpVerification";
import ResetPassword from "./components/forget-password/ResetPassword";
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/AdminLayout";
import AdminProductPage from "./components/admin/AdminProductPage";
import AllProducts from "./components/admin/AllProducts";
import CreateProduct from "./components/admin/CreateProduct";
import AllCategories from "./components/admin/AllCategories";
import CreateCategory from "./components/admin/CreateCategory";
import UpdateCategory from "./components/admin/UpdateCategory";
import UpdateProduct from "./components/admin/UpdateProduct";
import NotFound from "./components/ui/not-found";
import Overview from "./components/admin/Overview";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children:[
        {
          path:"/",
          element:<Layout />,
          children:[
            {
              path:"/",
              element:<LandingSection />
          },
          {
              path:"products/:productId",
              element:<ProductPage />
          },
          {
            path:"category/ayurvedic",
            element:<Ayurvedic />,
          },
          {
            path:"buy/details",
            element:<ShippingDetails />,
          },

          ]
        },
        {
          path:'forgetPassword',
          element:<ForgetPassword />
        },
        {
          path:'forgetPassword/:id',
          element:<OtpVerification />
        },
        {
          path:'resetPassword',
          element:<ResetPassword />
        },

        // admin route
        {
          path:"admin",
          element:<AdminLayout />,
          children:[
            {
              path:"",
              element:<Overview />

            },
            {
              path:"products",
              element:<AdminProductPage />,
              children:[
                {
                  path:"",
                  element:<AllProducts />
                },
                {
                  path:"create",
                  element:<CreateProduct />

                },
                {
                  path:":productId",
                  element:<UpdateProduct />

                },
              ]
            },
            {
              path:"category",
              element:<AllCategories />,
            },
            {
              path:"category/create",
              element:<CreateCategory />,
            },
            {
              path:"category/:categoryId",
              element:<UpdateCategory />,
            },
          ]
          
        }
      
        
      ]
    },
    {
      path:"*",
      element:<NotFound />
    }
  ]);