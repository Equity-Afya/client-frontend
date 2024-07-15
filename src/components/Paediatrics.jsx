import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation

function Paediatrics() {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const response = await fetch('http://192.168.88.195:5500/api/getservices');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        const paedService = data.services.find(service => service.name.toLowerCase() === 'paediatrics');
        if (paedService) {
          setDescription(paedService.description);
        } else {
          setDescription('Description not available');
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setDescription('Failed to load description');
      }
    };

    fetchDescription();
  }, []);

  const handleSpecialistServicesClick = () => {
    navigate('/specialists'); // Navigate to the medical-services page
  };

  const handleBookAppointmentClick = () => {
    navigate('/book-appointment'); // Navigate to the book-appointment page
  };

  return (
    <Box sx={{ bgcolor: '#FCF4F4', width: '850px', marginLeft: '30px', marginTop: '20px', borderRadius: '20px', height: '1000vh' }}>
      <Box>
        <IconButton sx={{ transform: 'rotate(90deg)', marginLeft: '70px', height: '40px' }} onClick={handleSpecialistServicesClick}>
          <ArrowDropDownIcon sx={{ fontSize: 40 }} />
        </IconButton>
        <img
         src='/src/assets/equity-afia.jpg'
          alt="Modern Lab"
          style={{ marginLeft: '200px', marginTop: '40px', height: '70px', backgroundColor: '#FCF4F4', borderRadius: '10px' }}
        />
      </Box>
      <h4 style={{ marginLeft: '70px', color:'#C00000' }}>Paediatrics</h4>
      <Box sx={{ marginLeft: '70px', border: '1px solid #000', borderRadius: '20px', textAlign: 'center', marginRight: '70px', padding: '20px' }}>
       {description}
      </Box>
      <Button sx={{ marginLeft: '350px', marginTop: '50px', backgroundColor: '#C00000', textTransform: 'none', color: 'white' }} onClick={handleBookAppointmentClick}>Book Appointment</Button>
      <p style={{ marginLeft: '290px', marginTop: '50px', textTransform: 'none', color: '#C00000', fontWeight: 'bold' }}>Quality, Affordable healthcare for all</p>
    </Box>
  );
}

export default Paediatrics;
