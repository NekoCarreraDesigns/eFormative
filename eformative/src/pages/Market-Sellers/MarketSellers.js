import React, { useState, useEffect } from "react";
import "./MarketSellers.css";

const MarketSellers = () => {
  const [searchSellers, setSearchSellers] = useState();

  useEffect(() => {
    fetch("/market/sellers")
      .then((res) => res.json())
      .then((searchSellers) => setSearchSellers(searchSellers));
  });

  return (
    <>
      <h1 className='market-sellers-header'>View Sellers</h1>
      {searchSellers?.map((searchSellers, displaySearchSellers) => (
        <div key={displaySearchSellers}>
          <ul>
            <li>
              <a href='/seller/:id'>{searchSellers.sellerName}</a>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
};

export default MarketSellers;
