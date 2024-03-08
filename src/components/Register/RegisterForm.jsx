import axios from "axios";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";


const formBoxStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Center the form horizontally
  justifyContent: 'center', // Center the form vertically
  gap: 1,
  maxWidth: '400px', // Set a maximum width for the form
  borderRadius: '16px',
  margin: 'auto',
  marginTop: '50px'
 }; //

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    idNumber: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    idNumber: "",
    password: "",
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [userAlreadyRegistered, setUserAlreadyRegistered] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const errors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        errors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await axios.post(
        "https://7190-102-210-244-74.ngrok-free.app/api/register",
        formData
      );

      // Check if registration is successful
      if (response.data.success) {
        setRegistrationSuccess(true);

        // Simulate sending OTP (You can replace this with actual logic to send OTP)
        setTimeout(() => {
          // Redirect to the verify OTP page
          // Replace '/verify-otp' with your actual route for the verify OTP page
          window.location.href = "/verify-otp";
        }, 2000);
      } else if (response.data.message === "User already registered") {
        setUserAlreadyRegistered(true);
      } else {
        setRegistrationSuccess(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setRegistrationSuccess(false);
      setUserAlreadyRegistered(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <Box sx={formBoxStyles}>
        {registrationSuccess && (
          <Alert severity="success">
            Registration successful! OTP sent to your email.
          </Alert>
        )}

        {userAlreadyRegistered && (
          <Alert severity="warning">
            User with this email/ID number is already registered.
          </Alert>
        )}

        <TextField
          label="Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={Boolean(formErrors.name)}
          helperText={formErrors.name}
        />

        <TextField
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={Boolean(formErrors.email)}
          helperText={formErrors.email}
        />

        <TextField
          label="Phone Number"
          variant="outlined"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          error={Boolean(formErrors.phoneNumber)}
          helperText={formErrors.phoneNumber}
        />

        <TextField
          label="ID Number"
          variant="outlined"
          name="idNumber"
          value={formData.idNumber}
          onChange={handleChange}
          error={Boolean(formErrors.idNumber)}
          helperText={formErrors.idNumber}
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={Boolean(formErrors.password)}
          helperText={formErrors.password}
        />

        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </Box>
    </form>
  );
}

export default RegisterForm;
