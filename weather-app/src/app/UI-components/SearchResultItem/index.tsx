import React from "react"
import classNames from "classnames"

interface SearchResultItemProps {
  result: any | {}
  handleSelectCountry: (result:any) => void
}
const SearchResultItem = ({
  result,
  handleSelectCountry,
}: SearchResultItemProps) => {
  const theme = localStorage.getItem("theme")

  return (
    <li
      onClick={() => handleSelectCountry(result)}
      key={result.Key}
      className={classNames({
        "px-4 py-2 cursor-pointer": true,
        "hover:bg-gray-600 text-white": theme === "dark",
        "hover:bg-gray-100 text-black": theme === "light",
      })}
    >
      <div className="flex ml-1 items-center justify-between">
        <div className="">
          <p className="font-bold">{result.LocalizedName}</p>
          <p className="text-sm">
            <span className="font-semibold">Country:</span>{" "}
            {result.Country.LocalizedName}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Region:</span>{" "}
            {result.AdministrativeArea.LocalizedName}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Type:</span> {result.Type}
          </p>
        </div>
        <div className="text-sm">
          <span className="font-semibold">Country ID:</span> {result.Key}
        </div>
      </div>
    </li>
  )
}

export default SearchResultItem
