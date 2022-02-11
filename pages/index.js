import Image from 'next/image';
import { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import { getData } from '../utils/fetchData';
import ProductItem from '../components/ProductItem';
import { DataContext } from '../store/GlobalState';
import Categories from '../components/Categories';
import Search from '../components/Search';

export default function Home(props) {
  const [products, setProducts] = useState([]);
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

  const productByCategory = (category) => {
    if (category.toLowerCase() === 'all') return setProducts(props.products);

    const filtered = props.products.filter(
      (item) => item.category === category
    );
    setProducts(filtered);
  };

  const searchItems = (str) => {
    if (str.length < 1) return setProducts(props.products);
    const filtered = props.products.filter((item) => {
      console.log(item);
      return item.title?.toLowerCase().includes(str.toLowerCase());
    });
    setProducts(filtered);
  };

  useEffect(() => {
    setProducts(props.products);
  }, []);

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <div className='row'>
        <div className='col-sm-2'>
          <Categories productByCategory={productByCategory} />
        </div>
        <div className='col-sm-10'>
          <div className='text-center'>
            <Search searchItems={searchItems} />
          </div>

          {auth?.user?.role === 'admin' && products?.length > 0 && (
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
          <div className='row'>
            {products?.length === 0 ? (
              <h2>No Products</h2>
            ) : (
              products?.map((product) => {
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
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  const res = await getData('product');

  return {
    props: {
      products: res?.products,
      result: res?.result
    }
  };
}
