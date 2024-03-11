import axios from 'axios';
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography, Link, Checkbox } from '@mui/material';


function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false, // New state for "Remember me" checkbox
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const errors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'rememberMe' && !value) {
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
      // Send the form data to the backend
      const response = await axios.post(
        "https://7190-102-210-244-74.ngrok-free.app/api/login",
        formData
      );

      // Check if the login was successful
      if (response.data.success) {
        // Clear form data and errors
        setFormData({ email: "", password: "", rememberMe: false });
        setFormErrors({ email: "", password: "" });
        
        // Perform any further actions (e.g., redirect to dashboard)
        console.log("Login successful!");
      } else {
        // Handle login failure (e.g., display error message)
        console.log("Login failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box sx={{backgroundColor: 'lightgrey', display: "flex", flexDirection: "column", alignItems: "center", width: '100%', margin: "auto",height:800}}>
      <Box sx={{ backgroundColor: '#FFFFFF', padding: 4, borderRadius: 3, width: 400,marginTop:10, }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" color='brown' gutterBottom sx={{ textAlign: 'center', fontWeight: "bold", }}>
            Teleafia
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: "bold" }}>
            User Login
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={Boolean(formErrors.password)}
              helperText={formErrors.password}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Checkbox
                checked={formData.rememberMe}
                onChange={handleChange}
                name="rememberMe"
              />
              <Typography variant="body1">Remember me</Typography>
              <Link href="#" underline="none">Forgot password?</Link>
            </Box>
            <Button type="submit" variant="contained" sx={{ backgroundColor: 'brown', color: 'white', width: '100%', marginTop: 2 }}>
              Login
            </Button>
            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1 }}>
              Don't have an account? <Link href="#" underline="none">Sign up</Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default LoginForm;


