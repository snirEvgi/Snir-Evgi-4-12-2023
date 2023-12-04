import { IoSearch } from "react-icons/io5";
const HomePage = () => {
  return (
    <div className='flex justify-center items-center'>
<div className=" ">
      <div className=" flex justify-center items-center px-4 sm:px-6 lg:px-8">
           <div className="relative">
             <input type="text" className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search anything..."/>
          
          <div className="absolute top-4 right-3 border-l py-2">
            <i className="text-gray-400 z-20 hover:text-gray-500"><IoSearch/> </i>
          </div>
        </div>       
    </div>
</div>
    </div>
  )
}

export default HomePage