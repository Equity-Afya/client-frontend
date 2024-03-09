import React from 'react';
import { List, Box, Typography, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HealthServicesList = () => {
  const navigate = useNavigate(); // Import useNavigate hook
  // Define your health services here
  const healthServices = [
    { name: 'Medical services', photo: 'src/assets/medical_services_photo.jpg', route: '/medical-services' },
    { name: 'Specialists', photo: 'src/assets/specialists_photo.jpg', route: '/specialists' },
    { name: 'My health Records', photo: 'src/assets/health_records_photo.jpg', route: '/health-records' },
    { name: 'My appoitments', photo: 'src/assets/appointments_photo.jpg', route: '/appointments' },
    { name: 'Teleclinics', photo: 'src/assets/teleclinics_photo.jpg', route: '/teleclinics' },
    { name: 'Payments', photo: 'src/assets/payments_photo.jpg', route: '/payments' },
    { name: 'Customer care', photo: 'src/assets/customer_care_photo.jpg', route: '/customer-care' },
    { name: 'Other services', photo: 'src/assets/other_services_photo.jpg', route: '/other-services' },
    // Add more services as needed
  ];

  const handleClick = (route) => {
    // Navigate to the service's page
    // You can use React Router's history or any other navigation method here
    // For simplicity, I'll log the route to console
    navigate(route);
  };

  return (
    <List sx={{ display: 'flex', flexWrap: 'wrap', gap: '40px', padding: 0, marginBottom: '40px' }}>
      {healthServices.map((service, index) => (
        <Box
          key={index}
          sx={{
            position: 'relative',
            width: '280px',
            height: '200px',
            borderRadius: '8px',
            overflow: 'hidden',
            textAlign: 'center',
            marginTop: '40px',
          }}
        >
          <img src={service.photo} alt={service.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', color: 'white', backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.4))', padding: '8px', borderRadius: '8px 8px 0 0' }}>
            <Typography variant="h6" sx={{ color: 'white' }}>{service.name}</Typography>
          </Box>
          {/* Arrow pointer */}
          <Button
            onClick={() => handleClick(service.route)}
            sx={{
              width: '40px', // Set width and height to create a square button
              height: '40px',
              position: 'absolute',
              bottom: '4px',
              right: '4px',
              backgroundColor: 'white', // Set background color to white
              color: 'black', // Set color to black
              fontWeight: 'bold', // Making the arrow bold
              transform: 'rotate(-45deg)', // Rotate the arrow to point towards left
              borderRadius: '50%', // Set border radius to create a circular button
              padding: 0, // Remove padding
              minWidth: 0, // Remove minWidth
            }}
          >
            <ArrowForward sx={{ fontSize: 20 }} /> {/* Reduce arrow size */}
          </Button>
        </Box>
      ))}
    </List>
  );
};

export default HealthServicesList;
