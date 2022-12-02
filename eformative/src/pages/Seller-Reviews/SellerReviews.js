import axios from "axios";
import React, { useState } from "react";
import "./SellerReviews.css";

const SellerReviews = () => {
  const [sellers, setSellers] = useState("");

  axios
    .get("/seller/reviews")
    .then((res) => res.json())
    .then((sellers) => setSellers(sellers));

  return (
    <>
      <h1 className='seller-reviews-header'>Seller Reviews</h1>
      {Object.values(sellers).map((sellers, reviewDisplay) => (
        <div key={reviewDisplay}>
          <h1>
            Seller: {sellers.sellerName}, Reviewed by: {sellers.reviewerName}
          </h1>
          <p>{sellers.SellerReview}</p>
        </div>
      ))}
    </>
  );
};

export default SellerReviews;
