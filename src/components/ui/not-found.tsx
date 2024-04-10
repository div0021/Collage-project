import { Link } from 'react-router-dom';



const NotFound = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
       <div className='max-w-screen-md w-96 min-w-fit px-5 pt-10 pb-5 shadow-sm shadow-gray-300 bg-green-700 rounded-lg'>

        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-center'>404</h1>
        <p className='text-center'>not found</p>

        <Link to={"/"} className='w-full px-5 py-3 rounded-lg bg-green-200 flex justify-start items-center my-5 gap-x-10 shrink-0 text-lg font-semibold' replace>
        <img src='/brandlogo.png' alt='logo' className='w-20 h-8' />
        Home
        </Link>

       </div>
    </div>
  );
};

export default NotFound;