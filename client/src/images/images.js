import React, { useEffect, useState } from "react";

const OnImageChange = ({ files }) => {
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    const newImageURLs = [];
    files.forEach((file) => {
      const imageURL = URL.createObjectURL(file);
      newImageURLs.push(imageURL);
    });
    setImageURLs(newImageURLs);

    return () => {
      newImageURLs.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  return (
    <>
      {imageURLs.map((imageURL, index) => (
        <img key={index} src={imageURL} alt={`${index}`} />
      ))}
    </>
  );
};

export default OnImageChange;
