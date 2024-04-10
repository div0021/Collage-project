import { Link } from 'react-router-dom';
import ComponentWrapper from '../component-wrapper';
import Logo from '../logo';

interface AdminNavbarProps {
  // Define your component props here
  name:string
}

const AdminNavbar = ({name}: AdminNavbarProps) => {
  return (
    <nav className='fixed inset-0 w-full h-min z-40 min-w-[600px]'>
       <ComponentWrapper>
        <div className="flex justify-between items-center w-full px-10 py-4 border-b border-gray-400 bg-white" >
        <Logo className="relative -top-2"/>

        {/*  Navbar content */}

        <div className='flex flex-row justify-center items-center space-x-3 '>
        <div className="flex items-center space-x-2">
        <Link className="text-sm text-gray-700 hover:text-gray-800 hover:scale-105 transition-all duration-150 ease-in-out cursor-pointer px-1" to="/admin">
          Home
        </Link>
        <Link className="text-sm text-gray-700 hover:text-gray-800 hover:scale-105 transition-all duration-150 ease-in-out cursor-pointer px-1" to="/admin/category">
          Category
        </Link>
        <Link className="text-sm text-gray-700 hover:text-gray-800 hover:scale-105 transition-all duration-150 ease-in-out cursor-pointer px-1" to="/admin/products">
          Products
        </Link>
        </div>
              </div>

              {/* users */}

              <div
      className="flex items-center p-2 rounded-3xl bg-[#D2E9BB] gap-2 cursor-pointer relative z-10 group"
    >
      <div className="">
        <img src="/avatar.png" alt="user avatar" className="w-6 h-6" />
      </div>

      <div className="opacity-0 absolute px-5 py-3 bg-gray-300 pointer-events-none group-hover:opacity-100 transition-all duration-300 ease-in-out top-0 right-12 text-sm font-medium flex justify-center items-center rounded-lg shrink-0 text-nowrap">
        {name}

      </div>

      </div>

        </div>
       </ComponentWrapper>
    </nav>
  );
};

export default AdminNavbar;