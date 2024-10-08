// src/components/BookingForm.js
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { TextField, Button, Box, Alert } from '@mui/material';

function BookingForm({ restaurantId, bookingDate, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Input Validation
    if (!name.trim() || !email.trim()) {
      setError('Name and Email are required.');
      return;
    }

    // Simple Email Format Check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Insert Booking into Supabase
    const { error } = await supabase.from('bookings').insert([
      {
        restaurant_id: restaurantId,
        name,
        email,
        booking_date: bookingDate,
      },
    ]);
    

    if (error) {
      console.error('Error making booking:', error);
      setError('There was an error making your booking. Please try again.');
    } else {
      setSuccess('Booking confirmed!');
      // Optionally, you can reset the form fields
      setName('');
      setEmail('');
      // Close the form after a short delay
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        fullWidth
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Box display="flex" justifyContent="flex-end">
        <Button onClick={onClose} color="secondary" sx={{ mr: 2 }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Confirm Booking
        </Button>
      </Box>
    </Box>
  );
}

export default BookingForm;
