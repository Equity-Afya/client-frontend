import React, { useState, useEffect } from 'react';
import { List, Box, Typography, Button, IconButton, Avatar } from '@mui/material'; // Importing necessary components from Material-UI
import { ArrowForward, Notifications } from '@mui/icons-material'; // Importing icons from Material-UI
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook from React Router DOM

// Notification component
const Notification = ({ message }) => { // Define a functional component called Notification, which receives a prop 'message'
  return <div>{message}</div>; // Render the notification message inside a div
};

const HealthServicesList = () => { // Define a functional component called HealthServicesList
  const navigate = useNavigate(); // Initialize the useNavigate hook to navigate between routes
  const [searchQuery, setSearchQuery] = useState(''); // Initialize state for search query
  const [avatarSrc, setAvatarSrc] = useState(''); // Initialize state for avatar image source
  const [notifications, setNotifications] = useState([]); // Initialize state for notifications

  const healthServices = [
    { name: 'Medical services', photo: 'src/assets/medical_services_photo.jpg', route: '/medical-services' }, // Medical services object
    { name: 'Specialists', photo: 'src/assets/specialists_photo.jpg', route: '/specialists' }, // Specialists object
    { name: 'My health Records', photo: 'src/assets/health_records_photo.jpg', route: '/health-records' }, // My health Records object
    { name: 'My appoitments', photo: 'src/assets/appointments_photo.jpg', route: '/appointments' }, // My appoitments object
    { name: 'Teleclinics', photo: 'src/assets/teleclinics_photo.jpg', route: '/teleclinics' }, // Teleclinics object
    { name: 'Payments', photo: 'src/assets/payments_photo.jpg', route: '/payments' }, // Payments object
    { name: 'Customer care', photo: 'src/assets/customer_care_photo.jpg', route: '/customer-care' }, // Customer care object
    { name: 'Other services', photo: 'src/assets/other_services_photo.jpg', route: '/other-services' }, // Other services object
  ];
  

  // Function to fetch notifications from the backend
  const fetchNotifications = async () => { // Define an asynchronous function called fetchNotifications
    try {
      const response = await fetch('/api/notifications'); // Fetch notifications from the backend API
      const data = await response.json(); // Parse the response as JSON
      setNotifications(data); // Set the fetched notifications in the state
    } catch (error) { // Catch any errors that occur during the fetch operation
      console.error('Error fetching notifications:', error); // Log the error to the console
    }
  };

  useEffect(() => { // Use the useEffect hook to perform side effects (fetching notifications) when the component mounts
    fetchNotifications(); // Call the fetchNotifications function
  }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

  const handleClick = (route) => { // Define a function called handleClick that takes a route parameter
    navigate(route); // Navigate to the specified route using the navigate function
  };

  // Avatar functionality
  const handleAvatarChange = (event) => { // Define a function called handleAvatarChange that takes an event parameter
    const file = event.target.files[0]; // Get the selected file from the input element
    const reader = new FileReader(); // Create a new instance of FileReader
    reader.onloadend = () => { // Define an onloadend event handler for when file reading is completed
      setAvatarSrc(reader.result); // Set the avatar source to the data URL of the selected file
    };
    if (file) { // Check if a file was selected
      reader.readAsDataURL(file); // Read the selected file as a data URL
    }
  };

  // Filter services based on search query
  const filteredServices = healthServices.filter((service) => // Filter the health services array based on the search query
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) // Check if the service name includes the search query (case-insensitive)
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
        {filteredServices.map((service, index) => ( // Map over the filtered services array and render each service
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
          {notifications.map((notification, index) => ( // Map over the notifications array and render each notification
            <Notification key={index} message={notification.message} /> // Render the Notification component with the notification message
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default HealthServicesList;
