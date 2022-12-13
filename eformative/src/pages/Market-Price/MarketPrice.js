import React, { useState, useEffect } from "react";
import "./MarketPrice.css";

const MarketPrice = () => {
  const [price, setPrice] = useState();

  useEffect(() => {
    fetch("/market/products")
      .then((res) => res.json())
      .then((price) => setPrice(price));
  });

  return (
    <>
      <h1 className='market-price-header'>View by price</h1>
      {price?.map((price, displayPrice) => (
        <div key={displayPrice}>
          <ul>
            <li>{price.price}</li>
            <li>{price.productName}</li>
          </ul>
        </div>
      ))}
    </>
  );
};

export default MarketPrice;
