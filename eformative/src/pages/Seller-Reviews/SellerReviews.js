import axios from "axios";
import React, { useState, useEffect } from "react";
import "./SellerReviews.css";

const SellerReviews = () => {
  const [seller, setSeller] = useState();
  useEffect(() => {
    getSellerReview();
  });

  const getSellerReview = async () => {
    const { data } = await axios.get("/seller/reviews");
    setSeller(data);
    console.log(data);
  };

  return (
    <>
      <h1 className='seller-reviews-header'>Seller Reviews</h1>
      {seller?.map((seller, reviewDisplay) => (
        <div key={reviewDisplay}>
          <h1>
            {seller.sellerName} {seller.reviewerName}
          </h1>
          <p>{seller.review}</p>
        </div>
      ))}
    </>
  );
};

export default SellerReviews;
