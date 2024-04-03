import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, TextField, Modal } from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import confirmIcon from "../../assets/paymentStatus.png";
import togetherIcon from "../../assets/together.jpeg";

import Payments from "./PaymentsMode";
import PaymentsMode from "./PaymentsMode";

function PaymentDetails() {
  const [serviceCharge, setServiceCharge] = useState(0);
  const [referenceCode, setReferenceCode] = useState("");
  const [serviceType, setServiceType] = useState("Consultation");
  const [payBill, setPayBill] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [billingId, setBillingId] = useState("");
  const [openPopup, setOpenPopup] = useState(false);

  const navigate = useNavigate();

  const theme = responsiveFontSizes(
    createTheme({
      palette: {
        primary: {
          main: "#c00100",
        },
      },
    })
  );

  const fetchBillingDetails = async () => {
    try {
      const response = await fetch(
        `backend_api_endpoint_here?service=${serviceType}`
      );
      const data = await response.json();
      setServiceCharge(data.charge);
      setBillingId(data.billingId); // Fetch and set billing ID
    } catch (error) {
      console.error("Error fetching billing details:", error);
    }
  };

  const sendVerificationCode = async () => {
    try {
      const response = await fetch("backend_verification_endpoint_here", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: referenceCode }),
      });
      if (response.ok) {
        console.log("Verification code sent successfully");
        toast.success("Verification code sent successfully");
        handleTransactionComplete();
      } else {
        console.error("Error sending verification code");
        toast.error("Error sending verification code");
      }
    } catch (error) {
      console.error("Error sending verification code:", error);
      toast.error("Error sending verification code");
    }
  };

  const handleTransactionComplete = () => {
    console.log("Transaction completed with reference code:", referenceCode);
    setOpenPopup(true);
  };

  const handleClosePopup = (shouldNavigate) => {
    setOpenPopup(false);
    if (shouldNavigate) {
      navigate("/appointment-status");
    }
  };

  useEffect(() => {
    setPayBill("123456");
    setAccountNumber("7891011");
    fetchBillingDetails();
  }, [serviceType]);

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100vh",
        }}
      >
        <ToastContainer />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Card
            style={{
              backgroundColor: "#D9D9D9",
              borderRadius: "15px",
              padding: "20px",
              width: "300px",
              textAlign: "center",
            }}
          >
            <CardContent>
              <h4
                style={{
                  fontWeight: "bold",
                  fontSize: "clamp(14px, 3vw, 18px)",
                  borderBottom: "1px solid #c00100",
                  margin: "0 0 20px",
                }}
              >
                Billing Information
              </h4>
              <h4>Service: {serviceType}</h4>
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
                PAYBILL : {payBill}
              </p>
              <p
                style={{
                  fontSize: "clamp(10px, 2vw, 12px)",
                  fontWeight: "bold",
                }}
              >
                ACCOUNT NUMBER : {accountNumber}
              </p>
              {/* Display billing ID */}
              <p
                style={{
                  fontSize: "clamp(10px, 2vw, 12px)",
                  fontWeight: "bold",
                }}
              >
                Billing ID : {billingId}
              </p>
              <TextField
                style={{
                  width: "100%",
                  padding: "5px 0",
                  color: "#c00100",
                  borderRadius: "15px",
                  marginBottom: "10px",
                }}
                label="Enter Reference Code"
                value={referenceCode}
                onChange={(e) => setReferenceCode(e.target.value)}
              />
              <Button
                style={{
                  backgroundColor: "#c00100",
                  color: "white",
                  fontSize: "clamp(10px, 2vw, 12px)",
                  width: "100%",
                  height: "40px",
                  marginTop: "10px",
                }}
                onClick={sendVerificationCode}
              >
                Complete Transaction
              </Button>
            </CardContent>
          </Card>
        </div>
        <Modal
          open={openPopup}
          onClose={() => handleClosePopup(false)}
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
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "300px",
              textAlign: "center",
            }}
          >
            <img
              src={confirmIcon}
              alt="checkmark"
              style={{ width: "75px", height: "100px" }}
            />
            <h3>Transaction successful!</h3>
            <h3>Thank you for choosing Equityafya</h3>
            <img
              src={togetherIcon}
              alt="Handshake image"
              style={{ width: "75px", height: "75px" }}
            />
            <Button
              onClick={() => handleClosePopup(true)}
              style={{
                backgroundColor: "#c00100",
                color: "#ffffff",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              Check Status
            </Button>
            <Button
              onClick={() => handleClosePopup(false)}
              style={{
                backgroundColor: "#c00100",
                color: "#ffffff",
                width: "75px",
                height: "35px",
              }}
            >
              Close
            </Button>
          </div>
        </Modal>
        <PaymentsMode billingId={billingId} />
      </div>
    </ThemeProvider>
  );
}

export default PaymentDetails;
