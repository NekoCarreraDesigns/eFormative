import React from "react";
import "./PostItem.css";

const username = "SnuggleBunny84";

const PostItem = () => {
  return (
    <>
      <h1 className='post-item-header'>Welcome {username}!</h1>;
      <p className='post-item-paragraph'>Please post your item!</p>;
      <div className='post-item-form-div'>
        <form>
          <input
            className='item-name-input'
            type='text'
            name='item-name'
            placeholder='Please input item name'></input>
          <br />
          <button
            className='upload-picture-video-button'
            name='post-item-picture-video'>
            Upload a picture or video
          </button>
          <br />
          <input
            className='item-price-input'
            type='text'
            name='item-price'
            placeholder='Please input a price'></input>
          <br />
          <textarea className='post-item-textarea' type='text'></textarea>
          <br />
          <button className='add-item-button' type='submit'>
            Post Item
          </button>
        </form>
      </div>
    </>
  );
};

export default PostItem;
