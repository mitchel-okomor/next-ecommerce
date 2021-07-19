import Image from 'next/image';
import { useState, useContext } from 'react';
import Head from 'next/head';
import { getData } from '../utils/fetchData';
import ProductItem from '../components/ProductItem';
import { DataContext } from '../store/GlobalState';

export default function Home(props) {
  const [products, setProducts] = useState(props.products);
  const [isCheck, setIsCheck] = useState(false);
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  const handleCheckAll = () => {
    if (!isCheck) {
      products.forEach((product) => {
        product.checked = true;
      });
    } else {
      products.forEach((product) => {
        product.checked = false;
      });
    }

    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const handleDelete = () => {
    let deleteArr = [];
    products.forEach((product) => {
      if (product.checked) {
        deleteArr.push({
          data: '',
          id: product._id,
          title: 'Delete selected products?',
          type: 'DELETE_PRODUCT'
        });
      }
    });

    dispatch({ type: 'ADD_MODAL', payload: deleteArr });
  };

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      {auth?.user?.role === 'admin' && (
        <div
          className='delete_all_btn btn btn-danger my-2'
          style={{ marginBottom: '-10px' }}
        >
          <input
            type='checkbox'
            checked={isCheck}
            onChange={handleCheckAll}
            style={{
              width: '25px',
              height: '25px',
              transform: 'translateY(8px)'
            }}
          />
          <button
            data-toggle='modal'
            data-target='#exampleModal'
            className='btn btn-danger'
            onClick={handleDelete}
          >
            DELETE ALL
          </button>
        </div>
      )}
      {products.length === 0 ? (
        <h2>No Products</h2>
      ) : (
        products.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              handleCheck={handleCheck}
            />
          );
        })
      )}
    </div>
  );
}
export async function getServerSideProps() {
  const res = await getData('product');
  return {
    props: {
      products: res.products,
      result: res.result
    }
  };
}
