import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Sell";
import { useNavigate } from "react-router-dom";
import "./Seller.css";

const Seller = () => {
  const [user, setUser] = useState({});
  const userData = useContext(UserContext);
  let navigate = useNavigate();

  const postItemRedirect = () => {
    let postItemPath = `/post-item`;
    navigate(postItemPath);
  };

  const handleLogout = (event) => {
    setUser({});
    navigate("/sell");
    console.log("logged out");
  };

  useEffect(() => {
    if (user) {
      fetch(`/user?username=${user}`)
        .then((res) => res.json())
        .then((user) => setUser(user));
    }
  }, [user]);

  const storedUser = JSON.parse(sessionStorage.getItem("user"));

  return (
    <>
      <div>
        {storedUser &&
          Object.values(userData).map((user, displayUser) => (
            <h1 key={displayUser} className='seller-page-header'>
              Welcome, {user.fullName}!
            </h1>
          ))}
      </div>
      <button className='post-item-button' onClick={postItemRedirect}>
        Post an item to sell
      </button>
      <button className='logout-button' onClick={handleLogout}>
        Logout
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
