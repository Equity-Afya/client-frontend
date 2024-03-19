import React, { useState } from "react";
import {
  Container,
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
    <Container
      maxWidth="sm" // You can adjust the maxWidth as needed
      sx={{
        padding: 6,
        border: 1,
        borderColor: "grey.300",
        borderRadius: 2,
        overflow: "hidden", // Set overflow to hidden
        
      }}
    >
      <Typography variant="h5" gutterBottom>
        Book Appointment
      </Typography>
      <TextField
        select
        label="Book for"
        value={bookFor}
        onChange={(e) => setBookFor(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ mb: 2, textAlign: "left" }} // Align left
      >
        <MenuItem value="myself">Myself</MenuItem>
        <MenuItem value="others">Others</MenuItem>
      </TextField>
      <TextField
        select
        label="Select service"
        value={selectedService}
        onChange={(e) => setSelectedService(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ mb: 2, textAlign: "left" }} // Align left
      >
        {services.map((service) => (
          <MenuItem key={service} value={service}>
            {service}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Appointment type"
        value={appointmentType}
        onChange={(e) => setAppointmentType(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ mb: 2, textAlign: "left" }} // Align left
      >
        <MenuItem value="physical">Physical</MenuItem>
        <MenuItem value="virtual">Virtual</MenuItem>
      </TextField>
      <TextField
        type="date"
        label="Select date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ width: "calc(50% - 12px)", marginRight: 2, mb: 2 }}
      />
      <TextField
        type="time"
        label="Select time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ width: "calc(50% - 12px)", mb: 2 }}
      />
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
        sx={{
          mb: 2,
          backgroundColor: "#C00010",
          "&:hover": { backgroundColor: "#800008" },
        }} 
      >
        {loading ? <CircularProgress size={24} /> : "Next"}
      </Button>
      {loading && <LinearProgress sx={{ mb: 2 }} />}
    </Container>
  );
};

export default BookingForm;
