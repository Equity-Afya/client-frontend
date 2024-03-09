import React, { useState, useEffect } from 'react';
import { List, Box, Typography, Button, IconButton, Avatar } from '@mui/material';
import { ArrowForward, Notifications } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Notification component
const Notification = ({ message }) => {
  return <div>{message}</div>;
};

const HealthServicesList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [avatarSrc, setAvatarSrc] = useState('');
  const [notifications, setNotifications] = useState([]);

  const healthServices = [
    { name: 'Medical services', photo: 'src/assets/medical_services_photo.jpg', route: '/medical-services' },
    { name: 'Specialists', photo: 'src/assets/specialists_photo.jpg', route: '/specialists' },
    { name: 'My health Records', photo: 'src/assets/health_records_photo.jpg', route: '/health-records' },
    { name: 'My appoitments', photo: 'src/assets/appointments_photo.jpg', route: '/appointments' },
    { name: 'Teleclinics', photo: 'src/assets/teleclinics_photo.jpg', route: '/teleclinics' },
    { name: 'Payments', photo: 'src/assets/payments_photo.jpg', route: '/payments' },
    { name: 'Customer care', photo: 'src/assets/customer_care_photo.jpg', route: '/customer-care' },
    { name: 'Other services', photo: 'src/assets/other_services_photo.jpg', route: '/other-services' },
  ];

  // Function to fetch notifications from the backend
  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications');
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleClick = (route) => {
    navigate(route);
  };

  // Avatar functionality
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarSrc(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Filter services based on search query
  const filteredServices = healthServices.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Search bar */}
      <Box style={{ position: 'fixed', top: 0, right: 0, maxWidth: '90%', background: '#fff', padding: '10px', boxSizing: 'border-box', zIndex: 1, display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, height: '40px', borderRadius: '5px', border: '1px solid #ccc', marginRight: '10px', minWidth: '500px' }}
        />
        <Button variant="contained" sx={{ height: '40px', minWidth: '80px', marginRight: '280px', }}>Search</Button>

        {/* Notification bell */}
        <IconButton size="small" sx={{ color: '#C00100', marginRight: '0px' }}>
          <Notifications />
        </IconButton>

        {/* Avatar */}
        <label htmlFor="avatar-input" style={{ marginRight: '20px' }}>
          <Avatar
            alt="User Avatar"
            src={avatarSrc}
            sx={{ cursor: 'pointer' }}
            onClick={() => console.log("Avatar clicked")}
          />
          <input
            id="avatar-input"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleAvatarChange}
          />
        </label>
      </Box>

      {/* Spacer to prevent content from being overlapped */}
      <Box style={{ height: '60px' }}></Box>

      {/* List of services */}
      <List sx={{ display: 'flex', flexWrap: 'wrap', gap: '40px', padding: 0, marginTop: '0px' }}>
        {filteredServices.map((service, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              width: '280px',
              height: '200px',
              borderRadius: '8px',
              overflow: 'hidden',
              textAlign: 'center',
              marginTop: '10px', // Adjusted margin to reduce the gap
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

      {/* Notification component */}
      <Box>
        <ul>
          {notifications.map((notification, index) => (
            <Notification key={index} message={notification.message} />
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default HealthServicesList;
