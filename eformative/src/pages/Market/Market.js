import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Market.css";

const priceFilter = () => {
  const priceFilterSearchInput = document.getElementById("price-search-bar");
  axios.get("/market/price", { price: priceFilterSearchInput.value });
  console.log("clicked");
};

const sellerFilter = () => {
  const sellerFilterSearchInput = document.getElementById("seller-search-bar");
  axios.get("/market/sellers", { sellerName: sellerFilterSearchInput.value });
  console.log("clicked");
};

const Market = () => {
  let navigate = useNavigate();
  const [items, setItems] = useState();

  const productFilter = (data) => {
    const productFilterSearchInput =
      document.getElementById("product-search-bar");
    axios
      .get("/market/products", {
        productName: productFilterSearchInput.value,
      })
      .then((res) => res.json(data))
      .then(() => {
        navigate("/market/products/search");
      });
    console.log("clicked");
  };
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
            placeholder='search by seller'
            id='seller-search-bar'></input>
          <button onClick={sellerFilter}>Seller Search</button>
          <input
            className='market-filter-input'
            type='text'
            placeholder='search by product'
            id='product-search-bar'></input>
          <button onClick={productFilter}>Product Search</button>
          <input
            className='market-filter-input'
            type='text'
            placeholder='search by price'
            id='price-search-bar'></input>
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
