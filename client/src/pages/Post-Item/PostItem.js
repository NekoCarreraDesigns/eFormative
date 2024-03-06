import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FormControl, TextareaAutosize, FormHelperText } from "@mui/material";
import "./PostItem.css";

const PostItem = () => {
  const [sellerName, setSellerName] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [inputArea, setInputArea] = useState("");
  const navigate = useNavigate();
  const marketPath = "/market";

  const characterCounter = (event) => {
    setInputArea(event.target.value);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const addItem = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("sellerName", sellerName);
    formData.append("product", productName);
    formData.append("price", price);
    selectedFiles.forEach((file, index) => {
      formData.append(`image_${index}`, file);
    });
    formData.append("description", description);

    axios
      .post("/market/items/add", formData)
      .then((res) => {
        alert("Your item has been posted!");
        navigate(marketPath);
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  };

  return (
    <div className='hero-section'>
      <p className='post-item-paragraph'>Please post your item!</p>
      <div className='post-item-form-div'>
        <form onSubmit={addItem} encType="multipart/form-data" action="/upload" method="POST">
          <FormControl>
            <input
              required
              placeholder='What is your name'
              variant='outlined'
              className='seller-name-post-input text-input-white'
              id='seller-input'
              onChange={(event) => setSellerName(event.target.value)}
            />
            <br />
            <br />
            <FormControl>
              <input
                required
                placeholder='Input item name'
                variant='outlined'
                className='item-name-input text-input-white'
                onChange={(event) => setProductName(event.target.value)}
              />
              <br />
              <br />
              <FormHelperText>Upload a picture or video</FormHelperText>
              <input
                type='file'
                multiple
                accept='image/*'
                className='upload-picture-video-input'
                name='images'
                placeholder='upload an image or a video'
                onChange={handleFileChange}
              />
            </FormControl>

            <input
              required
              placeholder='Please input a price'
              variant='outlined'
              className='item-price-input text-input-white'
              id='price-input'
              onChange={(event) => setPrice(event.target.value)}
            />
            <br />
            <br />
            <TextareaAutosize
              className='post-item-textarea'
              onChange={(event) => {
                characterCounter(event);
                setDescription(event.target.value);
              }}
              id='text-area'
              placeholder='Enter item description'
              maxLength={300}
              style={{width: 600, height: 400}}
            />

            <br />
            <span className='character-count-post-span'>
              <strong>{300 - inputArea.length} characters left</strong>
            </span>
            <br />
            <button
              className='add-item-button clear-btn-green-border'
              type="submit">
              Post Item
            </button>
          </FormControl>
        </form>
      </div>
    </div>
  );
};

export default PostItem;
