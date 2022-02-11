import React from 'react';
import { useContext, useState } from 'react';
import { DataContext } from '../store/GlobalState';

function Categories({ productByCategory }) {
  const { state } = useContext(DataContext);
  const { categories } = state;
  const [active, setActive] = useState('All');

  const handleClick = (item) => {
    productByCategory(item.name);
    setActive(item.name);
  };

  return (
    <div className='home-categories card m-3 p-2 border-0'>
      <h4 className='text-uppercase'>Categories</h4>
      <ul>
        <li
          onClick={() => handleClick({ name: 'All' })}
          style={{
            backgroundColor: `${active === 'All' ? ' rgb(216, 216, 216)' : ''}`
          }}
        >
          All
        </li>
        {categories.map((item) => (
          <li
            key={item._id}
            onClick={() => handleClick(item)}
            className='text-capitalize'
            style={{
              backgroundColor: `${
                active === item.name ? 'rgb(216, 216, 216) ' : ''
              }`
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
