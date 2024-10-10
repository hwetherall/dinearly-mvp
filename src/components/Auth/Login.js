// src/components/Auth/Login.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Alert, CircularProgress } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';

function Login() {
  const { user, loading } = useAuth(); // Utilize the useAuth hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/profile'); // Redirect authenticated users to their profile
    }
  }, [user, loading, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const { user: loggedInUser, error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate('/profile'); // Redirect after successful login
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          required
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          required
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>
    </Container>
  );
}

export default Login;
