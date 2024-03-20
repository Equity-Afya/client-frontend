import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

function OtpPassword() {
    const [passOtp, setPassOtp] = useState('');
    const [message, setMessage] = useState('');
    const [loadingVerify, setLoadingVerify] = useState(false);
    const [loadingResend, setLoadingResend] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
   
    const email = location.state?.email || '';

    const handleInputChange = (value) => {
        setPassOtp(value);
    };

    const handleVerifyPassOTP = async (e) => {
        e.preventDefault();
        setLoadingVerify(true);
        try {
            const response = await axios.post("https://d3a9-102-210-244-74.ngrok-free.app/api/patient/verifypasswordotp", { enteredPassOtp: passOtp });

            if (response.status === 200) { 
                setMessage('OTP verified');
                navigate('/reset-password');
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            setMessage("Wrong OTP.");
        }
    
        setLoadingVerify(false);
        finally {
            setLoadingVerify(false);
        }   
    };

    const handleResendPassOTP = async () => {
        setLoadingResend(true);
        try {
            const response = await axios.post(
              "https://062d-102-210-244-74.ngrok-free.app/api/patient/resendpasswordotp",
              { email }
            );
            const response = await axios.post("https://d3a9-102-210-244-74.ngrok-free.app/api/patient/resendpasswordotp", { email });

            if (response.status === 200) {
                setMessage(response.data.message);
            } else {
                setMessage("Failed to resend OTP. Please try again later.");
            }
        } catch (error) {
            console.error("Error resending OTP:", error);
            setMessage("An error occurred while resending OTP. Please try again later.");
        }

        setLoadingResend(false);
        finally {
            setLoadingResend(false);
        }        
    };

    return (
        <Box sx={{ backgroundColor: '#DEE1E6', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box className='ver2' sx={{ padding: 3, borderRadius: 3, backgroundColor: 'white', textAlign: 'center',width:'400px',height:'500px' }}>
                <Typography variant="h3" color='primary' gutterBottom sx={{ fontWeight: 'bold',color:'#c00100' }}>TeleAfia</Typography>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold',marginBottom:'30px' }}>OTP Verification</Typography>
                <Typography gutterBottom>A verification code has been sent to your email address.</Typography>
                <Typography gutterBottom sx={{marginTop:'20px',marginBottom:'10px'}}>{message}</Typography>
                <form onSubmit={handleVerifyPassOTP}>
                    <TextField
                        label="Verification code"
                        variant="outlined"
                        type="text"
                        value={passOtp}
                        onChange={(e) => handleInputChange(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Button type="submit" variant="contained" disabled={loadingVerify} sx={{ mr: 0,backgroundColor:'#c00100' }}>
                        {loadingVerify ? <CircularProgress size={24} color="inherit" /> : 'Verify OTP'}
                    </Button>
                </form>
                <Button onClick={handleResendPassOTP} disabled={loadingResend} sx={{marginTop:'20px',border: '1px solid black',backgroundColor: 'white', }}>
                    {loadingResend ? <CircularProgress size={24} color="inherit" /> : 'Resend OTP'}
                </Button>
            </Box>
        </Box>
    );
}

export default OtpPassword;
