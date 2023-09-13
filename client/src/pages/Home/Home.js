import React from "react";
import "./Home.css";
import SignupCTASection from "../../components/SignupCTASection/SignupCTASection";
import IconsSection from "../../components/Icons/Icons";

const Home = () => {
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      window.location.replace("/market");
    });
  };

  return (
    <div className='body'>
      <div className='home-hero'>
        <img
          className='hero-logo'
          alt='logo'
          src='./assets/eformative-logo-white.png'
        />
        <h2 className='home-page-header'>Have Fun, and help the planet!</h2>
        <div className='button-container'>
          <button className='clear-btn-green-border' onClick={getLocation}>
            Find Your Market
          </button>
        </div>
        <IconsSection />
      </div>
      <SignupCTASection />
    </div>
  );
};

export default Home;
