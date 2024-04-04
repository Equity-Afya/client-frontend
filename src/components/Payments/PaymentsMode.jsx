import React, { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import logo from "../../assets/Lipanampesa.png";
import myImage from "../../assets/CardImage.png";
import PropTypes from "prop-types";

const theme = createTheme({
  palette: {
    primary: {
      main: "#c00100",
    },
  },
});

const PaymentsMode = ({ billingId }) => {
  const stripe = useStripe(); // Ensure this is called only once
  const elements = useElements();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [isCardInfoValid, setIsCardInfoValid] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  useEffect(() => {
    setIsCardInfoValid(validateCardInfo());
  }, [cardNumber, expiryDate, cvv]);

  const validateCardInfo = () => {
    // You can implement your validation logic here
    return (
      cardNumber.trim() !== "" && expiryDate.trim() !== "" && cvv.trim() !== ""
    );
  };

  const handleLipaNaMpesaClick = async () => {
    if (!validateMobileNumber(phoneNumber)) {
      console.error("Invalid mobile number");
      return;
    }

    try {
      const mpesaData = {
        mobileNumber: phoneNumber,
        billingId: billingId,
      };

      const response = await fetch(
        "https://b5ee-102-210-244-74.ngrok-free.app/api/payments/makestkpayments/B00001",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mpesaData),
        }
      );

      if (!response.ok) {
        throw new Error("Payment failed");
      }

      console.log("Response from backend:", response);
      // Further processing if needed
    } catch (error) {
      console.error("Error sending mobile number to backend:", error);
    }
  };

  const handleConfirmClick = async () => {
    if (!stripe || !elements) {
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (error) {
        throw new Error(error.message);
      }

      const response = await fetch(
        "https://b5ee-102-210-244-74.ngrok-free.app/api/payments/makecardpayments/B00001",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: paymentMethod.id, billingId }),
        }
      );

      if (!response.ok) {
        throw new Error("Payment failed");
      }

      console.log("Payment successful");
    } catch (error) {
      console.error("Error:", error);
      setPaymentError("Payment failed");
    }
  };

  const validateMobileNumber = (value) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        style={{
          height: "450px",
          marginTop: "20px",
          width: "500px",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          padding: "20px",
        }}
      >
        <h4
          style={{
            margin: "0",
            padding: "5px 180px",
            outline: "1px solid #600100",
            textAlign: "center",
          }}
        >
          Pay Via
        </h4>

        {/* Box 1: Lipa na M-Pesa */}
        <Box
          style={{
            outline: "1px solid #600100",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "10px",
            marginTop: "10px",
          }}
        >
          <h4 style={{ marginTop: "0", textAlign: "left" }}>Lipa na M-Pesa</h4>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              alt="Lipa na M-Pesa image"
              style={{
                width: "120px",
                height: "auto",
                marginRight: "20px",
                marginTop: "0",
              }}
            />
            <TextField
              style={{ flex: "1" }}
              label="Enter Mobile Number"
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <Button
            style={{
              backgroundColor: "#c00100",
              color: "white",
              borderRadius: "10px",
              width: "25%",
              marginLeft: "75%",
              marginTop: "2px",
              paddingBottom: "0",
            }}
            onClick={handleLipaNaMpesaClick}
            disabled={!validateMobileNumber(phoneNumber)}
          >
            Send
          </Button>
        </Box>

        {/* Box 2: Pay with card */}
        <Box
          style={{
            outline: "1px solid #600100",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "30px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h4 style={{ marginTop: "0", flex: "1", textAlign: "left" }}>
              Pay with card
            </h4>
            <img
              src={myImage}
              alt="Card payment image"
              style={{
                width: "80px",
                height: "auto",
                marginLeft: "20px",
              }}
            />
          </div>
          <div
            style={{ marginTop: "15px", marginBottom: "20px", display: "flex" }}
          >
            <TextField
              style={{ flex: "1", marginRight: "20px" }}
              label="Enter Card Number"
              variant="outlined"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <TextField
              style={{ flex: "1" }}
              label="Expiry Date"
              variant="outlined"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>
          <div style={{ display: "flex" }}>
            <TextField
              style={{ flex: "1", marginRight: "52%" }}
              label="CVV"
              variant="outlined"
              value={cvv}
              onChange={(e) => setCVV(e.target.value)}
            />
          </div>
          <Button
            style={{
              backgroundColor: "#c00100",
              color: "white",
              borderRadius: "10px",
              width: "30%",
              marginLeft: "70%",
              marginTop: "0",
            }}
            onClick={handleConfirmClick}
            disabled={!isCardInfoValid}
          >
            Confirm
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
