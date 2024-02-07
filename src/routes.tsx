import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "./App";
import ProductPage from "./components/product-page";
import LandingSection from "./components/landing-section";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children:[
        {
            path:"/",
            element:<LandingSection />
        },
        {
            path:"products/:productId",
            element:<ProductPage />
        }
        
      ]
    }
  ]);