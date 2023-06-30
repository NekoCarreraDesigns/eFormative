import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Seller.css";

const Seller = (props) => {
  const [user, setUser] = useState({});
  const [items, setItems] = useState([]);
  let navigate = useNavigate();

  const SellerWrapper = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    return <Seller user={user} />;
  };

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
    event.preventDefault();
    sessionStorage.removeItem("user");
    navigate("/sell");
    console.log("logged out");
  };

  useEffect(() => {
    const userCookie = getCookie("user");
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, []);

  return (
    <>
      <div className='hero-section'>
        <div>
          {user && (
            <h1 className='seller-page-header'>Welcome {user.firstName}!</h1>
          )}
        </div>
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
      {items &&
        items.map((item, displayItem) => (
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
