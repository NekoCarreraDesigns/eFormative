import React from "react";
import { useNavigate } from "react-router-dom";
import "./Seller.css";

let seller = "Candace";

const Seller = () => {
  let navigate = useNavigate();
  const postItemRedirect = () => {
    let postItemPath = `/post-item`;
    navigate(postItemPath);
  };
  return (
    <>
      <h1 className='seller-page-header'>Welcome {seller}</h1>
      <button className='post-item-button' onClick={postItemRedirect}>
        Post an item to sell
      </button>
      <div className='items-sold-div'>
        <h1 className='items-sold-header'>Items Sold</h1>
        <img alt='item' placeholder='100x100'></img>
      </div>
      <div className='items-selling-div'>
        <h1 className='items-selling-header'>Items Selling</h1>
        <img alt='sale-item' placeholder='100x100'></img>
      </div>
    </>
  );
};

export default Seller;
