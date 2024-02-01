
import { Rating } from '@material-tailwind/react'
import ComponentWrapper from './components/component-wrapper'
import LandingSection from './components/landing-section'
import Login from './components/login'
// import Modal from './components/modal'
import Navbar from './components/navbar'
import Register from './components/register'

function App() {

  return (
    <ComponentWrapper>
    <div className="w-full relative pt-16 sm:pt-0 md:pt-0">
             {/* <Modal actionLabel='Update' footer="" isOpen={true} onClose={()=>{}} onSubmit={()=>{}} title='Your profile'/> */}
             <Login />
             <Register />
             <Navbar />
            <LandingSection />
            <div className='w-full'>
              <div className='w-full flex justify-center items-center text-center mt-10'>
                <div className='space-y-1.5'>
                <p className='text-sm font-bold text-[#679F0A]'>Exclusive products</p>

<h2 className='text-4xl font-semibold'>Top Products</h2>
                </div>
                  
              </div>
            </div>
              <div className='m-10'>
                <div className='w-full h-full'>
                  <div className='flex flex-wrap gap-4 px-2'>
                        
                        <div className='w-64 cursor-pointer hover:shadow-sm hover:shadow-gray-400 hover:-translate-y-1 transition-all duration-300 ease-in-out h-auto relative rounded-xl hover:border-gray-400 border-2 pt-5'>
                          <img src="./patajali.png" className='h-44 md:h-52 lg:h-64 object-cover mx-auto'/>

                          <div className='p-5 px-12'>
                            <p className='truncate text-lg font-semibold'>Loose Leaf Tea</p>
                            <div className='flex space-x-1 font-bold'>
                              <p className='line-through text-gray-400/90'>$80.00</p>
                              <p>$50.00</p>

                            </div>

                            <Rating value={4} readonly className='mt-2'/>
                            

                          </div>
                          
                        </div>
                        <div className='w-64 cursor-pointer hover:shadow-sm hover:shadow-gray-400 hover:-translate-y-1 transition-all duration-300 ease-in-out h-auto relative rounded-xl hover:border-gray-400 border-2 pt-5'>
                          <img src="./patajali.png" className='h-44 md:h-52 lg:h-64 object-cover mx-auto'/>

                          <div className='p-5 px-12'>
                            <p className='truncate text-lg font-semibold'>Loose Leaf Tea</p>
                            <div className='flex space-x-1 font-bold'>
                              <p className='line-through text-gray-400/90'>$80.00</p>
                              <p>$50.00</p>

                            </div>

                            <Rating value={4} readonly className='mt-2'/>
                            

                          </div>
                          
                        </div>
                        <div className='w-64 cursor-pointer hover:shadow-sm hover:shadow-gray-400 hover:-translate-y-1 transition-all duration-300 ease-in-out h-auto relative rounded-xl hover:border-gray-400 border-2 pt-5'>
                          <img src="./patajali.png" className='h-44 md:h-52 lg:h-64 object-cover mx-auto'/>

                          <div className='p-5 px-12'>
                            <p className='truncate text-lg font-semibold'>Loose Leaf Tea</p>
                            <div className='flex space-x-1 font-bold'>
                              <p className='line-through text-gray-400/90'>$80.00</p>
                              <p>$50.00</p>

                            </div>

                            <Rating value={4} readonly className='mt-2'/>
                            

                          </div>
                          
                        </div>
                        <div className='w-64 cursor-pointer hover:shadow-sm hover:shadow-gray-400 hover:-translate-y-1 transition-all duration-300 ease-in-out h-auto relative rounded-xl hover:border-gray-400 border-2 pt-5 start-1'>
                          <img src="./patajali.png" className='h-44 md:h-52 lg:h-64 object-cover mx-auto'/>

                          <div className='p-5 px-12'>
                            <p className='truncate text-lg font-semibold'>Loose Leaf Tea</p>
                            <div className='flex space-x-1 font-bold'>
                              <p className='line-through text-gray-400/90'>$80.00</p>
                              <p>$50.00</p>

                            </div>

                            <Rating value={4} readonly className='mt-2'/>
                            

                          </div>
                          
                        </div>
                       
                  </div>
                </div>
              </div>
             
      
    </div>
    </ComponentWrapper>
      
  )
}

export default App
