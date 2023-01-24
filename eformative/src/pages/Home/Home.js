import React from "react";
import "./Home.css";
import { div, Button } from "@mui/material";

const Home = () => {
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position);
      window.location.replace("/market");
    });
  };

  return (
    <>
      <div className='background-image'>
        <h1 className='home-page-header'>
          <img className='logo' alt='logo' src='./assets/eLogo.jpg'></img>
          formative
        </h1>
        <p className='home-page-paragraph'>Help yourself, help the planet</p>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div>
            <img
              style={{ flex: "1 1 200px", margin: "5px" }}
              className='image'
              src='./assets/image001.jpg'
              alt='image1'
            />
          </div>
          <div>
            <img
              style={{ flex: "1 1 200px", margin: "5px" }}
              className='image'
              src='./assets/image002.jpg'
              alt='image2'
            />
          </div>
          <div>
            <img
              style={{ flex: "1 1 200px", margin: "5px" }}
              className='image'
              src='./assets/image003.jpg'
              alt='image3'
            />
          </div>
          <div>
            <img
              style={{ flex: "1 1 200px", margin: "5px" }}
              className='image'
              src='./assets/image004.jpg'
              alt='image4'
            />
          </div>
          <div>
            <img
              style={{ flex: "1 1 200px", margin: "5px" }}
              src='./assets/image005.jpg'
              alt='image5'
            />
          </div>
          <div>
            <img
              style={{ flex: "1 1 200px", margin: "5px" }}
              className='image'
              src='./assets/image006.jpg'
              alt='image6'
            />
          </div>
          <div>
            <img
              style={{ flex: "1 1 200px", margin: "5px" }}
              className='image'
              src='./assets/image007.jpg'
              alt='image7'
            />
          </div>
        </div>
        <img
          alt='electricity'
          className='electric'
          src='./assets/ElectricSymbol.jpg'></img>
        <p>Electric products, News, and Reviews</p>
        <Button
          className='home-location-button'
          color='success'
          variant='contained'
          onClick={getLocation}>
          Find your market
        </Button>
      </div>
    </>
  );
};

export default Home;
