import React from "react";
import { useState, useEffect } from "react";
import "./Reviews.css";

const Reviews = () => {
  const [reviews, setReview] = useState();

  useEffect(() => {
    fetch("/reviews")
      .then((res) => res.json())
      .then((reviews) => setReview(reviews));
  });

  return (
    <>
      <h1 className='reviews-page-header'>Reviews</h1>
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
