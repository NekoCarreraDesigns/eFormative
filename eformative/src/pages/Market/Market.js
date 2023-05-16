import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Market.css";
import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  Pagination,
  TextField,
  IconButton,
  Snackbar,
  CircularProgress,
} from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Market = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedItems, setDisplayedItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const res = await axios.get("/market", {
        params: { search: searchTerm },
      });
      setItems(res.data);
      setDisplayedItems(res.data);
    };
    fetchItems();
  }, []);
 
  const handleSave = async (itemId) => {
    setLoading(true);
    <CircularProgress aria-busy='true' />;
    try {
      await axios.post("/items/saved", { itemId: itemId });
      setSavedItems([...savedItems, itemId]);
      setSuccessMessage("Item saved successfully");
    } catch (error) {
      console.log(error);
      setErrorMessage("Error saving item");
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const searchBarInput = document.getElementById("search-bar");
    const searchTerm = searchBarInput.value.toLowerCase();
    setDisplayedItems(
      items.filter((item) => item.product.toLowerCase().includes(searchTerm))
    );
  };

  return (
    <>
      <div className='hero-section'>
        <h1 className='market-page-header'>
          Market
        </h1>
        <div className='market-filter-div'>
          <div className='market-filter-input-div'>
            <form onSubmit={handleSearch}>
              <TextField
                className='market-filter-input'
                type='text'
                placeholder='What are you looking for?'
                id='search-bar'
                value={searchTerm}></TextField>
              <div className='market-button-container'>
              <button
                className='search-button clear-btn-sm'
                type='submit'
              >
                Search
              </button>
              <button
                className='clear-button clear-btn-sm'
                type='button'
                onClick={() => setSearchTerm("")}
              >
                Clear
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {displayedItems.length > 0 ? (
        <div className='card-container'>
          {displayedItems.map((item, index) => (
            <Card elevation={6} className='item-card' key={index}>
              <CardHeader title={item.product} subheader={item.sellerName} />
              <CardMedia
                image='http://placehold.jp/150x150.png'
                title={item.product}
              />
              <CardContent>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'>
                  {item.description}
                  {item.price}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleSave(item.id)}>
                  <FontAwesomeIcon icon={faStar} size='1x' color='gold' />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </div>
      ) : (
        <div className='alert-div'>
          <Typography variant='body1' className='alert-paragraph'>
            No results found! Could be a misspelling or it is not here
          </Typography>
        </div>
      )}
      {successMessage && (
        <Snackbar
          open={!!successMessage}
          autoHideDuration={3000}
          onClose={() => setSuccessMessage("")}
          message={successMessage}
        />
      )}
      {errorMessage && (
        <Snackbar
          open={!!errorMessage}
          autoHideDuration={3000}
          onClose={() => setErrorMessage("")}
          message={errorMessage}
        />
      )}
      <div className="page-pagination-container">
        <Pagination
          className='page-pagination'
          color='primary'
          variant='outlined'
          count={20}>
        </Pagination>
      </div>
    </>
  );
};

export default Market;
