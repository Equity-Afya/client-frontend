import React, { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, MenuItem, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Link } from 'react-router-dom'; // Import Link component from React Router

const theme = createTheme({
  palette: {
    primary: {
      main: "#c00100",
    },
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 16, // Default font size
    "@media (min-width:600px)": {
      fontSize: "calc(16px + 0.5vw)", // Fluid typography for larger screens
    },
    "@media (min-width:960px)": {
      fontSize: "calc(16px + 1vw)", // Fluid typography for even larger screens
    },
  },
});

const DentalCard = () => {
  const [selectedFacility, setSelectedFacility] = useState('');
  const [error, setError] = useState(false); // State variable for error

  const myImage = 'src/assets/dental.jpg';

  const handleFacilityChange = (event) => {
    setSelectedFacility(event.target.value);
    setError(false); // Reset error when a facility is selected
  };

  const handleBookAppointment = () => {
    if (!selectedFacility) {
      setError(true); // Set error if no facility is selected
    } else {
      // Add functionality for booking appointment here
      alert(`Booking appointment at ${selectedFacility}`);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          fontFamily: 'Roboto',
          overflowY: 'auto'
        }}
      >
        <Card
          style={{
            width: '100%',
            maxWidth: '500px',
            height: 'auto',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            outline: '1px solid #c00100',
          }}
        >
          <CardContent>
            <h3>Dental</h3>
            <h5>Select Facility</h5>
            <TextField
              select
              label='Facility'
              variant="outlined"
              style={{
                width: '75%',
                marginBottom: '20px',
                "&:focus": { color: "#c00100" },
              }}
              value={selectedFacility}
              onChange={handleFacilityChange}
            >
              <MenuItem value="facility1">Facility 1</MenuItem>
              <MenuItem value="facility2">Facility 2</MenuItem>
              <MenuItem value="facility3">Facility 3</MenuItem>
            </TextField>
            {error && (
              <Typography color="error" variant="body2" gutterBottom>
                Please select a facility.
              </Typography>
            )}
            <img
              src={myImage}
              alt="Dental Image"
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: '100%',
                marginBottom: '20px',
              }}
            />
            <Button
              variant="contained"
              onClick={handleBookAppointment}
              style={{
                backgroundColor: '#c00100',
                color: 'white',
                marginTop: '10px',
                cursor: 'pointer',
                "&:hover": { backgroundColor: "#c00100" },
              }}
            >
              <Link to="/book-appointment" style={{ textDecoration: 'none', color: 'white' }}>Book Appointment</Link>
            </Button>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default DentalCard;
