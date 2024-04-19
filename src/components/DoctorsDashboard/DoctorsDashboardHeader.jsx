import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { TextField, IconButton, Avatar, InputAdornment } from '@mui/material';
import { Search, Notifications } from '@mui/icons-material';

const DoctorsDashboardHeader = ({ headerImage }) => { // Accepting header image as prop
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([]);
  const theme = {
    palette: {
      primary: {
        main: '#c00100', // Your specified color
      },
    },
  };

  // Function to handle search query changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // Add logic to filter and display search results
  };

  // Function to fetch notifications
  const fetchNotifications = () => {
    // Replace this with actual fetch logic
    console.log("Fetching notifications...");
    // Example: fetch("API_URL")
    //   .then(response => response.json())
    //   .then(data => setNotifications(data));
  };

  useEffect(() => {
    // Fetch notifications when the component mounts
    fetchNotifications();
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: "4vw", marginLeft: "2vw" }}>
      {/* Search bar */}
      <TextField
        variant="outlined"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{
          width: '53vw',
          marginRight: '15vw',
          borderColor: theme.palette.primary.main,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: theme.palette.primary.main,
            },
            '&:hover fieldset': {
              borderColor: theme.palette.primary.main,
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
            },
          },
          '& .MuiInputBase-input': {
            color: theme.palette.primary.main,
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search style={{ color: theme.palette.primary.main }} />
            </InputAdornment>
          ),
        }}
      />
      {/* Notification button */}
      <IconButton style={{ color: theme.palette.primary.main }}>
        <Notifications />
      </IconButton>
      {/* Profile element */}
      <Avatar
        alt="Doctor"
        src={headerImage} // Use the image passed as prop
        style={{ marginLeft: '2vw', cursor: 'pointer' }}
        onClick={() => {
          // Handle click to navigate to doctor's profile
        }}
      />
    </div>
  );
};

// PropTypes validation
DoctorsDashboardHeader.propTypes = {
  headerImage: PropTypes.string.isRequired, // Validate that headerImage prop is a string and is required
};

export default DoctorsDashboardHeader;
