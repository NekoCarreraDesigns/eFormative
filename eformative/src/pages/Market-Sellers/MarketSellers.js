import React, { useState, useEffect } from "react";
import "./MarketSellers.css";

const MarketSellers = () => {
  const [searchSellers, setSearchSellers] = useState();

  useEffect(() => {
    fetch("/market")
      .then((res) => res.json())
      .then((searchSellers) => setSearchSellers(searchSellers));
  });

  return (
    <>
      <h1 className='market-sellers-header'>View Sellers</h1>
      {searchSellers?.map((searchSellers, displaySearchSellers) => (
        <div key={displaySearchSellers}>
          <a href='/seller/:id'>{searchSellers.sellerName}</a>
        </div>
      ))}
    </>
  );
};

export default MarketSellers;
