import React, { useState, useContext } from 'react';
import Head from 'next/head';
import { getData } from '../../utils/fetchData';
import { DataContext } from '../../store/GlobalState';
import { addToCart } from '../../store/Actions';
import Image from 'next/image';

function DetailProduct(props) {
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;

  const [product] = useState(props.product);
  const [tab, setTab] = useState(0);
  //const imgRef = useRef();

  const isActive = (index) => {
    if (tab === index) return 'active';
    return '';
  };
  //   useEffect(() => {
  //     const images = imgRef.current.children;
  //     for (let i = 0; i < images.length; i++) {
  //       images[i].className = images[i].className.replace(
  //         "active",
  //         "img-thumbnail rounded"
  //       );
  //     }
  //     images[tab].className = "img-thumbnail rounded active";
  //   }, [tab]);
  return (
    <div className='detail_page'>
      <Head>
        <title>Product details</title>
      </Head>
      <div className='row'>
        <div className=' col-md-6 '>
          <Image
            src={product.images[tab].url}
            alt={product.images[tab].url}
            className='d-block img-thumbnail rounded mt-4 w-100 '
            style={{ height: '350px', objectFit: 'scale-down' }}
            width={500}
            height={500}
            layout='fill'
          />
          <div
            className='row mx-0 my-2'
            // ref={imgRef}
          >
            {product.images.map((img, index) => (
              <Image
                key={index}
                src={img.url}
                alt={img.url}
                className={` rounded mx-1 ${isActive(index)}`}
                style={{
                  height: '80px',
                  width: '20%',
                  cursor: 'pointer',
                  objectFit: 'contain'
                }}
                onClick={() => setTab(index)}
                width={500}
                height={500}
                layout='fill'
              />
            ))}
          </div>
        </div>
        <div className='col-md-6'>
          <h2 className='text-uppercase'>{product.title}</h2>
          <h5 className='text-danger'>${product.price}</h5>
          <div className='row mx-0 d-flex justify-content-between'>
            {product.inStock > 0 ? (
              <h6 className='text-danger'> In Stock: {product.inStock}</h6>
            ) : (
              <h6 className='text-danger'> Out of Stock</h6>
            )}
            <h6 className='text-danger'> Sold: {product.sold}</h6>
          </div>
          <div className='my-2'> {product.description} </div>
          <div className='my-2'> {product.content} </div>
          <button
            type='button'
            className='btn btn-dark d-block my-3 px-5'
            disabled={product.inStock === 0 ? true : false}
            onClick={() => {
              dispatch(addToCart(product, cart));
            }}
          >
            {' '}
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const res = await getData('product/' + id);
  console.log(res);

  return {
    props: {
      product: res.product
    }
  };
}

export default DetailProduct;
