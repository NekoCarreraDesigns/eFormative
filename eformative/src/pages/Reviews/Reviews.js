import React from "react";
import { useState, useEffect } from "react";
import "./Reviews.css";

const Reviews = () => {
  const [reviews, setReview] = useState();
  const [seller, setSeller] = useState();

  useEffect(() => {
    fetch("/reviews")
      .then((res) => res.json())
      .then((reviews) => setReview(reviews));
  });

  const sellerFilter = () => {
    fetch("/seller/reviews/:id")
      .then((response) => response.json())
      .then((seller) => setSeller(seller));
    console.log(seller);
  };

  return (
    <>
      <h1 className='reviews-page-header'>Reviews</h1>
      <div className='search-filters-div'>
        <div className='seller-filter-div'>
          <h2 className='search-filters-header'>Search filters</h2>
          <input type='text' placeholder='search by seller name'></input>
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
        </div>
      </div>
      {reviews?.map((review, userReview) => (
        <div key={userReview}>
          <h1 className='reviews-header'>
            Seller: {review.sellerName}, Product: {review.productName}
          </h1>{" "}
          <div className='reviews-div'>{review.review}</div> <hr />
        </div>
      ))}
    </>
  );
};

export default Reviews;
