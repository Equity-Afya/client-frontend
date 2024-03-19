import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://cf72-102-210-244-74.ngrok-free.app/api/patient/login', {
        email,
        password
      });

      alert(response.data.message); // Display login status message

      // Redirect to Home page on successful login
      if (response.status === 200) {
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setErrorMessage('Email not verified. Please verify your email to login.');
      } else {
        setErrorMessage('Login failed. Please check your credentials.');
      }
      console.error('Login Error:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#DEE1E6',
      }}
    >
      <Box
        sx={{
          width: 500,
          p: 4,
          borderRadius: 3,
          bgcolor: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ color: '#c00100', fontWeight: 'bold', marginBottom: 4 }}>TeleAfia</Typography>
        <Typography variant="h5" gutterBottom sx={{ marginBottom: '35px', fontWeight: 'bold' }}>__________User Login_________</Typography>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              variant="outlined"
              placeholder='Enter your email'
              required // Marked as required
              fullWidth
            /><br /><br />
          </div>
          <div>
            <TextField
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              variant="outlined"
              placeholder='Enter your password'
              required // Marked as required
              fullWidth
            /><br /><br />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              inputProps={{ 'aria-label': 'Remember me' }}
            />
            <Typography>Remember me</Typography>
            <Link to='/forgot-password' style={{ textDecoration: 'none', marginLeft: 'auto', color: '#c00100' }}>Forgot password?</Link>
          </div>
          <br />
          <Button type='submit' variant="contained" sx={{ backgroundColor: '#c00100', width: '300px' }}>Login</Button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form><br />
        <div>
          <Typography variant='body1' sx={{ textAlign: 'center', marginTop: 1}}>  Don't have an account?
          <Link to='/register' style={{ textDecoration: 'none', color: '#c00100' }}> Sign Up </Link>
          </Typography>
        </div>
      </Box>
    </Box>
  );
}

export default Login;

