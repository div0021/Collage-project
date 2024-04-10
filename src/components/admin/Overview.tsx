import { Link } from 'react-router-dom';


const Overview = () => {
  return (
    <div className='pt-32 pb-16 min-w-[500px] w-full px-5 md:px-20'>
       <div className="w-full flex justify-start items-end">
        <h1 className='text-3xl md:text-4xl xl:text-6xl font-bold text-green-600 mr-3'>
            Welcome
        </h1>
        <p className='relative -top-1 text-green-600'>to admin section.</p>
       </div>
       <div className="mt-10">

        <p className='w-full md:w-10/12'>The admin section of an e-commerce greenmarket place website is a vital tool for efficiently managing products and categories within the platform. This centralized dashboard empowers authorized administrators to perform essential actions such as creating, updating, and deleting products, as well as managing product categories. In terms of product management, admins can seamlessly add new healthcare items by inputting detailed information like product name, description, price, images, and ingredients where applicable. They also have the flexibility to update existing product details, including prices, descriptions, and images, ensuring accurate and up-to-date information for customers. Furthermore, admins can delete products when necessary, with precautionary measures in place to prevent accidental deletions.</p>

        <Link to={"/admin/products"} className='mt-4 mb-5 text-xl text-green-500 hover:underline w-fit cursor-pointer'>Continue to Product section</Link>
       </div>
       <div className="mt-10">

        <p className='w-full md:w-10/12'>
Regarding categories, the admin page enables the creation of specific product categories tailored to healthcare offerings, such as vitamins, supplements, personal care, and medical devices. Admins can modify category attributes like names and descriptions and delete categories if needed, with considerations for associated products. The admin interface includes comprehensive product listings, displaying key information such as names, categories, prices, and stock availability. Search and filtering functionalities allow admins to quickly locate specific products based on various criteria, enhancing productivity when managing a large inventory.</p>

        <Link to={"/admin/category"} className='mt-4 mb-5 text-xl text-green-500 hover:underline w-fit cursor-pointer'>Continue to Category section</Link>
       </div>
    </div>
  );
};

export default Overview;