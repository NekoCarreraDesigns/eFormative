import React, { useState } from "react";
import axios from "axios";
import OnImageChange from "../../images/images";
import "./PostItem.css";

const sellerPostInput = document.querySelector("input");
const productNamePostInput = document.getElementById("item-name");
const priceInput = document.getElementById("item-price");
const productDescriptionArea = document.querySelector("textarea");
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
          <input
            className='seller-name-post-input'
            type='text'
            placeholder='please input your name'></input>
          <br />
          <input
            className='item-name-input'
            type='text'
            id='item-name'
            placeholder='Please input item name'></input>
          <br />
          <input
            type='file'
            multiple
            accept='image/*'
            className='upload-picture-video-input'
            id='image-input'
            name='post-item-picture-video'
            placeholder='upload an image or a video'
            onChange={OnImageChange}></input>
          <br />
          <input
            className='item-price-input'
            type='text'
            id='item-price'
            placeholder='Please input a price'></input>
          <br />
          <textarea
            maxLength={300}
            id='post-item-area'
            className='post-item-textarea'
            onChange={characterCounter}></textarea>
          <br />
          <span className='character-count-post-span'>
            <strong>{300 - inputArea.length} characters left</strong>
          </span>
          <br />
          <button className='add-item-button' onClick={addItem}>
            Post Item
          </button>
        </form>
      </div>
    </>
  );
};

export default PostItem;
