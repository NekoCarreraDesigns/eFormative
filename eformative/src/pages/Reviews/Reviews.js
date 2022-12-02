import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Reviews.css";

const Reviews = () => {
  const [input, setInput] = useState(" ");
  let navigate = useNavigate();
  const postReview = () => {
    let postPath = `/post-reviews`;
    navigate(postPath);
  };

  const inputHandler = (event) => {
    let lowerCase = event.target.value.toLowerCase();
    setInput(lowerCase);
  };

  const sellerFilter = async () => {
    const sellerSearchInput = document.getElementById("seller-search");
    await axios.get("/reviews", {
      sellerReview: sellerSearchInput.value,
    });
    navigate("/seller-reviews");
    console.log("clicked");
  };

  const [reviews, setReview] = useState();

  useEffect(() => {
    fetch("/reviews")
      .then((res) => res.json())
      .then((reviews) => setReview(reviews));
  });

  return (
    <>
      <h1 className='reviews-page-header'>Reviews</h1>
      <div className='search-filters-div'>
        <div className='seller-filter-div'>
          <h2 className='search-filters-header'>Search filters</h2>
          <input
            id='seller-search'
            type='text'
            placeholder='search by seller name'
            input={input}
            onChange={inputHandler}></input>
          <button
            className='search-filters-seller-button'
            onClick={sellerFilter}>
            Search Seller
          </button>
          <input
            className='product-filter-input'
            type='text'
            placeholder='search by product name'></input>
          <button className='search-filters-product-button'>
            Search Product
          </button>
          <button className='post-review-button-redirect' onClick={postReview}>
            Post Review
          </button>
        </div>
      </div>
      {reviews?.map((review, userReview) => (
        <div key={userReview}>
          <h1 className='reviews-header'>
            Reviewer: {review.reviewerName}, Seller: {review.sellerName},
            Product: {review.productName}
          </h1>{" "}
          <div className='reviews-div'>{review.review}</div> <hr />
        </div>
      ))}
    </>
  );
};

export default Reviews;
