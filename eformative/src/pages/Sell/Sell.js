import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Sell.css";

const Sell = () => {
  const [username, setUsername] = useState("");
  let navigate = useNavigate();

  const signUpRedirect = () => {
    let path = `/signup`;
    navigate(path);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const userSignIn = async (event) => {
    let sellerPath = `/seller`;
    const usernameInput = document.getElementById("username");
    const userPasswordInput = document.getElementById("user-password");
    event.preventDefault();
    try {
      const { data } = await axios.post("/sign-in", {
        username: usernameInput.value,
        password: userPasswordInput.value,
      });

      if (data.message === "Successful Login!") {
        sessionStorage.setItem("user", JSON.stringify(usernameInput.value));
        navigate(sellerPath);
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        console.error("Invalid username or password");
      } else {
        console.error(err);
      }
    }
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
            id='username'
            value={username}
            onChange={handleUsernameChange}></input>
          <br />
          <input
            className='user-password-input'
            placeholder='please enter password'
            id='user-password'
            type='password'></input>
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
