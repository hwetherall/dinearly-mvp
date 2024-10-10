// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../hooks/useAuth';
import { Container, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { format } from 'date-fns';

function Profile() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchBookings = async () => {
    setError(null);
    const { data, error } = await supabase
      .from('bookings')
      .select('id, restaurant_id, name, email, booking_date, created_at, restaurants(name)')
      .eq('email', user.email)
      .order('booking_date', { ascending: true });

    if (error) {
      setError(error.message);
    } else {
      setBookings(data);
    }
  };

  const futureBookings = bookings.filter(
    (booking) => new Date(booking.booking_date) >= new Date()
  );

  const pastBookings = bookings.filter(
    (booking) => new Date(booking.booking_date) < new Date()
  );

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Typography variant="h6">Welcome, {user.email}</Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h5" gutterBottom>
        Future Bookings
      </Typography>
      {futureBookings.length > 0 ? (
        <List>
          {futureBookings.map((booking) => (
            <ListItem key={booking.id}>
              <ListItemText
                primary={`${booking.restaurants.name} - ${format(
                  new Date(booking.booking_date),
                  'yyyy-MM-dd'
                )}`}
                secondary={`Booked on: ${format(new Date(booking.created_at), 'yyyy-MM-dd')}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No upcoming bookings.</Typography>
      )}
      <Divider sx={{ my: 2 }} />
      <Typography variant="h5" gutterBottom>
        Past Bookings
      </Typography>
      {pastBookings.length > 0 ? (
        <List>
          {pastBookings.map((booking) => (
            <ListItem key={booking.id}>
              <ListItemText
                primary={`${booking.restaurants.name} - ${format(
                  new Date(booking.booking_date),
                  'yyyy-MM-dd'
                )}`}
                secondary={`Booked on: ${format(new Date(booking.created_at), 'yyyy-MM-dd')}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No past bookings.</Typography>
      )}
      {error && (
        <Typography variant="body1" color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Container>
  );
}

export default Profile;
