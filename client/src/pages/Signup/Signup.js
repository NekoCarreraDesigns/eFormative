import {React, useState} from "react";
import axios from "axios";
import "./Signup.css";

import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  let navigate = useNavigate();
  let postItemPath = `/post-item`;

  const userPostSignUp = (event) => {
    event.preventDefault()
    axios
      .post("/seller/sign-up", {
        fullName: fullName,
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        res.json({ message: "Sign Up Successful" });
        alert("Thanks for joining us!");
        navigate(postItemPath);
      })
      .catch((err) => {
        console.error(err)
        alert("Failed to signup, please try again later")
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
            name="full name"
            aria-label="full name input for seller signup"
            onChange={(event) => setFullName(event.target.value)}
          />
          <br />
          <input
            className="userName-input text-input-white"
            placeholder="Please enter a username"
            name="user name"
            aria-label="username input for seller signup"
            onChange={(event) => setUsername(event.target.value)}
          />
          <br />
          <input
            type="text"
            className="email-input text-input-white"
            placeholder="Please enter an email"
            name="user email"
            aria-label="email input for seller signup"
            onChange={(event) => setEmail(event.target.value)}
          />
          <br />
          <input
            type="password"
            className="password-input text-input-white"
            placeholder="Please enter a password"
            name="password"
            aria-label= "user password input for seller signup"
            onChange={(event) => setPassword(event.target.value)}
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
