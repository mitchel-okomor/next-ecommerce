import React, { useContext, useState } from 'react';
import { DataContext } from '../store/GlobalState';
import { addToCart } from '../store/Actions';
import Image from 'next/image';

import Link from 'next/link';

function ProductItem({ product, handleCheck }) {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth, products } = state;

  const userLink = () => {
    return (
      <>
        <Link href={`product/${product._id}`}>
          <a className='btn btn-info' style={{ marginRight: '5px', flex: 1 }}>
            View
          </a>
        </Link>
        <button
          className='btn btn-success'
          style={{ marginLeft: '5px', flex: 1 }}
          disabled={product.inStock === 0 ? true : false}
          onClick={() => {
            dispatch(addToCart(product, cart));
          }}
        >
          Buy
        </button>
      </>
    );
  };

  const adminLink = () => {
    return (
      <>
        <Link href={`create/${product._id}`}>
          <a className='btn btn-info' style={{ marginRight: '5px', flex: 1 }}>
            Edit
          </a>
        </Link>
        <button
          className='btn btn-danger'
          style={{ marginLeft: '5px', flex: 1 }}
          data-toggle='modal'
          data-target='#exampleModal'
          onClick={() =>
            dispatch({
              type: 'ADD_MODAL',
              payload: [
                {
                  data: '',
                  id: product._id,
                  title: product.title,
                  type: 'DELETE_PRODUCT'
                }
              ]
            })
          }
        >
          Delete
        </button>
      </>
    );
  };

  if (!auth.user)
    return (
      <div className='product-item card  col-md-3 m-3 p-2'>
        <Image
          className='card-img-top'
          src={product.images[0].url}
          alt='prodcut'
          style={{ objectFit: 'fill' }}
          width={100}
          height={200}
        />

        <div className='card-body'>
          <h5 className='card-title text-capitalize' title={product.title}>
            {product.title}
          </h5>
          <div className='row justify-content-between mx-0'>
            <h6 className='text-danger'>${product.price}</h6>
            {product.inStock > 0 ? (
              <h6 className='text-danger'>In Stock: {product.inStock}</h6>
            ) : (
              <h6 className='text-danger'>Out of Stck</h6>
            )}
          </div>

          <div className='row justify-content-between mx-0'>{userLink()}</div>
        </div>
      </div>
    );
  return (
    <div className='card  col-md-3 m-3 p-2'>
      {auth.user.role === 'admin' && (
        <input
          type='checkbox'
          checked={product.checked}
          onChange={() => handleCheck(product._id)}
          className='position-absolute'
          style={{ height: '30px', width: '30px' }}
        />
      )}
      <Image
        className='card-img-top'
        src={product.images[0].url}
        alt='prodcut'
        style={{
          objectFit: 'fill'
        }}
        layout='fill'
        width={100}
        height={200}
      />

      <div className='card-body'>
        <h5 className='card-title text-capitalize' title={product.title}>
          {product.title}
        </h5>
        <div className='row justify-content-between mx-0'>
          <h6 className='text-danger'>${product.price}</h6>
          {product.inStock > 0 ? (
            <h6 className='text-danger'>In Stock: {product.inStock}</h6>
          ) : (
            <h6 className='text-danger'>Out of Stck</h6>
          )}
        </div>
        <p
          className='card-text'
          style={{
            height: '5rem',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
          }}
        >
          {product.description}
        </p>
        <div className='row justify-content-between mx-0'>
          {auth.user.role === 'admin' ? adminLink() : userLink()}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
