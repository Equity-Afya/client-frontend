import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#c00100',
    },
  },
});

const CreateTeleclinic = () => {
  // State variables to store form data
  const [facility, setFacility] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [services, setServices] = useState('');

  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a data object to send to the backend
    const formData = {
      facility,
      location,
      address,
      services, // Include services in the form data
    };

    try {
      // Send the form data to the backend (replace with your actual API endpoint)
      const response = await fetch('http://192.168.89.172:5500/api/teleclinic/addteleclinic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      console.log('Clinic created successfully!');
      // Clear the form fields after successful submission
      setFacility('');
      setLocation('');
      setAddress('');
      setServices('');
    } catch (error) {
      console.error('Error creating clinic:', error.message);
    }
  };

  // Function to handle closing and navigating to manage-clinics page
  const handleClose = () => {
    navigate('/manage-clinics');
  };

  // Disable button if any field is empty
  const isButtonDisabled = !facility || !location || !address || !services;

  return (
    <ThemeProvider theme={theme}>
      <div style={{ width: '30vw', margin: 'auto', textAlign: 'center' }}>
        <h1 style={{ backgroundColor: theme.palette.primary.main, color: '#fff', padding: '16px', borderRadius: '8px' }}>Register Teleclinic</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              label="Facility"
              value={facility}
              onChange={(e) => setFacility(e.target.value)}
              required
              style={{ marginBottom: '8px', width: '100%' }}
            />
          </div>
          <div>
            <TextField
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              style={{ marginBottom: '8px', width: '100%' }}
            />
          </div>
          <div>
            <TextField
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              style={{ marginBottom: '8px', width: '100%' }}
            />
          </div>
          <div>
            <TextField
              label="Services"
              value={services}
              onChange={(e) => setServices(e.target.value)}
              required
              style={{ marginBottom: '10px', width: '100%' }}
            />
          </div>
          <Button type="submit" variant="contained" color="primary" disabled={isButtonDisabled} style={{ marginBottom: '8px', width: '100%' }}>
            Create
          </Button>
        </form>
        <Button variant="contained" color="primary" onClick={handleClose} style={{ width: '100%' }}>
          Close
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default CreateTeleclinic;
