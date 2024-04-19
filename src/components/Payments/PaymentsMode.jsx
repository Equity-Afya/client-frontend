import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { useState } from "react";
import { Box, Button, TextField, CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../../assets/Lipanampesa.png";
import myImage from "../../assets/CardImage.png";
import PropTypes from "prop-types";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

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
  const [mobileNumber, setMobileNumber] = useState("");
  const [paymentError, setPaymentError] = useState(null);
  const [loadingMpesa, setLoadingMpesa] = useState(false);
  const [loadingCard, setLoadingCard] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const stripePromise = loadStripe(
    "pk_test_51OyFrWRuEfqcYjyYRpY3UtADfKTeMjLRWHlLLdWEZ0vw7BwVzGwgIVoFZkF1rrQgILiLafzoSTYBgkqF0oFJrM7H00qYzKsf98"
  );

  // Function to retrieve tokens from local storage
  const getTokensFromStorage = () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("Refresh-Token");
    return { accessToken, refreshToken };
  };

  const handleLipaNaMpesaClick = async () => {
    setLoadingMpesa(true);
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
      try {
        const response = await fetch(
          "https://557b-102-210-244-74.ngrok-free.app/api/payments/makestkpayments/B00001",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
              "Refresh-Token": `Bearer ${refreshToken}`,
            },
            body: JSON.stringify(mpesaData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to make M-Pesa payment");
        }

        const data = await response.json();
        console.log("Response from M-Pesa backend:", data);
        // Further processing if needed
      } catch (error) {
        console.error("Error making M-Pesa payment:", error.message);
        setPaymentError("Failed to make M-Pesa payment");
      } finally {
        setLoadingMpesa(false);
      }
    } else {
      console.error("Invalid phone number");
    }
  };

  const handleConfirmClick = async () => {
    setLoadingCard(true);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (error) {
        throw new Error(error.message);
      }

      const cardData = {
        paymentMethodId: paymentMethod.id,
        billingId: billingId,
      };

      const { accessToken, refreshToken } = getTokensFromStorage();

      const response = await fetch(
        "https://557b-102-210-244-74.ngrok-free.app/api/payments/makecardpayments/B00001",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "Refresh-Token": `Bearer ${refreshToken}`,
          },
          body: JSON.stringify(cardData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to make card payment");
      }

      const data = await response.json();
      console.log("Response from card payment backend:", data);
      // Further processing if needed
    } catch (error) {
      console.error("Error making card payment:", error.message);
      setPaymentError("Failed to make card payment");
    } finally {
      setLoadingCard(false);
    }
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
          height: "28.125rem",
          marginTop: "4rem",
          width: "31.25rem",
          backgroundColor: "#ffffff",
          borderRadius: "1.25rem",
          padding: "1.25rem",
        }}
      >
        <h4
          style={{
            margin: '0',
            padding: '5px 180px',
            outline: '1px solid #600100',
            textAlign: 'center',
            margin: "0",
            padding: "0.3125rem 11.25rem",
            outline: "1px solid #600100",
            textAlign: "center",
          }}
        >
          Pay Via
        </h4>

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
            outline: "1px solid #600100",
            borderRadius: "0.625rem",
            padding: "1.25rem",
            marginBottom: "0.625rem",
            marginTop: "0.625rem",
          }}
        >
          <h4 style={{ marginTop: "0", textAlign: "left" }}>Lipa na M-Pesa</h4>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              alt="Lipa na M-Pesa image"
              style={{
                width: "7.5rem",
                height: "auto",
                marginRight: "1.25rem",
                marginTop: "0",
              }}
            />
            <TextField
              style={{ flex: '1' }}
              label="Enter Mobile Number"
              variant="outlined"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
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
              backgroundColor: "#c00100",
              color: "white",
              borderRadius: "0.625rem",
              width: "25%",
              marginLeft: "75%",
              marginTop: "0.125rem",
              paddingBottom: "0",
            }}
            onClick={handleLipaNaMpesaClick}
            disabled={
              !mobileNumber ||
              mobileNumber.length !== 10 ||
              isNaN(mobileNumber) ||
              loadingMpesa
            }
          >
            {loadingMpesa ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Send"
            )}
          </Button>
        </Box>

        <Box
          style={{
            outline: '1px solid #600100',
            borderRadius: '10px',
            padding: '20px',
            marginBottom: '30px',
            outline: "1px solid #600100",
            borderRadius: "0.625rem",
            padding: "1.25rem",
            marginBottom: "1.875rem",
            marginTop: "1.875rem",
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
            <img
              src={myImage}
              alt="Card payment image"
              style={{
                width: "5rem",
                height: "auto",
                marginLeft: "1.25rem",
              }}
            />
          </div>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  marginTop: "1.25rem",
                  color: "#000",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
              hidePostalCode: true, // This will hide the postal code field
            }}
          />
          <Button
            style={{
              backgroundColor: '#c00100',
              color: 'white',
              borderRadius: '10px',
              width: '30%',
              marginLeft: '70%',
              marginTop: '15px',
              backgroundColor: "#c00100",
              color: "white",
              borderRadius: "0.625rem",
              width: "100%",
              marginTop: "0.625rem",
            }}
            onClick={handleConfirmClick}
            disabled={loadingCard}
          >
            {loadingCard ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Confirm"
            )}
          </Button>
          {paymentError && <div>{paymentError}</div>}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

PaymentsMode.propTypes = {
  billingId: PropTypes.string,
};

export default PaymentsMode;
