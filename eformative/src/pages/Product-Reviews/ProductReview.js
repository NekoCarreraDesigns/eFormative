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
      <h1 className='product-review-header'>Product Reviews</h1>
      {products?.map((products, productDisplay) => (
        <div key={productDisplay}>
          <h1>
            Product:{products.productName}, Reviewer:{products.reviewerName}
          </h1>
          <p>{products.review}</p>
        </div>
      ))}
    </>
  );
};

export default ProductReview;
