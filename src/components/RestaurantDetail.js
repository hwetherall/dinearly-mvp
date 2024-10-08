// src/components/RestaurantDetail.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useParams } from 'react-router-dom';
import BookingForm from './BookingForm';
import { Container, Typography, Button, List, ListItem, ListItemText, CircularProgress, Dialog, DialogTitle, DialogContent } from '@mui/material';

function RestaurantDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      console.log(`Fetching restaurant with id: ${id}`);
      
      // Removed the premature console.log
      // console.log('Fetched restaurant:', data); // This was causing the error

      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('id', id)// Convert id to number
        .single();

      if (error) {
        console.error('Error fetching restaurant details:', error);
      } else {
        console.log('Fetched restaurant:', data); // Correct placement after data is fetched
        setRestaurant(data);
      }
      setLoading(false);
    };

    fetchRestaurantDetails();
  }, [id]);

  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const formattedDate = date.toISOString().split('T')[0];
      dates.push(formattedDate);
    }
    return dates;
  };

  const handleBookClick = (date) => {
    setSelectedDate(date);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Restaurant Details
        </Typography>
        <CircularProgress />
      </Container>
    );
  }

  if (!restaurant) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Restaurant Not Found
        </Typography>
      </Container>
    );
  }

  const availableDates = generateAvailableDates();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {restaurant.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {restaurant.description}
      </Typography>
      {restaurant.image_url && (
        <img src={restaurant.image_url} alt={restaurant.name} style={{ maxWidth: '100%', height: 'auto' }} />
      )}
      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
        Available Dates to Book
      </Typography>
      <List>
        {availableDates.map((date) => (
          <ListItem key={date} divider>
            <ListItemText primary={date} />
            <Button variant="contained" color="primary" onClick={() => handleBookClick(date)}>
              Book
            </Button>
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Book for {selectedDate}</DialogTitle>
        <DialogContent>
          <BookingForm restaurantId={id} bookingDate={selectedDate} onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default RestaurantDetail;
