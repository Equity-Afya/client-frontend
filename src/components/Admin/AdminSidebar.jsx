import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemIcon, ListItemText, CssBaseline, IconButton } from "@mui/material";
import { Dashboard, PeopleAlt, LocalHospital, MedicalServices, AssignmentInd, Assessment, Assignment, Fullscreen, FullscreenExit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const StyledListItem = styled(ListItem)`
  && {
    padding-top: ${({ theme }) => theme.paddingTop};
  }
`;

function AdminSidebar() {
    const navigate = useNavigate();
    const [brightnessMode, setBrightnessMode] = useState(false);
    const [fullscreenMode, setFullscreenMode] = useState(false);
    const [loggedInUsersCount, setLoggedInUsersCount] = useState(0); // State to hold the number of logged-in users

    useEffect(() => {
        const fetchLoggedInUsersCount = async () => {
            try {
                const response = await axios.get('/api/logged-in-users/count'); // Adjust the endpoint as per your backend
                setLoggedInUsersCount(response.data.count);
            } catch (error) {
                console.error('Error fetching logged-in users count:', error);
            }
        };

        fetchLoggedInUsersCount();
    }, []);

    const handleNavigation = (route) => {
        if (route === '/light-mode') {
            setBrightnessMode(!brightnessMode);
        } else {
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
        <List
          sx={{
            width: 240,
            height: "100%",
            backgroundColor: brightnessMode ? "#FFFFFF" : "#7B0100",
            color: brightnessMode ? "#000000" : "white",
            paddingTop: 0,
          }}
        >
          <StyledListItem button onClick={() => handleNavigation("/dashboard")}>
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
          </StyledListItem>
          <StyledListItem button onClick={() => handleNavigation("/users")}>
            <ListItemIcon sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}>
              <PeopleAlt />
            </ListItemIcon>
            <ListItemText primary={`Users (${loggedInUsersCount})`} />
          </StyledListItem>
          <StyledListItem button onClick={() => handleNavigation("/services")}>
            <ListItemIcon sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}>
              <MedicalServices />
            </ListItemIcon>
            <ListItemText primary="Services" />
          </StyledListItem>
          <StyledListItem button onClick={() => handleNavigation("/chps")}>
            <ListItemIcon sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}>
              <LocalHospital />
            </ListItemIcon>
            <ListItemText primary="CHPS" />
          </StyledListItem>
          <StyledListItem button onClick={() => handleNavigation("/doctors")}>
            <ListItemIcon sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}>
              <AssignmentInd />
            </ListItemIcon>
            <ListItemText primary="Doctors" />
          </StyledListItem>
          <StyledListItem button onClick={() => handleNavigation("/reports")}>
            <ListItemIcon sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}>
              <Assessment />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </StyledListItem>
          <StyledListItem button onClick={() => handleNavigation("/clinics")}>
            <ListItemIcon sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}>
              <Assignment />
            </ListItemIcon>
            <ListItemText primary="Clinics" />
          </StyledListItem>
          <StyledListItem button onClick={() => handleNavigation("/roles")}>
            <ListItemIcon sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}>
              <Assignment />
            </ListItemIcon>
            <ListItemText primary="Roles" />
          </StyledListItem>
        </List>
      </>
    );
}

export default AdminSidebar;
