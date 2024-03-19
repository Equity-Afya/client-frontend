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

const CompleteAppointment = ({ onSubmit }) => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    // Here you can save data or perform any action
    setTimeout(() => {
      setLoading(false);
      onSubmit();
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
        Complete Appointment
      </Typography>
      <TextField
        label="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <TextField
        label="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <TextField
        select
        label="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ mb: 2 }}
      >
        <MenuItem value="male">Male</MenuItem>
        <MenuItem value="female">Female</MenuItem>
        <MenuItem value="other">Other</MenuItem>
      </TextField>
      <TextField
        type="number"
        label="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!fullName || !phoneNumber || !gender || !age || loading}
        sx={{
          mb: 2,
          backgroundColor: "#C00010",
          "&:hover": { backgroundColor: "#800008" },
        }}
      >
        {loading ? <CircularProgress size={24} /> : "Submit"}
      </Button>
      {loading && <LinearProgress sx={{ mb: 2 }} />}
    </Container>
  );
};

export default CompleteAppointment;
