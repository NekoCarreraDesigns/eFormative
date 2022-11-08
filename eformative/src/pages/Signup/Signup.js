import React from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import "./Signup.css";

const fullNameInput = document.querySelector("input");
const usernameInput = document.getElementById("userName");
const userEmailInput = document.getElementById("email");
const passwordInput0 = document.getElementById("password0");

const userPostSignUp = () => {
  axios
    .post("/seller", {
      fullName: fullNameInput.value,
      username: usernameInput.value,
      email: userEmailInput.value,
      password: passwordInput0.value,
    })
    .then((res) => {
      res.redirect("/post-item");
      console.log("Successful Sign Up!");
    })
    .catch((err) => {
      console.log(err);
    });
};

const Signup = () => {
  // let navigate = useNavigate();
  // const postRedirect = () => {
  //   let path = `/post-item`;
  //   navigate(path);
  // };
  return (
    <>
      <h1 className='signup-page-header'>Please Sign Up</h1>
      <div className='signup-form-container'>
        <form className='signup-form'>
          <input
            className='fullName-input'
            placeholder='please enter full name'></input>
          <br />
          <input
            className='userName-input'
            placeholder='please enter a username'
            id='userName'></input>
          <br />
          <input
            type='text'
            className='email-input'
            placeholder='please enter a email'
            id='email'></input>
          <br />
          <input
            type='password'
            className='password-input'
            placeholder='please enter a password'
            id='password0'></input>
          <br />
          <button className='user-signup-button' onClick={userPostSignUp}>
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
