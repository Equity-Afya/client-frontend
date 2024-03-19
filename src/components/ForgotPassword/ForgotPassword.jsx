import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {

      const response = await axios.post('https://062d-102-210-244-74.ngrok-free.app/api/patient/forgotpassword', {
        email
      });
  
      alert(response.data.message);
  
      if (response.status === 200) {
        navigate('/otp-password', { state: { email } });
      }
    } catch (error) {
      alert('Password reset failed. Please check your email.');
      console.error('Password Reset Error:', error);
    }
    finally {
      setLoading(false); 
    }
  };
 
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#DEE1E6' }}>
      <Box sx={{ width: 500, p: 4, borderRadius: 3, bgcolor: 'white', textAlign: 'center',height:'500px' }}>
        <Typography variant='h3' sx={{color:"#c00100",fontWeight:'bold',marginBottom:"20px"}}>TeleAfia</Typography>
        <Typography variant="h5" gutterBottom sx={{fontWeight:'bold',marginBottom:'40px'}}>_Password Reset_</Typography>
        <Typography variant="body1" gutterBottom>Enter your email address to receive a Verification Code</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            sx={{ mt: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2,backgroundColor:'#c00100',marginTop:'20px', cursor:'pointer', hover: {
              backgroundColor: '#c00100'}
            }}
          >
            {loading ? 'Loading...' : 'Get code'}
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default ForgotPassword;