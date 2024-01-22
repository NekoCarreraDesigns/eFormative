import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Admin.css";

const AdminLogin = () => {
  let adminPath = `/pages/admin`;
  let navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const handlePinChange = (event) => {
    setPin(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible)
  }

  const handleLogin = () => {
    axios
      .post("/admin/login", { pin })
      .then((response) => {
        if (response.data.success) {
          setMessage("login successful");
          navigate(adminPath);
        } else {
          setMessage("PIN is incorrect");
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage("An error has occurred");
      });
  };

  return (
    <div className="home-hero">
      <h2 className='admin-header'>Admin Login</h2>
      <div>
        <label className="admin-pin-label">Enter Admin PIN:</label>
        <input
          className='admin-login'
          type={isPasswordVisible ? 'text':'password'}
          value={pin}
          onChange={handlePinChange}
        />
         <button className='toggle-password' onClick={togglePasswordVisibility}>
          {isPasswordVisible ? 'hide' : 'show'}
        </button>
      </div>
      <div>
        <button className='admin-button' onClick={handleLogin}>
          Login
        </button>
      </div>
      <div>{message}</div>
    </div>
  );
};

export default AdminLogin;
