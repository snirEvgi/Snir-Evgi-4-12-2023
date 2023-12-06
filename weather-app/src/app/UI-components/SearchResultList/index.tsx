import React from 'react';
import classNames from 'classnames';
import SearchResultItem from '../SearchResultItem';

const SearchResultsList = ({ autoCompleteResults, theme, handleSelectCountry }:any) => {
  return (
    <div className="max-h-40 overflow-auto">
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
