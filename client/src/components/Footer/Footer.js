import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className='page-footer'>
      <small className='footer-small-print'>&copy; 2023 eformative</small>
      <br />
      <a className='footer-link' href='/about'>About Us</a>
      <br />
      <a className='footer-link' href='/admin-login'>Admin Login</a>
    </footer>
  );
};

export default Footer;
