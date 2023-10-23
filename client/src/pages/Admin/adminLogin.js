import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Admin.css";

const AdminLogin = () => {
  let path = `/admin`;
  let navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");

  const handlePinChange = (event) => {
    setPin(event.target.value);
  };

  const handleLogin = () => {
    axios
      .post("/admin/check-pin", { pin })
      .then((response) => {
        if (response.data.success) {
          setMessage("login successful");
          navigate(path);
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
          type='text'
          value={pin}
          onChange={handlePinChange}
        />
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
