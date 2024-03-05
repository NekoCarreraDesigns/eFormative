import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormHelperText,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import OnImageChange from "../../images/images";
import "./PostReview.css";


  
  const PostReview = () => {
  const [formData, setFormData] = useState({
    reviewerName: "",
    product: "",
    sellerName: "",
    review: "",
  });
  
  const inputHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const addReview = (event) => {
    event.preventDefault();
    axios
      .all([
        axios.post("/seller/reviews/post", formData),
        axios.post("/product/reviews/post", formData),
      ])
      .then(
        axios.spread((res1, res2) => {
          console.log(res1, res2);
          alert("Review has been added");
        })
      )
      .catch((err) => {
        console.log(err);
        alert("Failed to add review");
      });
    };

  return (
    <>
      
      <div className='review-container hero-section'>
        <h1 className='post-review-header'>Post a review!</h1>
        <form onSubmit={addReview} className='post-review-form'>
          <div className='form-control-wrapper'>
            <FormControl className='custom-form-control'>
              <TextField
                fullWidth
                required
                className='seller-name-input text-input-dark'
                id='seller-name'
                type='text'
                aria-label="Name input for the reviewer"
                placeholder='Please enter your name'
                name="reviewerName"
                value={formData.reviewerName}
                onChange={inputHandler}
              />
              <br />
              <br />
              <TextField
                fullWidth
                className='product-name-input text-input-dark'
                id='product-name'
                type='text'
                placeholder='Product being reviewed'
                aria-label="name of the product being reviewed input"
                name="product"
                value={formData.product}
                onChange={inputHandler}
              />
              <br />
              <br />
              <TextField
                fullWidth
                className='seller-review-input text-input-dark'
                type='text'
                placeholder='Seller being reviewed'
                id='seller-review'
                aria-label=" name of seller being reviewed"
                name="sellerName"
                value={formData.sellerName}
                onChange={inputHandler}
              />
              <br />
              <br />
              <FormHelperText>Upload a picture or video</FormHelperText>
              <input
                type='file'
                multiple
                accept='image/*'
                id='image-input'
                name='post-item-picture-video'
                aria-label="user image upload button"
                placeholder='Upload an image or a video'
                onChange={OnImageChange}
                className='upload-button'
              />
              <br />
              <br />
              <TextareaAutosize
                maxLength={300}
                className='user-post-review-textarea text-input-dark'
                id='review-text-area'
                aria-label="user textarea to write reviews about sellers or products"
                name="review"
                value={formData.review}
                onChange={inputHandler}
              />
              <br />
              <span className='character-count-span'>
                <strong>{300 - formData.review.length} characters left</strong>
              </span>
              <br />
              <button className='clear-btn-green-border clear-btn-sm' type='submit' aria-label="click button to submit your review">
                Submit
              </button>
            </FormControl>
          </div>
        </form>
      </div>
    </>
  );
};

export default PostReview;
