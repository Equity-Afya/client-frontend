import { useState, useNavigate } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  IconButton,
  Box,
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
} from "@mui/material";
import axios from "axios";

function Sidebar() {
  const navigate = useNavigate();
  const [brightnessMode, setBrightnessMode] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/logout");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleNavigation = (route) => {
    if (route === "/light-mode") {
      setBrightnessMode(!brightnessMode);
    } else {
      navigate(route);
    }
  };

  const toggleFullscreen = () => {
    if (!fullscreenMode) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setFullscreenMode(!fullscreenMode);
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: fullscreenMode ? "100vh" : "auto",
        }}
      >
        <List
          sx={{
            flex: 1,
            backgroundColor: brightnessMode ? "#FFFFFF" : "#C00100",
            color: brightnessMode ? "#000000" : "white",
            paddingTop: 0,
          }}
        >
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
            <IconButton
              onClick={toggleFullscreen}
              sx={{ color: brightnessMode ? "#000000" : "white" }}
            >
              {fullscreenMode ? <FullscreenExit /> : <Fullscreen />}
            </IconButton>
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
      </Box>
    </>
  );
}

export default Sidebar;
