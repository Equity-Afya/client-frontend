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
    <div>
      
    </div>
  )
}

export default LoginForm
