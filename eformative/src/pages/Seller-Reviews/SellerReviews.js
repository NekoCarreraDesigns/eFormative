import React, { useEffect, useState } from "react";
import "./SellerReviews.css";

const SellerReviews = () => {
  const [sellers, setSellers] = useState();

  useEffect(() => {
    fetch("/reviews")
      .then((res) => res.json())
      .then((sellers) => setSellers(sellers));
  });

  return (
    <>
      <h1 className='seller-reviews-header'>Seller Reviews</h1>
      {sellers?.map((sellers, reviewDisplay) => (
        <div key={reviewDisplay}>
          <h1>
            Seller: {sellers.sellerName}, Reviewed by: {sellers.reviewerName}
          </h1>
          <p>{sellers.review}</p>
        </div>
      ))}
    </>
  );
};

export default SellerReviews;
