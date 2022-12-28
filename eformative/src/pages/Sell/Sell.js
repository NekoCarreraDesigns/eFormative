import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Sell.css";

const Sell = () => {
  const UserContext = React.createContext();
  const [username, setUsername] = useState("");
  const [userSignInData, setUserSignInData] = useState("");
  let navigate = useNavigate();

  const { Provider } = UserContext;

  const signUpRedirect = () => {
    let path = `/signup`;
    navigate(path);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const retrieveUserSignIn = async () => {
    const usernameInput = document.getElementById("username");
    const userPasswordInput = document.getElementById("user-password");
    const encodedCredentials = btoa(
      `${usernameInput.value}: ${userPasswordInput.value}`
    );
    try {
      const res = await axios.get("/user", {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      });
      if (res.status === 200) {
        return res.data.userId;
      } else if (res.status === 400) {
        console.error("Username or password is incorrect");
      }
    } catch (err) {
      console.error(err);
    }
    return;
  };

  const userData = useContext(UserContext);

  const userSignIn = (event) => {
    let sellerPath = `/seller`;
    const usernameInput = document.getElementById("username");
    const userPasswordInput = document.getElementById("user-password");
    event.preventDefault();
    axios
      .post("/sign-in", {
        username: usernameInput.value,
        password: userPasswordInput.value,
      })
      .then((res) => {
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        res.json({ message: "login successful" });
        const userId = retrieveUserSignIn();
        setUserSignInData({ ...res.data.user, id: userId });
      })
      .catch((err) => {
        if (err) {
          console.error("user not found");
        }
      });
    navigate(sellerPath);
  };

  return (
    <>
      <h1 className='sell-page-header'>Sell</h1>
      <p className='sell-page-paragraph'>
        Please login if you are a returning seller,
        <br /> or sign up to become a new seller
      </p>
      <Provider value={userData}>
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
      </Provider>
    </>
  );
};

export default Sell;
