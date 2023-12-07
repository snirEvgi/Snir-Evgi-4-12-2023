import React, { useRef } from 'react';
import classNames from 'classnames';
import SearchResultItem from '../SearchResultItem';
interface SearchResultsListProps {
    autoCompleteResults:any
    handleSelectCountry: any
  }
const SearchResultsList = ({ autoCompleteResults,  handleSelectCountry }:SearchResultsListProps) => {
   
    const theme = localStorage.getItem("theme")

  return (
    <div className="max-h-[20rem]  w-full ml-[4px] min-w-[350px] overflow-auto transition-max-height duration-300 ease-in-out rounded-2xl z-10">
    <ul
      className={classNames({
        "divide-y duration-500 ease-in  transition-colors rounded-xl": true,
        "bg-gray-800 divide-gray-700 opacity-95 text-white": theme === "dark",
        "bg-white opacity-70 divide-gray-200 text-black": theme === "light",
      })}
    >
      {autoCompleteResults?.map((result: any) => (
        <SearchResultItem key={result.Key} result={result} handleSelectCountry={handleSelectCountry} />
      ))}
    </ul>
  </div>
  );
};

export default SearchResultsList;
