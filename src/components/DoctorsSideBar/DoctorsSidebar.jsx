import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Home,
  Person,
  ListAlt,
  Done,
  Notifications,
  ContactSupport,
  Brightness4,
  ExitToApp,
} from "@mui/icons-material";

const DoctorsSideBar = () => {
  const [darkMode, setDarkMode] = useState(true);
  const location = useLocation();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      style={{
        width: "20%",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        background: darkMode ? "#c00100" : "#fff",
        color: darkMode ? "#fff" : "#c00100",
        zIndex: 1000,
        outline: "1px solid #c00100", // Add outline to sidebar
      }}
    >
      <List>
        <ListItem>
          <ListItemText primary="Teleafya" />
        </ListItem>
        <Divider />
        <ListItem
          button
          component={Link}
          to="/doctor-dashboard"
          style={{
            backgroundColor:
              location.pathname === "/doctor-dashboard"
                ? "yellow"
                : "transparent",
          }}
        >
          <ListItemIcon>
            <Home color={darkMode ? "white" : "black"} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/doctors-profile"
          style={{
            backgroundColor:
              location.pathname === "/doctors-profile"
                ? "yellow"
                : "transparent",
          }}
        >
          <ListItemIcon>
            <Person color={darkMode ? "white" : "black"} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/reviewed-patients"
          style={{
            backgroundColor:
              location.pathname === "/reviewed-patients"
                ? "yellow"
                : "transparent",
          }}
        >
          <ListItemIcon>
            <ListAlt color={darkMode ? "white" : "black"} />
          </ListItemIcon>
          <ListItemText primary="Reviewed Patients" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/approved-bookings"
          style={{
            backgroundColor:
              location.pathname === "/approved-bookings"
                ? "yellow"
                : "transparent",
          }}
        >
          <ListItemIcon>
            <Done color={darkMode ? "white" : "black"} />
          </ListItemIcon>
          <ListItemText primary="Approved Bookings" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/pending-bookings"
          style={{
            backgroundColor:
              location.pathname === "/pending-bookings"
                ? "yellow"
                : "transparent",
          }}
        >
          <ListItemIcon>
            <Notifications color={darkMode ? "white" : "black"} />
          </ListItemIcon>
          <ListItemText primary="Pending Bookings" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/doctors-customer-care"
          style={{
            backgroundColor:
              location.pathname === "/doctors-customer-care"
                ? "yellow"
                : "transparent",
          }}
        >
          <ListItemIcon>
            <ContactSupport color={darkMode ? "white" : "black"} />
          </ListItemIcon>
          <ListItemText primary="Customer Care" />
        </ListItem>
      </List>
      <Divider />

      <div style={{ marginTop: "20vh", color: darkMode ? "#fff" : "#333" }}>
        <List>
          <ListItem button onClick={toggleTheme}>
            <ListItemIcon>
              <Brightness4 color={darkMode ? "white" : "black"} />
            </ListItemIcon>
            <ListItemText primary={darkMode ? "Light Mode" : "Dark Mode"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ExitToApp color={darkMode ? "white" : "black"} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default DoctorsSideBar;
