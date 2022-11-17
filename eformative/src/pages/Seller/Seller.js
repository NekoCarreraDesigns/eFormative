import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Seller.css";

const Seller = () => {
  const [user, setUser] = useState(null);
  let navigate = useNavigate();
  const postItemRedirect = () => {
    let postItemPath = `/post-item`;
    navigate(postItemPath);
  };

  useEffect(() => {
    fetch("/user/:id")
      .then((res) => res.json())
      .then((user) => setUser(user))
      .catch((err) => console.log(err));
  });

  return (
    <>
      {user?.map((user, userDisplay) => (
        <h1 key={userDisplay} className='seller-page-header'>
          Welcome {user.username}
        </h1>
      ))}
      <button className='post-item-button' onClick={postItemRedirect}>
        Post an item to sell
      </button>
      <div className='items-sold-div'>
        <h1 className='items-sold-header'>Items Sold</h1>
        <img alt='item' src='http://placehold.jp/150x150.png'></img>
      </div>
      <div className='items-selling-div'>
        <h1 className='items-selling-header'>Items Selling</h1>
        <img alt='sale-item' src='http://placehold.jp/150x150.png'></img>
      </div>
    </>
  );
};

export default Seller;
