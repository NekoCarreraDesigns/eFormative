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
        <div className='item-card' key={sellerItem}>
          <div className='item'>
            <h1 className='item-seller-header'>{item.sellerName}</h1>
            <h2 className='item-product-header'>{item.product}</h2>
            <h3 className='item-price-header'>{item.price}</h3>
            <img alt='product' src='http://placehold.jp/150x150.png'></img>
            <p className='item-description-paragraph'>{item.description}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Market;
