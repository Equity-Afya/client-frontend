import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, TextField, Modal } from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import confirmIcon from "../../assets/paymentStatus.png";

function PaymentDetails() {
  const [serviceCharge, setServiceCharge] = useState(0);
  const [referenceCode, setReferenceCode] = useState("");
  const [serviceType, setServiceType] = useState("Consultation"); // Default service type
  const [payBill, setPayBill] = useState(""); // Placeholder for PayBill
  const [accountNumber, setAccountNumber] = useState(""); // Placeholder for Account Number
  const [openPopup, setOpenPopup] = useState(false); // State for controlling the popup

  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const theme = responsiveFontSizes(
    createTheme({
      palette: {
        primary: {
          main: "#c00100",
        },
      },
    })
  );

  const fetchServiceCharge = async () => {
    try {
      // Send the service type to the backend to fetch the service charge
      const response = await fetch(
        `backend_api_endpoint_here?service=${serviceType}`
      );
      const data = await response.json();
      setServiceCharge(data.charge);
    } catch (error) {
      console.error("Error fetching service charge:", error);
    }
  };

  const handleTransactionComplete = () => {
    console.log("Transaction completed with reference code:", referenceCode);
    setOpenPopup(true); // Open the popup
    // toast.success("Transaction successful!"); // Removed toast message
  };

  // Function to handle popup close and navigate to appointment status page
  const handleClosePopup = () => {
    setOpenPopup(false); // Close the popup
    navigate("/appointment-status"); // Navigate to appointment status page
  };

  useEffect(() => {
    // Fetch PayBill and Account Number from the backend
    // This is just a placeholder, replace with actual fetch logic
    setPayBill("123456"); // Example PayBill value
    setAccountNumber("7891011"); // Example Account Number value

    fetchServiceCharge();
  }, [serviceType]);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <ToastContainer />
        <style>
          {`
            body {
              overflow: hidden; /* Prevent scrolling */
            }

            @media screen and (max-width: 500px) {
              /* Adjustments for smaller screens */
              body {
                overflow: auto; /* Allow scrolling for smaller screens */
              }
            }
          `}
        </style>
        <div
          style={{
            display: "flex",
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically
            height: "100vh", // Full viewport height
          }}
        >
          <Card
            style={{
              backgroundColor: "#D9D9D9",
              borderRadius: "15px",
              padding: "20px",
              width: "350px", // Adjust card width
              textAlign: "center", // Center text
            }}
          >
            <CardContent>
              <h4
                style={{
                  fontWeight: "bold",
                  fontSize: "clamp(14px, 3vw, 18px)", // Fluid typography for heading
                  borderBottom: "1px solid #c00100",
                  margin: "0 0 20px", // Add margin bottom
                }}
              >
                Billing Information
              </h4>
              <h4>Service: {serviceType}</h4> {/* Display the service type */}
              <p
                style={{
                  fontSize: "clamp(10px, 2vw, 12px)",
                  fontWeight: "bold",
                }}
              >
                Amount : {serviceCharge}
              </p>
              <p
                style={{
                  fontSize: "clamp(10px, 2vw, 12px)",
                  fontWeight: "bold",
                }}
              >
                PayBill : {payBill} {/* Display PayBill */}
              </p>
              <p
                style={{
                  fontSize: "clamp(10px, 2vw, 12px)",
                  fontWeight: "bold",
                }}
              >
                Account Number : {accountNumber} {/* Display Account Number */}
              </p>
              <TextField
                style={{
                  width: "100%",
                  padding: "5px 0",
                  color: "#c00100",
                  borderRadius: "15px",
                  marginBottom: "10px", // Add margin bottom
                }}
                label="Enter Reference Code"
                value={referenceCode}
                onChange={(e) => setReferenceCode(e.target.value)}
              />
              <Button
                style={{
                  backgroundColor: "#c00100",
                  color: "white",
                  fontSize: "clamp(10px, 2vw, 12px)", // Fluid typography for button
                  width: "100%",
                  height: "40px",
                  marginTop: "10px",
                }}
                onClick={handleTransactionComplete}
              >
                Complete Transaction
              </Button>
            </CardContent>
          </Card>
        </div>
        {/* Popup */}
        <Modal
          open={openPopup}
          onClose={handleClosePopup}
          aria-labelledby="transaction-successful"
          aria-describedby="transaction-successful-description"
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              borderRadius: "15px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <img src={confirmIcon} alt="checkmark" />
            <h3>Transaction successful!</h3>
            <Button
              onClick={handleClosePopup}
              style={{ backgroundColor: "#c00100", color: "#ffffff" }}
            >
              Check Status
            </Button>
          </div>
        </Modal>
      </div>
    </ThemeProvider>
  );
}

export default PaymentDetails;
