import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';

const theme = createTheme({
  palette: {
    primary: {
      main: '#c00100',
    },
  },
});

const PaymentsMode = ({ billingId }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isCardInfoValid, setIsCardInfoValid] = useState(false);

  // Function to retrieve tokens from local storage
  const getTokensFromStorage = () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('Refresh-Token');
    return { accessToken, refreshToken };
  };

  const handleLipaNaMpesaClick = () => {
    if (validateMobileNumber(mobileNumber)) {
      const mpesaData = {
        mobileNumber: mobileNumber,
        billingId: billingId,
      };

      const { accessToken, refreshToken } = getTokensFromStorage();

      fetch('https://b87f-102-210-244-74.ngrok-free.app/api/payments/makestkpayments/B00001', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'Refresh-Token': `Bearer ${refreshToken}`,
        },
        body: JSON.stringify(mpesaData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Response from backend:', data);
          // Further processing if needed
        })
        .catch((error) => {
          console.error('Error sending mobile number to backend:', error);
        });
    } else {
      console.error('Invalid mobile number');
    }
  };

  const handleConfirmClick = () => {
    const cardData = {
      cardNumber: cardNumber,
      expiryDate: expiryDate,
      cvv: cvv,
      amount: amount,
      billingId: billingId,
    };

    const { accessToken, refreshToken } = getTokensFromStorage();

    fetch('https://eb76-102-210-244-74.ngrok-free.app/api/cardpayment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Refresh-Token': `Bearer ${refreshToken}`,
      },
      body: JSON.stringify(cardData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response from card payment backend:', data);
        // Further processing if needed
      })
      .catch((error) => {
        console.error('Error sending card data to backend:', error);
      });
  };

  const validateMobileNumber = (value) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(value);
  };

  const handleMobileNumberChange = (e) => {
    const value = e.target.value;
    setMobileNumber(value);
  };

  const handleCardInfoChange = () => {
    setIsCardInfoValid(
      cardNumber.trim() !== '' &&
        expiryDate.trim() !== '' &&
        cvv.trim() !== '' &&
        amount.trim() !== ''
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        style={{
          height: '450px',
          marginTop: '20px',
          width: '500px',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '20px',
        }}
      >
        <h4
          style={{
            margin: '0',
            padding: '5px 180px',
            outline: '1px solid #600100',
            textAlign: 'center',
          }}
        >
          Pay Via
        </h4>

        {/* Box 1: Lipa na M-Pesa */}
        <Box
          style={{
            outline: '1px solid #600100',
            borderRadius: '10px',
            padding: '20px',
            marginBottom: '10px',
            marginTop: '10px',
          }}
        >
          <h4 style={{ marginTop: '0', textAlign: 'left' }}>Lipa na M-Pesa</h4>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              style={{ flex: '1' }}
              label="Enter Mobile Number"
              variant="outlined"
              value={mobileNumber}
              onChange={handleMobileNumberChange}
            />
          </div>
          <Button
            style={{
              backgroundColor: '#c00100',
              color: 'white',
              borderRadius: '10px',
              width: '25%',
              marginLeft: '75%',
              marginTop: '2px',
              paddingBottom: '0',
            }}
            onClick={handleLipaNaMpesaClick}
            disabled={!validateMobileNumber(mobileNumber)}
          >
            Send
          </Button>
        </Box>

        {/* Box 2: Pay with card */}
        <Box
          style={{
            outline: '1px solid #600100',
            borderRadius: '10px',
            padding: '20px',
            marginBottom: '30px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <h4 style={{ marginTop: '0', flex: '1', textAlign: 'left' }}>
              Pay with card
            </h4>
          </div>
          <div
            style={{ marginTop: '15px', marginBottom: '20px', display: 'flex' }}
          >
            <TextField
              style={{ flex: '1', marginRight: '20px' }}
              label="Enter Card Number"
              variant="outlined"
              value={cardNumber}
              onChange={(e) => {
                setCardNumber(e.target.value);
                handleCardInfoChange();
              }}
            />
            <TextField
              style={{ flex: '1' }}
              label="Expiry Date"
              variant="outlined"
              value={expiryDate}
              onChange={(e) => {
                setExpiryDate(e.target.value);
                handleCardInfoChange();
              }}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <TextField
              style={{ flex: '1', marginRight: '20px' }}
              label="CVV"
              variant="outlined"
              value={cvv}
              onChange={(e) => {
                setCvv(e.target.value);
                handleCardInfoChange();
              }}
            />
            <TextField
              style={{ flex: '1' }}
              label="Amount"
              variant="outlined"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                handleCardInfoChange();
              }}
            />
          </div>
          <Button
            style={{
              backgroundColor: '#c00100',
              color: 'white',
              borderRadius: '10px',
              width: '30%',
              marginLeft: '70%',
              marginTop: '15px',
            }}
            onClick={handleConfirmClick}
            disabled={!isCardInfoValid}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

PaymentsMode.propTypes = {
  billingId: PropTypes.string,
};

export default PaymentsMode;
