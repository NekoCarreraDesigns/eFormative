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
        alert("Thanks for joining us!");
        navigate(postItemPath);
      })
      .catch((err) => {
        if (err) throw err;
      });
  };

  return (
    <div className="hero-section signup-container">
      <h1 className="signup-page-header">Please Sign Up</h1>
      <div className="signup-form-container">
        <form onSubmit={userPostSignUp} className="signup-form">
          <input
            className="fullName-input text-input-white"
            placeholder="Please enter full name"
          />
          <br />
          <input
            className="userName-input text-input-white"
            placeholder="Please enter a username"
            id="userName"
          />
          <br />
          <input
            type="text"
            className="email-input text-input-white"
            placeholder="Please enter an email"
            id="email"
          />
          <br />
          <input
            type="password"
            className="password-input text-input-white"
            placeholder="Please enter a password"
            id="password0"
          />
          <br />
          <button className="clear-btn-green-border user-signup-button" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
