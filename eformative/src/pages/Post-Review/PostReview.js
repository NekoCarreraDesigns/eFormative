import React from "react";
import { useState } from "react";
import axios from "axios";
import "./PostReview.css";

const sellerInput = document.querySelector("input");
const productInput = document.getElementById("product-name");
const area = document.querySelector("textarea");

const addReview = () => {
  axios
    .post("/product/reviews/post", {
      sellerName: sellerInput.value,
      productName: productInput.value,
      review: area.value,
    })
    .then((res) => {
      console.log(res);
      alert("Review has been added");
    })
    .catch((err) => {
      console.log(err);
    });
};

// figure out to add eventlistener without being null, to prevent page refresh
// form.addEventListener("click", (event) => {
//   addReview();
//   event.preventDefault();
// });

const PostReview = () => {
  const [input, setInput] = useState("");
  const inputHandler = (event) => {
    setInput(event.target.value);
  };

  return (
    <>
      <h1 className='post-review-header'>Post A Review</h1>
      <form className='post-review-form'>
        <input
          className='seller-name-input'
          id='seller-name'
          type='text'
          placeholder='please enter your name'></input>
        <br />
        <input
          className='product-name-input'
          id='product-name'
          type='text'
          placeholder='product being reviewed'></input>
        <br />
        <button className='upload-button'>Upload Photo or video</button>
        <br />
        <textarea
          maxLength={300}
          className='user-post-review-textarea'
          id='review-text-area'
          onChange={inputHandler}></textarea>
        <br />
        <span className='character-count-span'>
          {300 - input.length} characters left
        </span>
        <br />
        <button className='post-review-button' onClick={addReview}>
          Submit
        </button>
      </form>
    </>
  );
};

export default PostReview;
