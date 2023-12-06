import classNames from 'classnames'
import React from 'react'
import { IoSearch } from "react-icons/io5"

const SearchInput = (props:{ referral:any,handleSearch:any}) => {
  const theme = localStorage.getItem("theme")||"light"

  return (
    <div className="flex min-w-[325px] w-full">
    <input
      ref={props?.referral}
      type="text"
      className={classNames({
        "flex-grow h-12 pr-8 pl-5  rounded-l-lg focus:shadow-outline focus:outline-none bg-transparent ":
          true,
        " bg-gray-800 text-white": theme === "dark",
        " bg-white text-black": theme === "light",
      })}
      placeholder="Search Any Place..."
      onChange={props.handleSearch}
    />
    <div
      className="flex items-center justify-center border-l cursor-pointer px-4 bg-gray-200 dark:bg-gray-600 rounded-r-lg"

    >
      <IoSearch className="text-gray-600 dark:text-white" />
    </div>
  </div>
  )
}

export default SearchInput