import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='inner-navbar'>
        <a className='navbar-link' href='/'>
          Home
        </a>
        <a className='navbar-link' href='/market'>
          Market
        </a>
        <a className='navbar-link' href='/reviews'>
          Reviews
        </a>
        <a className='navbar-link' href='/sell'>
          Sell
        </a>
        <img alt='logo' className='navbar-logo' src='./assets/eLogo.jpg'></img>
      </div>
    </nav>
  );
};

export default Navbar;
