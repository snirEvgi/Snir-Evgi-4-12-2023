import {  Link, useNavigate } from "react-router-dom";
import { IoIosCloudy } from "react-icons/io";const NavBar = () => {

  const links = [
    { label: 'Home', href: '/' },
    { label: 'My Locations', href: '/favorites' },
  ]

  return (
    <nav className='flex space-x-6 z-20 bg-white border-b mb-5 px-5 h-14 items-center'>
      <ul className='flex space-x-6'>
      <Link className=" py-1 scale-150" to="/"><IoIosCloudy  /></Link>
      {links.map(link => 
          <Link 
            key={link.href} 
            className='text-zinc-500 hover:text-zinc-800 transition-colors' 
            to={link.href}>{link.label}</Link>)}
      </ul>
    </nav>
  )
}

export default NavBar