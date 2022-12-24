import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Market.css";

const Market = () => {
  const [items, setItems] = useState([]);

  const search = () => {
    const sellerFilterSearchInput =
      document.getElementById("seller-search-bar");
    const productFilterSearchInput =
      document.getElementById("product-search-bar");
    const priceFilterSearchInput = document.getElementById("price-search-bar");
    const searchParams = {
      sellerName: sellerFilterSearchInput.value,
      product: productFilterSearchInput.value,
      price: priceFilterSearchInput.value,
    };

    axios
      .get("/market", { params: searchParams })
      .then((res) => setItems(res.data))
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    search();
  });

  return (
    <>
      <h1 className='market-page-header'>Market</h1>
      <div className='market-filter-div'>
        <div className='market-filter-input-div'>
          <h2 className='market-search-filters-header'>Search filters</h2>
          <input
            className='market-filter-input'
            type='text'
            placeholder='search by seller'
            id='seller-search-bar'></input>
          <button onClick={search}>Seller Search</button>
          <input
            className='market-filter-input'
            type='text'
            placeholder='search by product'
            id='product-search-bar'></input>
          <button onClick={search}>Product Search</button>
          <input
            className='market-filter-input'
            type='text'
            placeholder='search by price'
            id='price-search-bar'></input>
          <button onClick={search}>Price Search</button>
        </div>
      </div>
      {items.length > 0 ? (
        items.map((item, sellerItem) => (
          <div className='item-card' key={sellerItem}>
            <div className='item'>
              <h1 className='item-seller-header'>{item.sellerName}</h1>
              <h2 className='item-product-header'>{item.product}</h2>
              <h3 className='item-price-header'>{item.price}</h3>
              <img alt='product' src='http://placehold.jp/150x150.png'></img>
              <p className='item-description-paragraph'>{item.description}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No results found</p>
      )}
    </>
  );
};

export default Market;
