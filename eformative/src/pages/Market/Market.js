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
  Button,
} from "@mui/material";

const Market = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedItems, setDisplayedItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await axios.get("/market", {
        params: { search: searchTerm },
      });
      setItems(res.data);
    };
    fetchItems();
  }, [searchTerm]);

  const handleSearch = (event) => {
    event.preventDefault();
    const searchBarInput = event.target;
    setSearchTerm(searchBarInput.value);
    setDisplayedItems(
      items.filter((item) => item.product.includes(searchTerm))
    );
  };

  return (
    <>
      <h1 className='market-page-header'>Market</h1>
      <div className='market-filter-div'>
        <div className='market-filter-input-div'>
          <h2 className='market-search-filters-header'>Search Here</h2>
          <form onSubmit={handleSearch}>
            <input
              className='market-filter-input'
              type='text'
              placeholder='search here'
              id='search-bar'
              value={searchTerm}></input>
            <button type='submit'>Search</button>
            <button type='button' onClick={() => setSearchTerm("")}>
              Clear
            </button>
          </form>
        </div>
      </div>
      <Grid container spacing={3}>
        {displayedItems.map((item, index) => (
          <Grid item xs={3} key={index}>
            <Card variant='outlined' elevation={6} className='item-card'>
              <CardHeader title={item.product} subheader={item.sellerName} />
              <CardMedia
                image='http://placehold.jp/150x150.png'
                title={item.product}
              />
              <CardContent>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small' color='primary'>
                  {item.price}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Market;
