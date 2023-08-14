import React, { useEffect, useState } from "react";
import "./ProductReview.css";

const ProductReview = () => {
  const [products, setProducts] = useState();
  useEffect(() => {
    fetch("/reviews")
      .then((res) => res.json())
      .then((products) => setProducts(products));
  });
  return (
    <>
      <div className='hero-section'>
        <h1 className='product-review-header'>Product Reviews</h1>
      </div>
      <div className='reviews-container'>
        {products?.map((products, productDisplay) => (
          <div key={productDisplay} className='reviews-item'>
            <h1 className='reviews-header'>
              Product:{products.productName}, Reviewer:{products.reviewerName}
            </h1>{" "}
            <div className='reviews-div'>{products.review}</div> <hr />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductReview;
