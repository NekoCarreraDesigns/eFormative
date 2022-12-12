import React, { useState, useEffect } from "react";
import "./MarketPrice.css";

const MarketPrice = () => {
  const [price, setPrice] = useState();
  return (
    <>
      <h1>View by price</h1>
      {price?.map((price, displayPrice) => (
        <div key={displayPrice}>
          <ul>
            <li>{price.price}</li>
          </ul>
        </div>
      ))}
    </>
  );
};
