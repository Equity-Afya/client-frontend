import { useState } from "react"; // Import useState hook
import { Box, Button, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../../assets/Lipanampesa.png";
import myImage from "../../assets/CardImage.png";

const theme = createTheme({
  palette: {
    primary: {
      main: "#c00100", // Set primary color to #c00100
    },
  },
});

const Payments = () => {
  // State variables for input fields
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");

  // Function to handle button click
  const handleConfirmClick = () => {
    // Logic to handle confirmation
    console.log("Confirm button clicked");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        style={{
          height: "580px",
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
            marginBottom: "30px",
            marginTop: "15px",
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
              paddimgBottom: "0",
            }}
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
              style={{ flex: "1", marginRight: "20px" }}
              label="CVV"
              variant="outlined"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
            <TextField
              style={{ flex: "1" }}
              label="Amount"
              variant="outlined"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <Button
            style={{
              backgroundColor: "#c00100",
              color: "white",
              borderRadius: "10px",
              width: "30%",
              marginLeft: "70%",
              marginTop: "15px",
            }}
            onClick={handleConfirmClick} // Add onClick event handler
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Payments;
