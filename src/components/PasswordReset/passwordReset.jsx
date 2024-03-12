import React, { useState } from 'react';
import { TextField, Button, Container, CssBaseline, Box, Paper } from '@mui/material';
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        className='wrapper'
      >
        <Box>
          <Paper elevation={3} style={{ padding: '10px', borderRadius: '51%', borderStyle: 'solid', borderColor: '#C00100'}}>
            <LockIcon alt='Reset Password' />
          </Paper>
        </Box>
        <form style={{ width: '100%' }}>
          <Box
            display='flex'
            gap='10px'
            borderRadius='10px'
            align item='space-between'
            MarginTop='20px'

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
            
            variant="contained"
            color="primary"
            className='verifyButton'
             style={{
            backgroundColor: "#C00100",
            color: "#fff",
            marginTop: "16px",
            marginBottom: "8px"
          }}
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
            type='submit'
            fullWidth
            variant="contained"
            color="primary"
            className='submit'
            onClick={handleReset}
            style={{
                backgroundColor: "#C00100",
                color: "#fff",
                marginTop: "16px",
              }}
          >
            Reset
          </Button>
        </form>
      </Box>
    </Container>
    
  );
};

export default PasswordReset;
