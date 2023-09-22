import React, { useState } from "react";
import axios from "axios";
import "./Admin.css";

const Admin = () => {
  const [username, setUserName] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [message, setMessage] = useState("");
  const [imageId, setImageId] = useState("");
  const [removeImage, setRemoveImage] = useState(false);
  const [displayedImage, setDisplayedImage] = useState([]);

  const handleUsernameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleImageChange = (event) => {
    setImageId(event.target.value);
  };

  const handleBlockUser = () => {
    axios
      .post("admin/block-user", { username })
      .then((response) => {
        if (response.data.success) {
          setIsBlocked(true);
          setMessage(`User '${username}' has been blocked`);
        } else {
          setIsBlocked(false);
          setMessage(`User '${username}' wasn't blocked`);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsBlocked(false);
        setMessage("An error occurred while trying to block user");
      });
  };

  const handelImageRemoval = () => {
    axios
      .delete(`admin/image-removal/${imageId}`)
      .then((response) => {
        if (response.data.success) {
          setRemoveImage(true);
          setMessage(`Image '${imageId}' has been removed`);
        } else {
          setRemoveImage(false);
          setMessage(`Failed to remove '${imageId}'`);
        }
      })
      .catch((error) => {
        console.error(error);
        setRemoveImage(false);
        setMessage("Can't remove image");
      });
  };

  const searchByUsername = (event) => {
    axios
      .get(`admin/search-images-by-username/${username}`)
      .then((response) => {
        const images = response.data.images;
        if (images.length > 0) {
          setDisplayedImage(images);
          setMessage("Found user with images");
        } else {
          setMessage("User has no images");
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage("Could not find user");
      });
  };

  return (
    <>
      <div>
        <h1 className='admin-panel-header'>Admin Panel</h1>
        <div className='block-user'>
          <input
            className='user-block'
            type='text'
            value={username}
            onChange={handleUsernameChange}></input>
          <button className='block-button' onClick={handleBlockUser}>
            Block User
          </button>
        </div>
        {message && (
          <p className={isBlocked ? "success-message" : "error-message"}>
            {message}
          </p>
        )}
      </div>
      <div>
        <input
          className='user-image-search'
          type='text'
          value={username}
          onChange={handleUsernameChange}></input>
        <button onClick={searchByUsername}></button>
        {message && (
          <p className={displayedImage ? "success-message" : "error-message"}>
            {message}
          </p>
        )}
        <input
          className='user-image-removal'
          type='text'
          value={imageId}
          onChange={handleImageChange}></input>
        <button className='remove-image-button' onClick={handelImageRemoval}>
          Remove Image
        </button>
        {message && (
          <p className={removeImage ? "success-message" : "error-message"}>
            {message}
          </p>
        )}
      </div>
    </>
  );
};

export default Admin;
