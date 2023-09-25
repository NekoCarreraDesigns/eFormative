import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import axios from "axios";

const AdminRegistration = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");

  const handlePinChange = (event) => {
    setPin(event.target.value);
  };

  const handleRegistration = () => {
    let path = `/admin-login`;
    axios
      .post("/admin/register-pin", { pin })
      .then((res) => {
        if (res.data.success) {
          setMessage("PIN registered successfully");
          navigate(path);
        } else {
          setMessage("PIN was not registered");
        }
      })
      .catch((error) => {
        setMessage("An error occurred while trying yo register PIN");
        console.log(error);
      });
  };
  return (
    <div>
      <h2 className='admin-header'>Admin Registration</h2>
      <div>
        <label>Enter Admin PIN:</label>
        <input
          className='admin-registration'
          type='text'
          value={pin}
          onChange={handlePinChange}
        />
      </div>
      <div>
        <button className='admin-button' onClick={handleRegistration}>
          Register
        </button>
      </div>
      <div>{message}</div>
    </div>
  );
};
export default AdminRegistration;
