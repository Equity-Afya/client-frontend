import api from "../../services/api";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  LinearProgress,
  MenuItem,
  Snackbar,
  Box,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const SubmitAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    idNumber: "", // New field for ID number
    gender: "",
    age: "",
    bookFor: "",
    service: "",
    date: "",
    time: "",
    appointmentType: "",
  });

  useEffect(() => {
    const stateFormData = location.state;
    if (stateFormData) {
      setFormData(stateFormData);
    }
  }, [location.state]);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await api.post("/bookappointment", formData);

      if (response.status === 201) {
        setLoading(false);
        setSnackbarOpen(true); // Set snackbarOpen to true upon successful booking
        navigate("/appointments-history");
      } else {
        throw new Error("Internal server error");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      setLoading(false);
      setError("An error occurred. Please try again.");
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          border: "2px solid #C00100",
          borderRadius: "1px",
          padding: "20px",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", fontStyle: "Outfit" }}
        >
          Personal Details
        </Typography>
        <TextField
          label="Full Name"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Phone Number"
          value={formData.phoneNumber}
          onChange={(e) =>
            setFormData({ ...formData, phoneNumber: e.target.value })
          }
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          label="ID Number"
          value={formData.idNumber}
          onChange={(e) =>
            setFormData({ ...formData, idNumber: e.target.value })
          }
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          select
          label="Gender"
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
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
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={
            !formData.fullName ||
            !formData.phoneNumber ||
            !formData.gender ||
            !formData.age ||
            loading
          }
          sx={{ mb: 2, borderRadius: "10px" }}
        >
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
        {error && (
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        {loading && <LinearProgress />}
        <Snackbar
          open={snackbarOpen} // Show Snackbar on successful booking
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleCloseSnackbar}
            severity="success"
          >
            Booking Successful
          </MuiAlert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default SubmitAppointment;
