import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sell.css";

const Sell = () => {
  let navigate = useNavigate();
  const signUpRedirect = () => {
    let path = `/signup`;
    navigate(path);
  };

  const sellerRedirect = () => {
    let sellerPath = `/seller`;
    navigate(sellerPath);
  };

  return (
    <>
      <h1 className='sell-page-header'>Sell</h1>
      <p className='sell-page-paragraph'>
        Please login if you are a returning seller,
        <br /> or sign up to become a new seller
      </p>
      <div className='sell-form-div'>
        <form className='sell-page-form'>
          <input
            className='username-input'
            type='text'
            placeholder='please type username'
            name='username'></input>
          <br />
          <input
            className='user-password-input'
            type='password'
            placeholder='please enter password'
            name='user-password'></input>
          <br />
          <button
            className='user-login-submit-button'
            type='submit'
            onClick={sellerRedirect}>
            Login
          </button>
        </form>
      </div>
      <p className='new-seller-paragraph'>New sellers please sign up here</p>
      <button className='user-signup-redirect' onClick={signUpRedirect}>
        signup
      </button>
    </>
  );
};

export default Sell;
