import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className='page-footer'>
      {/* <p className='footer-paragraph'>
        Thanks for visiting this website, we appreciate it. do you have a
        question or are you trying to report a problem with the site? Please
        email nekocarreradesigns@gmail.com
      </p> */}
      <small className='footer-small-print'>
        &copy; 2023 eformative  |  Website by <a href="mailto:nekocarreradesigns@gmail.com">Neko Carrera Designs</a> & <a href="https://hagercreative.com">HagerCreative</a>
      </small>
    </footer>
  );
};

export default Footer;
