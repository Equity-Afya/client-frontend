/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  LinearProgress,
  MenuItem,
  Grid,
  Box, // Import Box component from Material-UI
} from "@mui/material";

const services = ["Dentist", "General Checkup", "Other Service"];

const AppointmentForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bookFor: "",
    service: "",
    date: "",
    time: "",
    appointmentType: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    setLoading(true);
    
    // Pass form data as state to the next page
    navigate("/complete-booking", { state: formData });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          border: "2px solid #C00100",
          borderRadius: "15px",
          padding: "20px", 
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold'}}> 
          Book Appointment
        </Typography>
        <TextField
          select
          name="bookFor"
          label="Book for"
          value={formData.bookFor}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        >
          <MenuItem value="myself">Myself</MenuItem>
          <MenuItem value="others">Others</MenuItem>
        </TextField>
        <TextField
          select
          name="service"
          label="Select service"
          value={formData.service}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        >
          {services.map((service) => (
            <MenuItem key={service} value={service}>
              {service}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          name="appointmentType"
          label="Appointment type"
          value={formData.appointmentType}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        >
          <MenuItem value="physical">Physical</MenuItem>
          <MenuItem value="virtual">Virtual</MenuItem>
        </TextField>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <TextField
              type="date"
              name="date"
              label="Select date"
              value={formData.date}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="time"
              name="time"
              label="Select time"
              value={formData.time}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={
            !formData.bookFor ||
            !formData.service ||
            !formData.date ||
            !formData.time ||
            !formData.appointmentType ||
            loading
          }
          sx={{ mb: 2, borderRadius: '20px'}}
        >
          {loading ? <CircularProgress size={24} /> : "Next"}
        </Button>
        {loading && <LinearProgress />}
      </Box>
    </Container>
  );
};

export default AppointmentForm;
