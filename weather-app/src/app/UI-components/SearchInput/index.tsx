import classNames from 'classnames'
import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5"
interface SearchInputProps {
    referral:any
    handleSearch: any
  }
const SearchInput = ({ referral,handleSearch}:SearchInputProps) => {
  const theme = localStorage.getItem("theme")||"light"
  const [searchInputText, setSearchInputText] = useState<string>("")

  return (
    <div className="flex  min-w-[325px] w-full ">
    <input
      ref={referral}
      value={searchInputText}
      onChange={(e)=>setSearchInputText(e.target.value)}
      type="text"
      className={classNames({
        "flex-grow h-12 pr-8 pl-5  ml-1 rounded-l-lg focus:shadow-outline focus:outline-none bg-transparent ":
          true,
        " bg-gray-800 text-white": theme === "dark",
        " bg-white text-black": theme === "light",
      })}
      placeholder="Search Any Place..."
      onKeyDown={(e)=> e.code==="Enter" && handleSearch(searchInputText)}

    />
    <div
      className="flex items-center justify-center border-l cursor-pointer px-4 bg-gray-200  rounded-r-lg"
      onClick={() =>handleSearch(searchInputText)}

    >
      <IoSearch className="text-gray-600 dark:text-white" />
    </div>
  </div>
  )
}

export default SearchInput