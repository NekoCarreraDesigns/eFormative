import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

  const userSignIn = (event) => {
    const usernameInput = document.getElementById("username");
    const userPasswordInput = document.getElementById("user-password");

    event.preventDefault();
    axios
      .post("/sign-in", {
        username: usernameInput.value,
        password: userPasswordInput.value,
      })
      .then((response) => {
        response.json({ message: "login successful" });
        sellerRedirect();
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  return (
    <>
      <h1 className='sell-page-header'>Sell</h1>
      <p className='sell-page-paragraph'>
        Please login if you are a returning seller,
        <br /> or sign up to become a new seller
      </p>
      <div className='sell-form-div'>
        <form onSubmit={userSignIn} className='sell-page-form'>
          <input
            className='username-input'
            type='text'
            placeholder='please type username'
            id='username'></input>
          <br />
          <input
            className='user-password-input'
            type='password'
            placeholder='please enter password'
            id='user-password'></input>
          <br />
          <button className='user-login-submit-button' type='submit'>
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
