import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from react-router-dom
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const OTPVerification = ({ email }) => {
  const [otp, setOTP] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigate function

  const handleOTPChange = (event) => {
    setOTP(event.target.value);
  };

  const handleResendOTP = async () => {
    try {
      const response = await axios.post("/api/resend-otp", { email });
      if (response.status === 200) {
        setMessage("OTP resent successfully");
      }
    } catch (error) {
      if (error.response.status === 404) {
        setMessage("User not found");
      } else {
        setMessage("Internal server error");
      }
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post("/api/verify-otp", { otp });
      if (response.status === 200) {
        setMessage("Account verified successfully");
        // Redirect to login page
        navigate("/login");
      }
    } catch (error) {
      if (error.response.status === 404) {
        setMessage("User with the provided OTP not found");
      } else if (error.response.status === 400) {
        setMessage("Invalid OTP");
      } else {
        setMessage("Internal server error");
      }
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", marginTop: 4, padding: 2 }}>
      <CardContent>
        <Typography variant="h4" align="center" gutterBottom>
          Teleafya
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          OTP Verification Page
        </Typography>
        <Typography variant="body2" align="center" paragraph>
          A verification code has been sent to {email}. If the email address is
          incorrect, you can go back and change it.
        </Typography>
        <TextField
          label="Enter OTP"
          variant="outlined"
          fullWidth
          value={otp}
          onChange={handleOTPChange}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleVerifyOTP}
          fullWidth
          style={{
            backgroundColor: "#C00100",
            color: "#fff",
            marginTop: "16px",
          }}
        >
          Verify OTP
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleResendOTP}
          style={{ width: "150px", marginTop: "8px" }}
        >
          Resend OTP
        </Button>
        {message && (
          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: "16px", color: "red" }}
          >
            {message}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

OTPVerification.propTypes = {
  email: PropTypes.string.isRequired,
};

export default OTPVerification;
