import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const CreateTeleclinic = () => {
  // State variables to store form data
  const [facility, setFacility] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [services, setServices] = useState('');

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
      // Send the form data to the backend
      const response = await fetch('http://192.168.88.198:5500/api/teleclinic/addteleclinic', {
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

  // Disable button if any field is empty
  const isButtonDisabled = !facility || !location || !address || !services;

  return (
    <div style={{ width: '50vw' }}>
      <h1> Teleclinic Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Facility"
            value={facility}
            onChange={(e) => setFacility(e.target.value)}
            required
            style={{ marginBottom: '8px' }}
          />
        </div>
        <div>
          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            style={{ marginBottom: '8px' }}
          />
        </div>
        <div>
          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            style={{ marginBottom: '8px' }}
          />
        </div>
        <div>
          <TextField
            label="Services"
            value={services}
            onChange={(e) => setServices(e.target.value)}
            required
            style={{ marginBottom: '10px' }}
          />
        </div>
        <Button type="submit" variant="contained" color="primary" disabled={isButtonDisabled}>
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateTeleclinic;




