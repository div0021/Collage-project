import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "./App";
import ProductPage from "./components/product-page";
import LandingSection from "./components/landing-section";
import Ayurvedic from "./components/categories/Ayurvedic";
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
import CartPage from "./components/cart-page";
import Organic from "./components/categories/Organic";
import EcoFriendly from "./components/categories/EcoFriendly";
import Address from "./components/address";
import CheckOutPage from "./components/checkoutpage";
import PaymentSuccess from "./components/payment-success";
import OrderPage from "./components/order-page";
import Blogs from "./components/Blogs";
import AboutUs from "./components/aboutus";

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
            path:"category/organic",
            element:<Organic />,
          },
          {
            path:"category/ecofriendly",
            element:<EcoFriendly />,
          },
          {
            path:"address",
            element:<Address />,
          },
          {
            path:"cart",
            element:<CartPage />
          },
          {
            path:"orders",
            element:<OrderPage />
          },
          {
            path:"checkout",
            element:<CheckOutPage />
          },
          {
            path:"paymentsuccess",
            element:<PaymentSuccess />
          },
          {
            path:"blogs",
            element:<Blogs />
          },
          {
            path:"aboutus",
            element:<AboutUs />
          }

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