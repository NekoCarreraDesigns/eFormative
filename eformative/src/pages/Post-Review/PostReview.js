import React from "react";
import { useEffect } from "react";
import "./PostReview.css";

const PostReview = () => {
  const postBody = {
    sellerName: "Candace",
    productName: "E-Scooter",
    review: "hated it!",
  };
  useEffect(() => {
    fetch("/product/reviews/post", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(postBody),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  });
  return (
    <>
      <h1 className='post-review-header'>Post A Review</h1>
      <input type='text' placeholder='please enter your name'></input>
      <br />
      <input type='text' placeholder='product being reviewed'></input>
      <br />
      <button>Upload Photo or video</button>
      <br />
      <textarea className='user-post-review-textarea'></textarea>
      <br />
      <button onClick={useEffect}>Submit</button>
    </>
  );
};

export default PostReview;
