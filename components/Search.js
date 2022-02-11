import React from 'react';

function Search({ searchItems }) {
  return (
    <div className='search d-flex justify-content-center'>
      <input
        className='form-control mr-sm-2'
        aria-label='Search'
        type='search'
        placeholder='Search..'
        onChange={(e) => searchItems(e.target.value)}
      />
    </div>
  );
}

export default Search;
