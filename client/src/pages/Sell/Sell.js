import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Sell.css";

const Sell = () => {
  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("")
  let navigate = useNavigate();

  const signUpRedirect = () => {
    let path = `/signup`;
    navigate(path);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setUserPassword(event.target.value)
  }

  const userSignIn = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/sign-in", {
        username,
        password: userPassword,
      });

      if (data.message === "Successful Login!") {
        sessionStorage.setItem("user", JSON.stringify(username));
        navigate("/seller");
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
      <div className='hero-section sell-container'>
        <h1 className='sell-page-header'>Sell</h1>
        {/* <p className='sell-page-paragraph'>
          If you are a returning seller, please log in here.
        </p> */}
          <div className='sell-form-div'>
            <form onSubmit={userSignIn} className='sell-page-form'>
              <input
                className='username-input text-input-white'
                type='text'
                placeholder='please type username '
                name="user name"
                aria-label="username input for login"
                value={username}
                onChange={handleUsernameChange}></input>
              <br />
              <input
                className='user-password-input text-input-white'
                placeholder='please enter password'
                id='user-password'
                name="user-password"
                type='password'
                aria-label="input for user password"
                value={userPassword}
                onChange={handlePasswordChange}></input>
              <br />
              <button className='clear-btn-green-border user-login-submit-button' type='submit' aria-label="click button to login">
                Login
              </button>
            </form>
          </div>
          <p className='new-seller-paragraph'>New sellers please sign up here.</p>
          <button className='clear-btn-sm clear-btn-green-border user-signup-redirect' onClick={signUpRedirect}>
            signup
          </button>
      </div>
    </>      
  );
};

export default Sell;
