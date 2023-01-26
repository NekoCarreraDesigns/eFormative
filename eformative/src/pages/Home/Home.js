import React from "react";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";

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
        {/* <h1 className='home-page-header'>
          <img className='logo' alt='logo' src='./assets/eLogo.jpg'></img>
          formative
        </h1> */}
        <p className='home-page-paragraph'>Help yourself, help the planet</p>
        <div className='image-container'>
          <img className='image' alt='image1' src='./assets/image001.jpg'></img>
          <img className='image' alt='image1' src='./assets/image002.jpg'></img>
          <img className='image' alt='image1' src='./assets/image003.jpg'></img>
          <img className='image' alt='image1' src='./assets/image004.jpg'></img>
          <img className='image' alt='image1' src='./assets/image005.jpg'></img>
          <img className='image' alt='image1' src='./assets/image006.jpg'></img>
          <img className='image' alt='image1' src='./assets/image007.jpg'></img>
          <img className='image' alt='image1' src='./assets/image008.jpg'></img>
        </div>
        <div className='paragraph-container'>
          <p className='second-page-paragraph'>
            <FontAwesomeIcon icon={faBolt}></FontAwesomeIcon>
            Electric products, News, and Reviews.
            <br /> Have Fun, and help the planet!
          </p>
        </div>
        <div className='button-container'>
          <button className='home-location-button' onClick={getLocation}>
            Find your market
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
