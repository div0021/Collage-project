import { Outlet } from 'react-router-dom';
import ComponentWrapper from '../component-wrapper';

interface AdminProductPageProps {
  // Define your component props here
}

const AdminProductPage = ({}: AdminProductPageProps) => {
  return (
    <div className=''>
        <ComponentWrapper>
          <Outlet />
        </ComponentWrapper>
          
    </div>
  );
};

export default AdminProductPage;