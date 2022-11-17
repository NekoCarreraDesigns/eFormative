import React, { useState } from "react";
import axios from "axios";
import Parse from "parse/dist/parse.min.js";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  let postItemPath = `/post-item`;

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
        res.json({ message: "Sign Up Successful" });
        console.log(currentUser);
        getCurrentUser();
      })
      .catch((err) => {
        if (err) throw err;
      });
    navigate(postItemPath);

    const getCurrentUser = async () => {
      const currentUser = await Parse.User.current();
      setCurrentUser(currentUser);
      return currentUser;
    };
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
