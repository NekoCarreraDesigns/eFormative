import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className='page-footer'>
      <h3 className='footer-header'>
        website made by Neko Carrera Designs. All rights reserved
      </h3>
      <p className='footer-paragraph'>
        Thanks for visiting this website, we appreciate it. do you have a
        question or are you trying to report a problem with the site? Please
        email nekocarreradesigns@gmail.com
      </p>
      <small className='footer-small-print'>
        &copy; Neko Carrera Designs 2022
      </small>
    </footer>
  );
};

export default Footer;
