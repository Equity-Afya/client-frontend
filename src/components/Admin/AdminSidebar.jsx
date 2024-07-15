import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  IconButton,
  Box
} from "@mui/material";
import {
  Dashboard,
  PeopleAlt,
  LocalHospital,
  MedicalServices,
  AssignmentInd,
  Assessment,
  Business,
  LocalHospitalOutlined,
  Fullscreen,
  FullscreenExit,
  Brightness4,
  Logout,
  LocalPharmacy
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import axios from "axios";

const activeStyle = css`
  color: #ff9;
  background-color: #333;
`;

const StyledListItem = styled(ListItem)`
  && {
    padding-top: 8px;
    color: inherit;
    background-color: transparent; /* Default background color */

    ${({ active }) => active && activeStyle} /* Apply active styles */
  }
`;

function AdminSidebar() {
  const navigate = useNavigate();
  const [brightnessMode, setBrightnessMode] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const [loggedInUsersCount, setLoggedInUsersCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);
  const [chpsCount, setChpsCount] = useState(0);
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [pharmacistsCount, setPharmacistsCount] = useState(0);
  const [clinicsCount, setClinicsCount] = useState(0);
  const [rolesCount, setRolesCount] = useState(0);
  const [activeRoute, setActiveRoute] = useState("/admin-dashboard");

  useEffect(() => {
    const fetchLoggedInUsers = async () => {
      try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 3);

        const response = await axios.get("/login", {
          params: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          },
        });

        setLoggedInUsersCount(response.data.users ? response.data.users.length : 0);
      } catch (error) {
        console.error("Error fetching logged-in users:", error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await axios.get("/services");
        setServicesCount(response.data.services ? response.data.services.length : 0);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    const fetchChps = async () => {
      try {
        const response = await axios.get("http://192.168.89.172:5500/api/chp/viewallchps");
        setChpsCount(response.data.chps ? response.data.chps.length : 0);
      } catch (error) {
        console.error("Error fetching CHPS:", error);
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://192.168.89.172:5500/api/doctor/viewalldoctors"
        );
        setDoctorsCount(response.data.doctors ? response.data.doctors.length : 0);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    const fetchPharmacists = async () => {
      try {
        const response = await axios.get("http://192.168.89.172:5500/api/auth/pharmacist/register'");
        setPharmacistsCount(response.data.pharmacists ? response.data.pharmacists.length : 0);
      } catch (error) {
        console.error("Error fetching pharmacists:", error);
      }
    };

    const fetchClinics = async () => {
      try {
        const response = await axios.get("http://192.168.89.172:5500/api/teleclinic/viewallteleclinics");
        setClinicsCount(response.data.clinics ? response.data.clinics.length : 0);
      } catch (error) {
        console.error("Error fetching clinics:", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get("/roles");
        setRolesCount(response.data.roles ? response.data.roles.length : 0);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchLoggedInUsers();
    fetchServices();
    fetchChps();
    fetchDoctors();
    fetchPharmacists();
    fetchClinics();
    fetchRoles();
  }, []);

  const handleNavigation = (route) => {
    if (route === "/light-mode") {
      setBrightnessMode(!brightnessMode);
    } else {
      setActiveRoute(route);
      navigate(route);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
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
          justifyContent: "space-between",
          width: 240,
          height: "100vh",
          backgroundColor: brightnessMode ? "#FFFFFF" : "#7B0100",
          color: brightnessMode ? "#000000" : "white",
          border: brightnessMode ? "1px solid #c00100" : "none",
        }}
      >
        <List sx={{ paddingTop: 0 }}>
          <StyledListItem
            button
            active={activeRoute === "/admin-dashboard"}
            onClick={() => handleNavigation("/admin-dashboard")}
          >
            <ListItemIcon
              sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}
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
          </StyledListItem>
          <StyledListItem
            button
            active={activeRoute === "/active-users"}
            onClick={() => handleNavigation("/active-users")}
          >
            <ListItemIcon
              sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}
            >
              <PeopleAlt />
            </ListItemIcon>
            <ListItemText primary={`Users (${loggedInUsersCount})`} />
          </StyledListItem>
          <StyledListItem
            button
            active={activeRoute === "/manage-services"}
            onClick={() => handleNavigation("/manage-services")}
          >
            <ListItemIcon
              sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}
            >
              <MedicalServices />
            </ListItemIcon>
            <ListItemText primary={`Services (${servicesCount})`} />
          </StyledListItem>
          <StyledListItem
            button
            active={activeRoute === "/manage-chps"}
            onClick={() => handleNavigation("/manage-chps")}
          >
            <ListItemIcon
              sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}
            >
              <LocalHospital />
            </ListItemIcon>
            <ListItemText primary={`CHPS (${chpsCount})`} />
          </StyledListItem>
          <StyledListItem
            button
            active={activeRoute === "/manage-doctors"}
            onClick={() => handleNavigation("/manage-doctors")}
          >
            <ListItemIcon
              sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}
            >
              <AssignmentInd />
            </ListItemIcon>
            <ListItemText primary={`Doctors (${doctorsCount})`} />
          </StyledListItem>
          <StyledListItem
            button
            active={activeRoute === "/manage-pharmacist"}
            onClick={() => handleNavigation("/manage-pharmacist")}
          >
            <ListItemIcon
              sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}
            >
              <LocalPharmacy />
            </ListItemIcon>
            <ListItemText primary={`Pharmacists (${pharmacistsCount})`} />
          </StyledListItem>
          <StyledListItem
            button
            active={activeRoute === "/admin-latest-bookings"}
            onClick={() => handleNavigation("/admin-latest-bookings")}
          >
            <ListItemIcon
              sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}
            >
              <Assessment />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </StyledListItem>
          <StyledListItem
            button
            active={activeRoute === "/manage-clinics"}
            onClick={() => handleNavigation("/manage-clinics")}
          >
            <ListItemIcon
              sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}
            >
              <Business />
            </ListItemIcon>
            <ListItemText primary={`Clinics (${clinicsCount})`} />
          </StyledListItem>
          <StyledListItem
            button
            active={activeRoute === "/roles"}
            onClick={() => handleNavigation("/roles")}
          >
            <ListItemIcon
              sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}
            >
              <LocalHospitalOutlined />
            </ListItemIcon>
            <ListItemText primary={`Roles (${rolesCount})`} />
          </StyledListItem>
        </List>
        <List sx={{ paddingBottom: 2 }}>
          <StyledListItem
            button
            active={activeRoute === "/light-mode"}
            onClick={() => handleNavigation("/light-mode")}
          >
            <ListItemIcon
              sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}
            >
              <Brightness4 />
            </ListItemIcon>
            <ListItemText primary="Theme" />
          </StyledListItem>
          <StyledListItem
            button
            active={activeRoute === "/logout"}
            onClick={() => handleNavigation("/logout")}
          >
            <ListItemIcon
              sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}
            >
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </StyledListItem>
        </List>
      </Box>
    </>
  );
}

export default AdminSidebar;
