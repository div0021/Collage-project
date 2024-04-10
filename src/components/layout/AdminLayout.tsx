import { Navigate, Outlet } from 'react-router-dom';
import {  UserRoles, selectCurrentUser } from '../../app/features/authSlice';
import AdminNavbar from '../admin/AdminNavbar';
import { useAppSelector } from '../../app/hooks';
import ComponentWrapper from '../component-wrapper';


const AdminLayout = () => {

    const user = useAppSelector(selectCurrentUser);

    if(!user || user.role !== UserRoles.ADMIN){
        return <Navigate to={"/"} />
    }

   

  return (
    <div className='w-full min-h-screen'>
        <AdminNavbar name={user.name} />
        <ComponentWrapper>
        <Outlet />
        </ComponentWrapper>
    </div>
  );
};

export default AdminLayout;