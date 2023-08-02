import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

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
        <h2 className='home-page-paragraph'>Have Fun, and help the planet!</h2>
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

const IconsSection = () => (
  <div className='icons-section'>
    <div className='container'>
      <div className='row'>
        {[
          {
            src: "./assets/electric-products-white.png",
            alt: "Electric Products Icon",
            title: "Electric Products",
          },
          { src: "./assets/news-white.png", alt: "News Icon", title: "News" },
          {
            src: "./assets/reviews-white.png",
            alt: "Reviews Icon",
            title: "Reviews",
          },
        ].map(({ src, alt, title }) => (
          <div className='icons-column shake-on-hover' key={title}>
            <img className='icons-column-image' src={src} alt={alt} />
            <h2 className='icons-column-title'>{title}</h2>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SignupCTASection = () => {
  let navigate = useNavigate();

  const signUpRedirect = () => {
    let path = `/signup`;
    navigate(path);
  };

  return (
    <div className='signup-cta-section'>
      <div className='container'>
        <div className='columns'>
          <div className='left-column'>
            <img
              className='signup-cta-image'
              alt='Couple on eScooter'
              src='./assets/emotoscooter-cut.png'
            />
          </div>
          <div className='right-column'>
            <h2 className='cta-header'>Join the Green Marketplace</h2>
            <p className='cta-body'>
              Contribute to a sustainable future by buying and selling electric
              products with ease.
            </p>
            <button className='signup-cta-button' onClick={signUpRedirect}>
              Sign Up Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
