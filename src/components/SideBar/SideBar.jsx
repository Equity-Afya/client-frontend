import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  IconButton,
} from "@mui/material";
import {
  Dashboard,
  EventNote,
  PeopleAlt,
  History,
  Payment,
  Headset,
  AccountCircle,
  Brightness4,
  Brightness7,
  Logout,
  Fullscreen,
  FullscreenExit,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios library for making HTTP requests

function Sidebar() {
  const navigate = useNavigate();
  const [brightnessMode, setBrightnessMode] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState(false); // Define fullscreen mode state

  const handleLogout = async () => {
    try {
      const response = await axios.post('/logout');
      console.log('Logout response:', response); // Add this line for debugging
      if (response.status === 200) {
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  

  const handleNavigation = (route) => {
    if (route === '/light-mode') {
      setBrightnessMode(!brightnessMode); // Toggle brightness mode
    } else {
      navigate(route);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // If fullscreen is not active, request fullscreen
      document.documentElement.requestFullscreen();
    } else {
      // If fullscreen is active, exit fullscreen
      document.exitFullscreen();
    }
    // Update the state to reflect the change in fullscreen mode
    setFullscreenMode(!fullscreenMode);
  };

  return (
    <>
      <CssBaseline />
      <List
        sx={{
          width: 240,
          height: "100%",
          backgroundColor: brightnessMode ? "#FFFFFF" : "#C00100",
          color: brightnessMode ? "#000000" : "white",
          paddingTop: 0,
        }}
      >
        {/* Main Menu Items */}
        <ListItem button onClick={() => handleNavigation("/dashboard")}>
          <ListItemIcon sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
          <IconButton
              onClick={toggleFullscreen}
              sx={{ color: brightnessMode ? "#000000" : "white" }}
            >
              {fullscreenMode ? <FullscreenExit /> : <Fullscreen />}
            </IconButton>
        </ListItem>
        <ListItem button onClick={() => handleNavigation("/appointments")}>
          <ListItemIcon sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}>
            <EventNote />
          </ListItemIcon>
          <ListItemText primary="My Appointments" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation("/specialists")}>
          <ListItemIcon sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}>
            <PeopleAlt />
          </ListItemIcon>
          <ListItemText primary="Specialists" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation("/health-records")}>
          <ListItemIcon sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}>
            <History />
          </ListItemIcon>
          <ListItemText primary="My History" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation("/payments")}>
          <ListItemIcon sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}>
            <Payment />
          </ListItemIcon>
          <ListItemText primary="Payments" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation("/customer-care")}>
          <ListItemIcon sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}>
            <Headset />
          </ListItemIcon>
          <ListItemText primary="Customer Care" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation("/my-account")}>
          <ListItemIcon sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="My Account" />
        </ListItem>
        {/* Additional Items */}
        <ListItem button sx={{ paddingTop: 20 }} onClick={() => handleNavigation("/light-mode")}>
          <ListItemIcon sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}>
            {brightnessMode ? <Brightness7 /> : <Brightness4 />}
          </ListItemIcon>
          <ListItemText primary="Light Mode" />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3,paddingBottom:'15px' }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </>
  );
}

export default Sidebar;
