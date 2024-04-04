import React from "react";
import { Link } from "react-router-dom";
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
  return (
    <div
      style={{
        width: "20%",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        background: "#fff",
        zIndex: 1000,
        backgroundColor: "#c00100",
        color: "#fff",
      }}
    >
      <List>
        <ListItem>
          <ListItemText primary="Teleafya" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/home">
          <ListItemIcon>
            <Home color="white" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/profile">
          <ListItemIcon>
            <Person color="white" />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button component={Link} to="/reviewed-patients">
          <ListItemIcon>
            <ListAlt color="white" />
          </ListItemIcon>
          <ListItemText primary="Reviewed Patients" />
        </ListItem>
        <ListItem button component={Link} to="/approved-bookings">
          <ListItemIcon>
            <Done color="white" />
          </ListItemIcon>
          <ListItemText primary="Approved Bookings" />
        </ListItem>
        <ListItem button component={Link} to="/pending-bookings">
          <ListItemIcon>
            <Notifications color="white" />
          </ListItemIcon>
          <ListItemText primary="Pending Bookings" />
        </ListItem>
        <ListItem button component={Link} to="/customer-care">
          <ListItemIcon>
            <ContactSupport color="white" />
          </ListItemIcon>
          <ListItemText primary="Customer Care" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <Brightness4 color="white" />
          </ListItemIcon>
          <ListItemText primary="Light Mode" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ExitToApp color="white" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );
};

export default DoctorsSideBar;
