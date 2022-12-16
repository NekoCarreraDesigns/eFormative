import React, { useState, useEffect } from "react";
import "./MarketProducts.css";

const MarketProducts = () => {
  const [product, setProduct] = useState();

  useEffect(() => {
    fetch("/market/products")
      .then((res) => res.json())
      .then((product) => setProduct(product));
  });

  return (
    <>
      <h1 className='market-product-header'>View Products</h1>
      {product?.map((product, displayProduct) => (
        <div key={displayProduct}>
          <img alt='product' src='http://placehold.jp/150x150.png'></img>
          <a className='product-link' href='/item/:id'>
            {product.product}
            {"   "}
            {product.price}
          </a>
        </div>
      ))}
    </>
  );
};

export default MarketProducts;
