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
      <div className='body'>
        <div className='home-hero'>
          <img className='hero-logo' alt='logo' src="./assets/eformative-logo-white.png"></img>
          <p className='home-page-paragraph'>Help yourself, help the planet</p>
        <div className='paragraph-container'>
          <p className='second-page-paragraph'>
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
      </div>
    </>
  );
};

export default Home;
