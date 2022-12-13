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
          <ul>
            <li>{product.productName}</li>
            <li>{product.price}</li>
          </ul>
        </div>
      ))}
    </>
  );
};

export default MarketProducts;
