import React, { useState, useEffect } from "react";
import "./Market.css";

const Market = () => {
  const [items, setItems] = useState();

  useEffect(() => {
    fetch("/market")
      .then((res) => res.json())
      .then((items) => setItems(items));
  });

  return (
    <>
      <h1 className='market-page-header'>Market</h1>;
      {items?.map((item, sellerItem) => (
        <div key={sellerItem}>
          <h1 className='item-header'>
            {" "}
            Seller: {item.sellerName}, Product: {item.product}
          </h1>
          <div>
            <h3 className='item-price-header'>{item.price}</h3>
            <img alt='product' src='http://placehold.jp/150x150.png'></img>
          </div>
          <p className='item-description-paragraph'>{item.description}</p>
        </div>
      ))}
    </>
  );
};

export default Market;
