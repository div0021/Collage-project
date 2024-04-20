import ComponentWrapper from '../component-wrapper';
import Login from '../login';
import Register from '../register';
import PersonalSurveyForm from '../personal-survey-form';
import FilterMobile from '../categories/FilterMobile';
import { Outlet } from 'react-router-dom';
import Footer from '../footer';
import Navbar from '../navbar';
import Profile from '../profile';

const Layout = () => {

  return (
    <ComponentWrapper>
      <div className="w-full relative pt-16 sm:pt-0 md:pt-0">
        <Login />
        <Register />
        <Profile />
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
};

export default Layout;