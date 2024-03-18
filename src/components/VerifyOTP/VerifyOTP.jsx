import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const handleInputChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setVerifyLoading(true);

    try {
      const response = await axios.post(
        "https://8ed2-102-210-244-74.ngrok-free.app/patient/register/verifyotp",
        { enteredOTP: otp }
      );

      if (response.status === 200) {
        navigate("/login");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert(
        "An error occurred during OTP verification. Please try again later."
      );
    }

    setVerifyLoading(false);
  };

  const handleResendOTP = async () => {
    try {
      setResendLoading(true);
      const response = await axios.post(
        "https://8ed2-102-210-244-74.ngrok-free.app/patient/resendotp",
        { email }
      );

      if (response.status === 200) {
        alert(response.data.message);
      } else {
        alert("Failed to resend OTP. Please try again later.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      alert("An error occurred while resending OTP. Please try again later.");
    }

    setResendLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#DEE1E6",
      }}
    >
      <Box
        sx={{
          width: 400,
          p: 4,
          borderRadius: 3,
          bgcolor: "white",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{ color: "#c00100", fontWeight: "bold" }}
        >
          TeleAfia
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "semi-bold", marginBottom: "20px" }}
        >
          OTP Verification
        </Typography>
        <Typography gutterBottom>
          A verification code has been sent to{" "}
          <span style={{ color: "#c00100" }}>{email}.</span>
        </Typography>
        <Typography gutterBottom>Enter OTP sent to your email</Typography>
        <form onSubmit={handleVerifyOTP}>
          <TextField
            type="text"
            value={otp}
            onChange={handleInputChange}
            placeholder="Enter OTP"
            sx={{ width: "100%", textAlign: "center", mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={verifyLoading}
            sx={{ mt: 2, backgroundColor: "#c00100" }}
          >
            {verifyLoading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>

        <Button
          onClick={handleResendOTP}
          disabled={resendLoading}
          sx={{
            mt: 2,
            color: "#c00100",
            backgroundColor: "white",
            border: "1px solid black",
          }}
        >
          {" "}
          {resendLoading ? "Resending..." : "RESEND OTP"}
        </Button>
      </Box>
    </Box>
  );
}

export default VerifyOTP;
