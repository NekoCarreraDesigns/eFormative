import React, { useState, useEffect } from "react";
import "./MarketProducts.css";

const MarketProducts = () => {
  const [product, setProduct] = useState();

  useEffect(() => {
    fetch("/market")
      .then((res) => res.json())
      .then((product) => setProduct(product));
  });

  return (
    <>
      <h1 className='market-product-header'>View Products</h1>
      {product?.map((product, displayProduct) => (
        <div key={displayProduct}>
          <a href='/item/:id'>
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
