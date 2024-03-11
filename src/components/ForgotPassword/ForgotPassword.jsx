import React, { useState } from 'react';
import { TextField, Button, Container, CssBaseline, Box, Paper, Typography, Link } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
//import MailOutlineIcon from '@material-ui/icons/MailOutline';



function ForgotPassword() {
    const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleGetCode = () => {
    // Perform actions to get the verification code
    // For example, you can make an API call or trigger a verification process
    // Simulating a successful code retrieval
    setIsCodeSent(true);
  };

  const handleTryAnotherWay = () => {
    // Perform actions to try another way
    console.log('Try another way clicked');
    // Reset the state to the initial stage
    setIsCodeSent(false);
    setEmail('');
    setVerificationCode('');
  };

  const handleReset = () => {
    // Perform actions to handle the reset based on the verification code
    console.log('Reset password with verification code:', verificationCode);
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
            <LockIcon alt='Forgot Password' />
          </Paper>
        </Box>
        <Typography variant="h4" align="center" gutterBottom>
          Password Reset
        </Typography>
        <Typography variant="body2" align="center" paragraph>
            {isCodeSent ? 'Please enter the verification code sent to your email.'
            :'Please enter your email address/phone number to receive a verification code.'}
        </Typography>
        {isCodeSent ? (
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
        ) : (
            <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="ForgotPassword"
            label="Forgot Password"
            placeholder="Forgot Password"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />    
        )}
          <Button
            type='submit'
            fullWidth
            variant="contained"
            color="primary"
            className='submit'
            onClick={isCodeSent ? handleReset : handleGetCode}
            style={{
                backgroundColor: "#C00100",
                color: "#fff",
                marginTop: "16px",
              }}
          >
            {isCodeSent ? 'Reset Password' : 'Get Code'}
          </Button>
          <br />
          {isCodeSent && (
          <Link href="#" underline="none" color="#C00100" onClick={handleTryAnotherWay}>
            Try another way
            </Link>
          )}
        </Box>
    </Container>
    
  );
}

export default ForgotPassword