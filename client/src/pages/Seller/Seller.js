import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Seller.css";

const Seller = () => {
  const [user, setUser] = useState({});
  const [sellingItems, setSellingItems] = useState([]);
  const [soldItems, setSoldItems] = useState([])
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
    event.preventDefault();
    sessionStorage.removeItem("user");
    navigate("/sell");
    console.log("logged out");
  };

  useEffect(() => {
    const userCookie = getCookie("user");
    if (userCookie) {
      setUser(JSON.parse(userCookie));

      // Fetch items that the user is selling
      const fetchSellingItems = async () => {
        try {
          const response = await axios.get(`/market/items/selling`);
          setSellingItems(response.data);
        } catch (error) {
          console.error("Error fetching selling items data", error);
        }
      };

      // Fetch items that the user has sold
      const fetchSoldItems = async () => {
        try {
          const response = await axios.get(`/market/items/sold`);
          setSoldItems(response.data);
        } catch (error) {
          console.error("Error fetching sold items data", error);
        }
      };

      fetchSellingItems();
      fetchSoldItems();
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
      <button className='clear-btn-green-border post-item-button' onClick={postItemRedirect} aria-label="button to sell items">
        Post an item to sell
      </button>
      <br/>
      <button className='logout-button clear-btn-green-border' aria-label="button to logout of site" onClick={handleLogout}>
        Logout
      </button>

      {sellingItems.length > 0 && (
          <div className='items-selling-div'>
            <h1 className='items-selling-header'>Items For Sale</h1>
            {sellingItems.map((item) => (
              <div key={item.id}>
                <img alt='sale-item' src={item.image} />
                <h3>{item.product}</h3>
                <h3>{item.price}</h3>
              </div>
            ))}
          </div>
        )}
      {soldItems.length > 0 && (
          <div className='items-sold-div'>
            <h1 className='items-sold-header'>Items Sold</h1>
            {soldItems.map((item) => (
              <div key={item.id}>
                <img alt='sale-item' src={item.image} />
                <h3>{item.product}</h3>
                <h3>{item.price}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Seller;
