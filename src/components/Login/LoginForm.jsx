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
   <Box sx={{ display: "flex", flexDirection: "column", 
              alignItems: "center", width: '100%', 
              margin: "auto", backgroundColor: "#f0f0f0", 
              height: 900 }}>
    <Box sx={{ backgroundColor: '#FFFFFF', paddingTop: 5,
               marginTop:20,paddingBottom:10,width:500,height:450,
               borderRadius:3,paddingLeft:5,paddingRight:5,}} >
    <form onSubmit={handleSubmit}>
    <Typography variant="h4" color='brown'  gutterBottom sx={{ textAlign:'center',paddingBottom:2, fontWeight:"bold"}}>
        Teleafia
      </Typography>
      <Typography variant="h6"  gutterBottom sx={{ textAlign:'center',paddingBottom:2,fontWeight:"bold", }}>
        User Login
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2,backgroundColor:'#FFFFFF' }}>
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

        {/* Remember me checkbox */}
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <Checkbox
            checked={formData.rememberMe}
            onChange={handleChange}
            name="rememberMe"
          />
          
          <Typography variant="body1">Remember me</Typography>
        

        {/* Forgot password link */}
        <Typography variant="body1" sx={{ textAlign: 'right',marginLeft:20 }}>
          <Link href="#" underline="none">Forgot password?</Link>
        </Typography>
        </Box>

        <Button type="submit" variant="contained" style={{ backgroundColor: 'brown', color: 'white',width:200,marginLeft:150, marginTop: 10 }}>
          Login
        </Button>
        
        {/* Sign up link */}
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
