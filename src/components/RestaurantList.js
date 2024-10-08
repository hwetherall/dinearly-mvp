// src/components/RestaurantList.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    const { data, error } = await supabase.from('restaurants').select('*');
    if (error) {
      console.error('Error fetching restaurants:', error);
    } else {
      console.log('Fetched restaurants:', data); // Debugging
      setRestaurants(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Restaurants
        </Typography>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Restaurants
      </Typography>
      <List>
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <ListItem button component={Link} to={`/restaurant/${restaurant.id}`} key={restaurant.id}>
              <ListItemText primary={restaurant.name} secondary={restaurant.description} />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1">No restaurants available.</Typography>
        )}
      </List>
    </Container>
  );
}

export default RestaurantList;
