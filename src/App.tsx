import { Outlet } from "react-router-dom";
import ComponentWrapper from "./components/component-wrapper";
import Login from "./components/login";
// import Modal from './components/modal'
import Navbar from "./components/navbar";
import Register from "./components/register";
import Footer from "./components/footer";
import FilterMobile from "./components/categories/FilterMobile";
import PersonalSurveyForm from "./components/personal-survey-form";

function App() {
  return (
    <ComponentWrapper>
      <div className="w-full relative pt-16 sm:pt-0 md:pt-0">
        {/* <Modal actionLabel='Update' footer="" isOpen={true} onClose={()=>{}} onSubmit={()=>{}} title='Your profile'/> */}
        <Login />
        <Register />
        <PersonalSurveyForm />
        <div className="lg:hidden">
          <FilterMobile />
        </div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </ComponentWrapper>
  );
}

export default App;
