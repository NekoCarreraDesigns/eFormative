import React, { useState, useEffect } from "react";
import "./MarketPrice.css";

const MarketPrice = () => {
  const [price, setPrice] = useState();

  useEffect(() => {
    fetch("/market")
      .then((res) => res.json())
      .then((price) => setPrice(price));
  });

  return (
    <>
      <h1 className='market-price-header'>View by price</h1>
      {price?.map((price, displayPrice) => (
        <div key={displayPrice}>
          <a href='/item/:id'>
            {price.price} {price.product}
          </a>
        </div>
      ))}
    </>
  );
};

export default MarketPrice;
