import  { useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const OTPVerification = ({ email }) => {
  const [otp, setOTP] = useState("");

  const handleOTPChange = (event) => {
    setOTP(event.target.value);
  };

  const handleResendOTP = () => {
    // Implement logic to resend OTP
    console.log("Resending OTP...");
  };

  const handleVerifyOTP = () => {
    // Implement logic to verify OTP
    console.log("Verifying OTP...", otp);
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
      </CardContent>
    </Card>
  );
};

OTPVerification.propTypes = {
  email: PropTypes.string.isRequired,
};

export default OTPVerification;
