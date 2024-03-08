import React, { useState } from 'react';
import { TextField, Button, Container, CssBaseline, Typography, Grid, Box } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';


const PasswordReset = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleVerify = () => {
    // Add verification logic here
    console.log('Verification initiated for code:', verificationCode);
  };

  const handleReset = (e) => {
    e.preventDefault();
    // Add password reset logic here
  };

  return (
    <Container 
    component="main"
    display="flex"
    flex-direction="column"
    align-items="center"
    margin="auto"
    margin-top="100px"
    maxWidth="xs"
    >
      <CssBaseline />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        className='wrapper'
      >
        
        <Box
        display='flex'
        justify-content='center'
        align-items= 'center'
        >
            <LockIcon alt='Reset Password' />

            </Box>
        
        <form style={{ width: '100%' }}>
          <Box
            display='Flex'
            gap='10px'
            border-radius='10px'
            align content='space-between'
          >
            <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="verificationCode"
            label="Verification Code"
            placeholder='Verification Code'
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
        <Button
           sx={{
            height:'50px',
             width: "50px",
             margin: 'auto',
    
             borderRadius: '5px',
             padding: '15px 15px 35px 15px',
             cursor: 'pointer',
             color: 'maroon',
             border: '1px solid maroon'
           }}
            
            variant="contained"
            color="secondary"
            className='verifyButton'
            onClick={handleVerify}
          >
            Verify
          </Button>
          </Box>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            id="password"
            label="Password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            id="confirmPassword"
            label="Confirm Password"
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          
          <Button
            sx={{backgroundColor:"maroon"

            }}
            type='submit'
            fullWidth
            variant="contained"
            color='primary'
            onClick={handleReset}
          >
            Reset
          </Button>
         
        </form>
      </Box>
    </Container>
  );
};

export default PasswordReset;
