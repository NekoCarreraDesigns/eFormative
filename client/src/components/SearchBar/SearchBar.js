import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      if (searchTerm.trim() !== "") {
        const response = await fetch(`/market/search?term=${encodeURIComponent(searchTerm)}`);
        if (response.ok) {
          const items = await response.json();
          setSearchResults(items);
        } else {
          alert("Failed to fetch search results");
          console.error("Error fetching results", response.status);
        }
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error("Error during search", err);
    }
  };
  
  const handleClear = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <div className='market-filter-input-div'>
      <input
        className='market-filter-input'
        type='text'
        placeholder='What are you looking for?'
        id='search-bar'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="search-input"
      />
      <div className='market-button-container'>
        <button className='search-button clear-btn-sm' onClick={handleSearch}>
          Search
        </button>
        <button className='clear-button clear-btn-sm' onClick={handleClear}>
          Clear
        </button>
      </div>
      {/* Display search results */}
      <div className="card-container">
        {searchResults.map((item, index) => (
          <Card elevation={6} className='item-card' key={index}>
          <CardHeader
            title={item.product}
            subheader={item.sellerName}
          />
          <CardMedia
            image='http://placehold.jp/150x150.png'
            title={item.product}
          />
          <CardContent>
            <Typography variant='body2' color='textSecondary' component='p'>
              {item.description}
              {item.price}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton>
              <FontAwesomeIcon icon={faStar} size='1x' color='gold' />
            </IconButton>
          </CardActions>
        </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
