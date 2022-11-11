import React from "react";
import "./Home.css";

const Home = () => {
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position);
      window.location.replace("/market");
    });
  };

  return (
    <>
      <h1 className='home-page-header'>Eformative</h1>
      <p className='home-page-paragraph'>
        Welcome to Eformative! A place for all your electric vehicle and
        alternative transportation needs. Check out the market place, look for
        reviews of products , and sellers. Sell an item of yours. let's help
        build a greener world for future generations.{" "}
      </p>
      <button className='home-location-button' onClick={getLocation}>
        Find your Market
      </button>
    </>
  );
};

export default Home;
