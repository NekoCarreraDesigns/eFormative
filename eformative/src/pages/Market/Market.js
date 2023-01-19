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
  TextField,
  IconButton,
} from "@mui/material";

// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Market = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedItems, setDisplayedItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await axios.get("/market", {
        params: { search: searchTerm },
      });
      setItems(res.data);
    };
    fetchItems();
  }, [searchTerm]);

  const handleSave = (itemId) => {
    setLoading(true);
    axios
      .post("/items/saved", { itemId })
      .then((response) => {
        console.log(response);
        setSavedItems([...savedItems, response.data]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const searchBarInput = event.target.value;
    setSearchTerm(searchBarInput.value);
    setDisplayedItems(
      items.filter((item) => item.product.includes(searchTerm))
    );
  };

  return (
    <>
      <Typography variant='h3' className='market-page-header'>
        Market
      </Typography>
      <div className='market-filter-div'>
        <div className='market-filter-input-div'>
          <form onSubmit={handleSearch}>
            <TextField
              className='market-filter-input'
              type='text'
              placeholder='search here'
              id='search-bar'
              value={searchTerm}></TextField>
            <Button
              variant='contained'
              color='success'
              size='medium'
              className='search-button'
              type='submit'>
              Search
            </Button>
            <Button
              className='clear-button'
              variant='contained'
              size='medium'
              type='button'
              color='error'
              onClick={() => setSearchTerm("")}>
              Clear
            </Button>
          </form>
        </div>
      </div>
      {displayedItems.length > 0 ? (
        <Grid container spacing={3}>
          {displayedItems.map((item, index) => (
            <Grid item xs={3} key={index}>
              <Card elevation={6} className='item-card'>
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
                    {/* <FavoriteBorderIcon /> */}
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className='alert-div'>
          <Typography variant='body1' className='alert-paragraph'>
            No results found! Could be a misspelling or it is not here
          </Typography>
        </div>
      )}
    </>
  );
};

export default Market;
