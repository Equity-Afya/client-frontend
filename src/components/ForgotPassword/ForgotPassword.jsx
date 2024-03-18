import React, { useState } from 'react';
import { TextField, Button, Container, CssBaseline, Box, Paper, Typography, Link, Card, CardContent } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [selectedOption, setSelectedOption] = useState('email');

    const handleGetCode = async () => {
        try {
            const response = await axios.post('https://1d34-102-210-244-74.ngrok-free.app/api/patient/forgotpassword', {
                email: selectedOption === 'email' ? email : null,
                phoneNumber: selectedOption === 'phoneNumber' ? phoneNumber : null,
            });
            setIsCodeSent(true);
        } catch (error) {
            console.error('Error sending verification code:', error);
        }
    };

    const handleTryAnotherWay = () => {
        setSelectedOption(selectedOption === 'email' ? 'phoneNumber' : 'email');
        setIsCodeSent(false);
        setEmail('');
        setPhoneNumber('');
        setVerificationCode('');
    };

    const handleReset = async () => {
        try {
            const response = await axios.post('https://1d34-102-210-244-74.ngrok-free.app/api/patient/resetpassword', {
                verificationCode,
                newPassword: 'newPassword', // Change this to the actual new password input value
            });
            // Optionally, you can navigate to another page upon successful password reset
            return <Navigate to="/reset-password" />;
        } catch (error) {
            console.error('Error resetting password:', error);
        }
    };

    return (
        <Container component="main" maxWidth="xs" style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
            <CssBaseline />
            <Card>
                <CardContent>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        padding="3"
                        className='wrapper'
                    >
                        <Box mb={3}>
                            <Paper elevation={3} style={{ padding: '10px', borderRadius: '50%', borderStyle: 'solid', borderColor: '#C00100' }}>
                                <LockIcon alt='Forgot Password' />
                            </Paper>
                        </Box>
                        <Typography variant="h4" align="center" gutterBottom>
                            Password Reset
                        </Typography>
                        <Typography variant="body2" align="center" paragraph>
                            {isCodeSent ? `Please enter the verification code sent to your ${selectedOption}` : `Please enter your ${selectedOption === 'email' ? 'email address' : 'phone number'} to receive a verification code.`}
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
                                id={selectedOption === 'email' ? "EmailAddress" : "PhoneNumber"}
                                label={selectedOption === 'email' ? "Email Address" : "Phone Number"}
                                placeholder={selectedOption === 'email' ? "Email Address" : "Phone Number"}
                                value={selectedOption === 'email' ? email : phoneNumber}
                                onChange={(e) => selectedOption === 'email' ? setEmail(e.target.value) : setPhoneNumber(e.target.value)}
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
                </CardContent>
            </Card>
        </Container>
    );
}

export default ForgotPassword;
