import React from 'react';
import { useState, useContext } from 'react';
import { DataContext } from '../store/GlobalState';

function Categories({ productByCategory }) {
  const { state, dispatch } = useContext(DataContext);
  const { categories } = state;

  return (
    <div className='home-categories card m-3 p-2 border-0'>
      <h4 className='text-uppercase'>Categories</h4>
      <ul>
        <li onClick={() => productByCategory('All')}>All</li>
        {categories.map((item) => (
          <li
            key={item._id}
            onClick={() => productByCategory(item.name)}
            className='text-capitalize'
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
