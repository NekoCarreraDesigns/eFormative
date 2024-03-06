import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FormControl, TextareaAutosize } from "@mui/material";

const PostItem = () => {
  const [formData, setFormData] = useState({
    sellerName: "",
    product: "",
    price: "",
    description: "",
  });
  const navigate = useNavigate();
  const marketPath = "/market";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("/market/items/add", formData)
      .then((res) => {
        alert("Your item has been posted!");
        navigate(marketPath);
      })
      .catch((err) => {
        console.error(err);
        // Handle error
      });
  };

  return (
    <div className='hero-section'>
      <p className='post-item-paragraph'>Please post your item!</p>
      <div className='post-item-form-div'>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <input
              required
              placeholder='What is your name'
              variant='outlined'
              className='seller-name-post-input text-input-white'
              id='seller-input'
              name='sellerName'
              value={formData.sellerName}
              onChange={handleChange}
            />
            <br />
            <br />
            <FormControl>
              <input
                required
                placeholder='Input item name'
                variant='outlined'
                className='item-name-input text-input-white'
                name='product'
                value={formData.product}
                onChange={handleChange}
              />
            </FormControl>

            <input
              required
              placeholder='Please input a price'
              variant='outlined'
              className='item-price-input text-input-white'
              id='price-input'
              name='price'
              value={formData.price}
              onChange={handleChange}
            />
            <br />
            <br />
            <TextareaAutosize
              className='post-item-textarea'
              onChange={handleChange}
              id='description'
              placeholder='Enter item description'
              maxLength={300}
              style={{width: 600, height: 400}}
              name='description'
              value={formData.description}
            />

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
