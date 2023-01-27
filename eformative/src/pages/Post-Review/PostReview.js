import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormHelperText,
  TextField,
  Button,
  TextareaAutosize,
} from "@mui/material";
import OnImageChange from "../../images/images";
import "./PostReview.css";

const addReview = () => {
  const reviewerNameInput = document.getElementById("seller-name");
  const productInput = document.getElementById("product-name");
  const sellerReviewInput = document.getElementById("seller-review");
  const area = document.querySelector("textarea");

  axios
    .all([
      axios.post("/seller/reviews/post", {
        reviewerName: reviewerNameInput.value,
        sellerName: sellerReviewInput.value,
        review: area.value,
      }),
      axios.post("/product/reviews/post", {
        reviewerName: reviewerNameInput.value,
        sellerName: sellerReviewInput.value,
        productName: productInput.value,
        review: area.value,
      }),
    ])
    .then(
      axios.spread((res) => {
        console.log(res);
        alert("Review has been added");
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

const PostReview = () => {
  const [input, setInput] = useState(" ");
  const inputHandler = (event) => {
    setInput(event.target.value);
  };

  return (
    <>
      <h1 className='post-review-header'>Post A Review</h1>
      <form onSubmit={addReview} className='post-review-form'>
        <FormControl>
          <TextField
            fullWidth
            required
            className='seller-name-input'
            id='seller-name'
            type='text'
            placeholder='please enter your name'></TextField>
          <br />
          <br />
          <TextField
            fullWidth
            className='product-name-input'
            id='product-name'
            type='text'
            placeholder='product being reviewed'></TextField>
          <br />
          <br />
          <TextField
            fullWidth
            className='seller-review-input'
            type='text'
            placeholder='seller being reviewed'
            id='seller-review'></TextField>
          <br />
          <br />
          <FormHelperText>Upload a picture or video</FormHelperText>
          <input
            type='file'
            multiple
            accept='image/*'
            id='image-input'
            name='post-item-picture-video'
            placeholder='upload an image or a video'
            onChange={OnImageChange}
            className='upload-button'></input>
          <br />
          <br />
          <TextareaAutosize
            maxLength={300}
            className='user-post-review-textarea'
            id='review-text-area'
            onChange={inputHandler}
            style={{ width: "800px", height: "400px" }}></TextareaAutosize>
          <br />
          <span className='character-count-span'>
            <strong>{300 - input.length} characters left</strong>
          </span>
          <br />
          <Button
            variant='contained'
            color='success'
            className='post-review-button'
            type='submit'>
            Submit
          </Button>
        </FormControl>
      </form>
    </>
  );
};

export default PostReview;
