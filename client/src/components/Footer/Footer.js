import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className='page-footer'>
      <small className='footer-small-print'>&copy; 2023 eformative</small>
      <br />
      <a href='/about'>about us</a>
      <br />
      <a href='/admin-login'>Admin login</a>
    </footer>
  );
};

export default Footer;
