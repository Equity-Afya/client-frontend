// src/BookingForm.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  LinearProgress,
  MenuItem,
} from "@mui/material";

const services = ["Dentist", "General Checkup", "Other Service"];

const BookingForm = ({ onNext }) => {
  const [bookFor, setBookFor] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    // Here you can save data or perform any action before moving to the next page
    setTimeout(() => {
      setLoading(false);
      onNext();
    }, 1500); // Simulating saving data with a timeout
  };

  return (
    <Box p={3} border={1} borderColor="grey.300" borderRadius={4}>
      <Typography variant="h5" gutterBottom>
        Book appointment
      </Typography>
      <Box mb={2}>
        <TextField
          select
          label="Book for"
          value={bookFor}
          onChange={(e) => setBookFor(e.target.value)}
          fullWidth
        >
          <MenuItem value="myself">Myself</MenuItem>
          <MenuItem value="others">Others</MenuItem>
        </TextField>
      </Box>
      <Box mb={2}>
        <TextField
          select
          label="Select service"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          fullWidth
        >
          {services.map((service) => (
            <MenuItem key={service} value={service}>
              {service}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box mb={2}>
        <TextField
          type="date"
          label="Select date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
        />
      </Box>
      <Box mb={2}>
        <TextField
          type="time"
          label="Select time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          fullWidth
        />
      </Box>
      <Box mb={2}>
        <TextField
          select
          label="Appointment type"
          value={appointmentType}
          onChange={(e) => setAppointmentType(e.target.value)}
          fullWidth
        >
          <MenuItem value="physical">Physical</MenuItem>
          <MenuItem value="virtual">Virtual</MenuItem>
        </TextField>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={
          !bookFor ||
          !selectedService ||
          !date ||
          !time ||
          !appointmentType ||
          loading
        }
      >
        {loading ? <CircularProgress size={24} /> : "Next"}
      </Button>
      {loading && <LinearProgress sx={{ mt: 2 }} />}
    </Box>
  );
};

export default BookingForm;
