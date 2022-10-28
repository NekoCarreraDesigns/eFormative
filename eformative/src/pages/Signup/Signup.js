import React from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  let navigate = useNavigate();
  const postRedirect = () => {
    let path = `/post-item`;
    navigate(path);
  };
  return (
    <>
      <h1 className='signup-page-header'>Please Sign Up</h1>
      <div className='signup-form-container'>
        <form className='signup-form'>
          <input
            className='fullName-input'
            placeholder='please enter full name'
            name='fullName'></input>
          <br />
          <input
            className='userName-input'
            placeholder='please enter a username'
            name='userName'></input>
          <br />
          <input
            type='password'
            className='password-input'
            placeholder='please enter a password'
            name='password0'></input>
          <br />
          <input
            type='password'
            className='password-re-enter-input'
            placeholder='please re-enter password'
            name='password1'></input>
          <br />
          <button className='user-signup-button' onClick={postRedirect}>
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
