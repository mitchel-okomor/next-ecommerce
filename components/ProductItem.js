import React, { useContext, useState } from "react";
import { DataContext } from "../store/GlobalState";
import { addToCart } from "../store/Actions";

import Link from "next/link";

function ProductItem({ product }) {
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;

  const userLink = () => {
    return (
      <>
        <Link href={`product/${product._id}`}>
          <a className="btn btn-info" style={{ marginRight: "5px", flex: 1 }}>
            View
          </a>
        </Link>
        <button
          className="btn btn-success"
          style={{ marginLeft: "5px", flex: 1 }}
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
  return (
    <div className="card " style={{ width: "18rem" }}>
      <img className="card-img-top" src={product.images[0].url} alt="prodcut" />
      <div className="card-body">
        <h5 className="card-title text-capitalise" title={product.title}>
          {product.title}
        </h5>
        <div className="row justify-content-between mx-0">
          <h6 className="text-danger">${product.price}</h6>
          {product.inStock > 0 ? (
            <h6 className="text-danger">In Stock: {product.inStock}</h6>
          ) : (
            <h6 className="text-danger">Out of Stck</h6>
          )}
        </div>
        <p className="card-text">{product.description}</p>
        <div className="row justify-content-between mx-0">{userLink()}</div>
      </div>
    </div>
  );
}

export default ProductItem;
