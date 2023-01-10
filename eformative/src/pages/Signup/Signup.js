import React from "react";
import axios from "axios";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let navigate = useNavigate();
  let postItemPath = `/post-item`;

  const userPostSignUp = () => {
    const fullNameInput = document.querySelector("input");
    const usernameInput = document.getElementById("userName");
    const userEmailInput = document.getElementById("email");
    const passwordInput0 = document.getElementById("password0");

    axios
      .post("/seller", {
        fullName: fullNameInput.value,
        username: usernameInput.value,
        email: userEmailInput.value,
        password: passwordInput0.value,
      })
      .then((res) => {
        res.json({ message: "Sign Up Successful" });
        alert("thanks for joining us!");
        navigate(postItemPath);
      })
      .catch((err) => {
        if (err) throw err;
      });
  };

  return (
    <>
      <h1 className='signup-page-header'>Please Sign Up</h1>
      <div className='signup-form-container'>
        <form onSubmit={userPostSignUp} className='signup-form'>
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
          <button className='user-signup-button' type='submit'>
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
