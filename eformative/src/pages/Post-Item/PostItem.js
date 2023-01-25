import React, { useState } from "react";
import axios from "axios";
import {
  FormControl,
  Button,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import OnImageChange from "../../images/images";
import "./PostItem.css";

const sellerPostInput = document.getElementById("seller-input");
const productNamePostInput = document.getElementById("item-name");
const priceInput = document.getElementById("item-price");
const productDescriptionArea = document.getElementById("text-area");
const imageInput = document.getElementById("image-input");

const addItem = (event) => {
  event.preventDefault();
  axios
    .post("/items/add", {
      sellerName: sellerPostInput.value,
      product: productNamePostInput.value,
      price: priceInput.value,
      image: imageInput.value,
      description: productDescriptionArea.value,
    })
    .then((res) => {
      res.status(200);
      alert("Your item has been posted!");
    })
    .catch((err) => {
      console.error(err);
      return;
    });
};

const PostItem = () => {
  const [inputArea, setInputArea] = useState("");

  const characterCounter = (event) => {
    setInputArea(event.target.value);
  };

  return (
    <>
      <h1 className='post-item-header'>Welcome!</h1>;
      <p className='post-item-paragraph'>Please post your item!</p>;
      <div className='post-item-form-div'>
        <form>
          <FormControl fullWidth>
            <TextField
              label='Please input your name'
              variant='outlined'
              className='seller-name-post-input'
              id='seller-input'
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label='Please input item name'
              variant='outlined'
              className='item-name-input'
            />
          </FormControl>
          <input
            type='file'
            multiple
            accept='image/*'
            className='upload-picture-video-input'
            id='image-input'
            name='post-item-picture-video'
            placeholder='upload an image or a video'
            onChange={OnImageChange}
          />
          <FormControl fullWidth>
            <TextField
              label='Please input a price'
              variant='outlined'
              className='item-price-input'
            />
          </FormControl>
          <FormControl fullWidth>
            <TextareaAutosize
              className='post-item-textarea'
              onChange={characterCounter}
              rowsMin={3}
              id='text-area'
              placeholder='Enter item description'
              maxLength={300}
            />
          </FormControl>
          <br />
          <span className='character-count-post-span'>
            <strong>{300 - inputArea.length} characters left</strong>
          </span>
          <br />
          <Button
            variant='contained'
            color='primary'
            className='add-item-button'
            onClick={addItem}>
            Post Item
          </Button>
        </form>
      </div>
    </>
  );
};

export default PostItem;
