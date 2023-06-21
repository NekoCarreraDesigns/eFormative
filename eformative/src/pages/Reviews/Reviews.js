import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import axios from "axios";
import "./Reviews.css";

const Reviews = () => {
  const [input, setInput] = useState("");
  const [reviews, setReview] = useState();
  let navigate = useNavigate();

  const postReview = () => {
    let postPath = `/post-reviews`;
    navigate(postPath);
  };

  const inputHandler = (event) => {
    let lowerCase = event.target.value.toLowerCase();
    setInput(lowerCase);
  };

  const sellerFilter = () => {
    const sellerSearchInput = document.getElementById("seller-search");
    axios.get("/seller/reviews", {
      sellerReview: sellerSearchInput.value,
    });
    navigate("/seller-reviews");
    console.log("clicked");
  };

  const productFilter = async () => {
    const productSearchInput = document.getElementById("product-search");
    await axios.get("/reviews", { productName: productSearchInput.value });
    navigate("/product-reviews");
    console.log("clicked");
    return productFilter;
  };

  useEffect(() => {
    fetch("/reviews")
      .then((res) => res.json())
      .then((reviews) => setReview(reviews));
  });

  return (
    <>
      <div className='hero-section'>
        <h1 className='reviews-page-header'>Reviews</h1>
        <div className='search-filters-div'>
        <div className='seller-filter-div'>
          <div className='search-row'>
            <div className='search-input-button'>
              <input
                id='seller-search'
                className='text-input-white'
                type='text'
                placeholder='Search by seller name'
                input={input}
                onChange={inputHandler}
              />
              <button
                className='clear-btn-sm search seller-search-button'
                onClick={sellerFilter}
              >
                Search Seller
              </button>
            </div>
            <div className='search-input-button'>
              <input
                id='product-search'
                className='text-input-white'
                type='text'
                placeholder='Search by product name'
                input={input}
                onChange={inputHandler}
              />
              <button
                className='clear-btn-sm product-search-button'
                onClick={productFilter}
              >
                Search Product
              </button>
            </div>
          </div>
          <button className='clear-btn-green-border post-a-review-button' onClick={postReview}>
            Post A Review
          </button>
        </div>
        </div>
      </div>
      <div className='reviews-container'>
        {reviews?.map((review, userReview) => (
          <div key={userReview} className='reviews-item'>
            <h1 className='reviews-header'>
              Reviewer: {review.reviewerName}, Seller: {review.sellerName},
              Product: {review.productName}
            </h1>{" "}
            <div className='reviews-div'>{review.review}</div> <hr />
          </div>
        ))}
      </div>
      <div className="page-pagination-container">
        <Pagination
          className='page-pagination'
          color='primary'
          variant='outlined'
          count={20}>
        </Pagination>
      </div>
    </>
  );
};

export default Reviews;