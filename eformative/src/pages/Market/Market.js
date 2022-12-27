import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Market.css";

const Market = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedItems, setDisplayedItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await axios.get("/market", {
        params: { search: searchTerm },
      });
      setItems(res.data);
    };
    fetchItems();
  }, [searchTerm]);

  const handleSearch = (event) => {
    event.preventDefault();
    const searchBarInput = event.target;
    setSearchTerm(searchBarInput.value);
    setDisplayedItems(
      items.filter((item) => item.product.includes(searchTerm))
    );
  };

  return (
    <>
      <h1 className='market-page-header'>Market</h1>
      <div className='market-filter-div'>
        <div className='market-filter-input-div'>
          <h2 className='market-search-filters-header'>Search Here</h2>
          <form onSubmit={handleSearch}>
            <input
              className='market-filter-input'
              type='text'
              placeholder='search here'
              id='search-bar'
              value={searchTerm}></input>
            <button type='submit'>Search</button>
            <button type='button' onClick={() => setSearchTerm("")}>
              Clear
            </button>
          </form>
        </div>
      </div>
      {displayedItems.length > 0 ? (
        displayedItems.map((item, sellerItem) => (
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
        <div className='alert-div'>
          <p className='alert-paragraph'>
            No results found! Could be a misspelling or it is not there
          </p>
        </div>
      )}
    </>
  );
};

export default Market;
