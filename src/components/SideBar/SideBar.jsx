import { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
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
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios library for making HTTP requests

function Sidebar() {
  const navigate = useNavigate();
  const [brightnessMode, setBrightnessMode] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/logout"); // Send POST request to logout endpoint
      // After successful logout, redirect the user to the login page
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleNavigation = (route) => {
    if (route === "/light-mode") {
      setBrightnessMode(!brightnessMode); // Toggle brightness mode
    } else {
      navigate(route);
    }
  };

  return (
    <>
      <CssBaseline />
      <div style={{ height: "100vh", overflow: "hidden" }}>
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
            <ListItemIcon
              sx={{
                color: brightnessMode ? "#000000" : "white",
                marginRight: -3,
              }}
            >
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation("/appointments")}>
            <ListItemIcon
              sx={{
                color: brightnessMode ? "#000000" : "white",
                marginRight: -3,
              }}
            >
              <EventNote />
            </ListItemIcon>
            <ListItemText primary="My Appointments" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation("/specialists")}>
            <ListItemIcon
              sx={{
                color: brightnessMode ? "#000000" : "white",
                marginRight: -3,
              }}
            >
              <PeopleAlt />
            </ListItemIcon>
            <ListItemText primary="Specialists" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation("/health-records")}>
            <ListItemIcon
              sx={{
                color: brightnessMode ? "#000000" : "white",
                marginRight: -3,
              }}
            >
              <History />
            </ListItemIcon>
            <ListItemText primary="My History" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation("/payments")}>
            <ListItemIcon
              sx={{
                color: brightnessMode ? "#000000" : "white",
                marginRight: -3,
              }}
            >
              <Payment />
            </ListItemIcon>
            <ListItemText primary="Payments" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation("/customer-care")}>
            <ListItemIcon
              sx={{
                color: brightnessMode ? "#000000" : "white",
                marginRight: -3,
              }}
            >
              <Headset />
            </ListItemIcon>
            <ListItemText primary="Customer Care" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation("/my-account")}>
            <ListItemIcon
              sx={{
                color: brightnessMode ? "#000000" : "white",
                marginRight: -3,
              }}
            >
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="My Account" />
          </ListItem>
          {/* Additional Items */}
          <ListItem
            button
            sx={{ paddingTop: 22 }}
            onClick={() => handleNavigation("/light-mode")}
          >
            <ListItemIcon
              sx={{
                color: brightnessMode ? "#000000" : "white",
                marginRight: -3,
              }}
            >
              {brightnessMode ? <Brightness7 /> : <Brightness4 />}
            </ListItemIcon>
            <ListItemText primary="Light Mode" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon
              sx={{
                color: brightnessMode ? "#000000" : "white",
                marginRight: -3,
              }}
            >
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </div>
    </>
  );
}

export default Sidebar;
