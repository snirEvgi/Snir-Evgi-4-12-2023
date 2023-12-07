import React, { useRef } from 'react';
import classNames from 'classnames';
import SearchResultItem from '../SearchResultItem';
interface SearchResultsListProps {
    autoCompleteResults: Array<any> | []
    theme: string
    handleSelectCountry: any
  }
const SearchResultsList = ({ autoCompleteResults, theme, handleSelectCountry }:any) => {
   

  return (
    <div 
    className={classNames({
        'max-h-[20rem] w-full ml-[2px]   min-w-[345px] overflow-auto transition-max-height duration-300 ease-in-out': true,
        
      })}>
      <ul
        className={classNames({
          'divide-y rounded-xl': true,
          'bg-gray-800 divide-gray-700  text-white': theme === 'dark',
          'bg-white divide-gray-200  text-black': theme === 'light',
        })}
      >
        {autoCompleteResults?.map((result:any) => (
          <SearchResultItem
            key={result.Key}
            result={result}
            theme={theme}
            handleSelectCountry={handleSelectCountry}
          />
        ))}
      </ul>
    </div>
  );
};

export default SearchResultsList;
