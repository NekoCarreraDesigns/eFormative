import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Seller.css";

const Seller = () => {
  const [user, setUser] = useState({});
  const [items, setItems] = useState([]);

  let navigate = useNavigate();

  function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

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
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (!storedUser) {
      return (
        <div className='alert-div'>
          <h1 className='alert'>User Not Found!</h1>
        </div>
      );
    }

    fetch(`/items?username=`)
      .then((res) => res.json())
      .then((items) => setItems(items));
  }, []);

  return (
    <>
      <div>{user && <h1 className='seller-page-header'>Welcome, !</h1>}</div>
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
      {items?.map((item, displayItem) => (
        <div key={displayItem} className='items-selling-div'>
          <h1 className='items-selling-header'>Items Selling</h1>
          <img alt='sale-item' src='http://placehold.jp/150x150.png'>
            {item.image}
          </img>
          <h3>{item.product}</h3>
          <h3>{item.price}</h3>
        </div>
      ))}
    </>
  );
};

export default Seller;
