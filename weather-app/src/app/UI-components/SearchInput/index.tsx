import classNames from "classnames"
import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from "react"
import { IoSearch } from "react-icons/io5"
import { useDebounce } from "../../useDebunce"

interface SearchInputProps {
  referral: any
  handleSearch: (inputText: string) => void
}

const SearchInput = ({ referral, handleSearch }: SearchInputProps) => {
  const theme = localStorage.getItem("theme") || "light"
  const [searchInputText, setSearchInputText] = useState<string>("")
  const debounce = useDebounce(searchInputText)
  const clearSearchInput = () => {
    setSearchInputText("")
  }


  const handleChange = (e: any) => {
    setSearchInputText(e.target.value)

  }

  const handleKeyDown = (e: any) => {
    if (e.code === "Enter") {
      handleSearch(searchInputText)
      clearSearchInput()
    }
  }

  const handleClick = () => {
    handleSearch(searchInputText)
    clearSearchInput()
  }
useEffect(() => {

handleSearch(debounce)

  
},[debounce])
  return (
    <div className="flex min-w-[315px] w-full">
      <input
        ref={referral}
        value={searchInputText}
        onChange={handleChange}
        type="text"
        className={classNames({
          "flex-grow h-12 duration-300 ease-in transition-colors rounded-l-lg focus:shadow-outline focus:outline-none bg-transparent":
            true,
          "bg-gray-800 text-white": theme === "dark",
          "bg-white text-black": theme === "light",
        })}
        placeholder="Search Any Place..."
        onKeyDown={handleKeyDown}
        
      />
      <div
        className="flex items-center justify-center border-l cursor-pointer px-4 bg-gray-200 rounded-r-lg"
        onClick={handleClick}
      >
        <IoSearch className="text-gray-600 dark:text-white" />
      </div>
    </div>
  )
}

export default SearchInput
