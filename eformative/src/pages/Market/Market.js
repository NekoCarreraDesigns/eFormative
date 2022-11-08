import React, { useState, useEffect } from "react";
import "./Market.css";

const priceFilter = () => {
  console.log("clicked");
};

const productFilter = () => {
  console.log("clicked");
};

const sellerFilter = () => {
  console.log("clicked");
};

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
      <div className='market-filter-div'>
        <div className='market-filter-input-div'>
          <h2 className='market-search-filters-header'>Search filters</h2>
          <input
            className='market-filter-input'
            type='text'
            placeholder='search by seller'></input>
          <button onClick={sellerFilter}>Seller Search</button>
          <input
            className='market-filter-input'
            type='text'
            placeholder='search by product'></input>
          <button onClick={productFilter}>Product Search</button>
          <input
            className='market-filter-input'
            type='text'
            placeholder='search by price'></input>
          <button onClick={priceFilter}>Price Search</button>
        </div>
      </div>
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
