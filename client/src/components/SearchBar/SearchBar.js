import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm.toLowerCase());
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className='market-filter-input-div'>
      <input
        className='market-filter-input'
        type='text'
        placeholder='What are you looking for?'
        id='search-bar'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='market-button-container'>
        <button className='search-button clear-btn-sm' onClick={handleSearch}>
          Search
        </button>
        <button className='clear-button clear-btn-sm' onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
