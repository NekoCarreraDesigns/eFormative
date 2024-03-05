import {React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardMedia,
  Typography,
  CardContent
} from "@mui/material";
import axios from "axios";
import "./Seller.css";

const Seller = () => {
  const [users, setUser] = useState({});
  const [sellingItems, setSellingItems] = useState([]);
  const [soldItems, setSoldItems] = useState([])
  let navigate = useNavigate();
  
  const postItemRedirect = () => {
    let postItemPath = `/post-item`;
    navigate(postItemPath);
  };
  
  const handleLogout = (event) => {
    event.preventDefault();
    sessionStorage.removeItem("users");
    navigate("/sell");
    console.log("logged out");
  };


  useEffect(() => {
    function getCookie(name) {
      const cookieName = name + "=";
      const cookieArray = document.cookie.split(';');
      for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
          return cookie.substring(cookieName.length, cookie.length);
        }
      }
      return null; // Cookie not found
    }
  
    // Log all available cookies
    console.log("All Cookies:", document.cookie);
  
    // Retrieve the "users" cookie
    const userCookie = getCookie("users");
    console.log("Retrieved 'users' cookie:", userCookie);
  
    if (userCookie) {
      const users = JSON.parse(decodeURIComponent(userCookie));
      console.log("Parsed 'users' cookie:", users);
      setUser(users);
    }
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
  },[]);

  return (
    <>
      <div className='hero-section'>
        <div>
          {users && (
            <h1 className='seller-page-header'>Welcome {users.fullName}!</h1>
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
            {sellingItems.map((item, selling) => (
               <Card elevation={6} className='item-card' key={selling}>
               <CardHeader
                 title={item.product}
                 subheader={item.sellerName}
               />
               <CardMedia
                 image='http://placehold.jp/150x150.png'
                 title={item.product}
               />
               <CardContent>
                 <Typography variant='body2' color='textSecondary' component='p'>
                   {item.description}
                   {item.price}
                 </Typography>
               </CardContent>
             </Card>
            ))}
          </div>
        )}
      {soldItems.length > 0 && (
          <div className='items-sold-div'>
            <h1 className='items-sold-header'>Items Sold</h1>
            {soldItems.map((item, sold) => (
              <div key={sold}>
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
