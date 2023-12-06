import {  useNavigate } from "react-router-dom";
import { IoIosCloudy } from "react-icons/io";
import { useAppSelector } from "../../hooks";
import classNames from "classnames";
import ThemeSwitcher from "../themeswitcher";
const NavBar = () => {
  const theme = useAppSelector((state) => state.theme.theme) || "light"
 const navigate = useNavigate()
  const links = [
    { label: 'Home', href: '/' },
    { label: 'My Locations', href: '/favorites' },
  ]

  return (
    <nav className={classNames({
      "flex space-x-6 z-20 bg-white px-5 h-20 items-center":true,
    })}>
      <ul className='flex space-x-6 mt-3'>
      <div className=" py-1 pb-2 scale-150" onClick={()=>navigate("/")}><IoIosCloudy size={20} /></div>
      {links.map(link => 
          <div 
            key={link.href} 
            className='text-zinc-500 hover:text-zinc-800 transition-colors' 
            onClick={()=>navigate(link.href)}>{link.label}</div>)}
            <div className="">
            <ThemeSwitcher/>
            </div>
      </ul>
    </nav>
  )
}

export default NavBar