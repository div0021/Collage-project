import { Outlet } from 'react-router-dom';
import ComponentWrapper from '../component-wrapper';


const AdminProductPage = () => {
  return (
    <div className=''>
        <ComponentWrapper>
          <Outlet />
        </ComponentWrapper>
          
    </div>
  );
};

export default AdminProductPage;