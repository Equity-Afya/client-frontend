import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemIcon, ListItemText, CssBaseline, IconButton, Box } from "@mui/material";
import { Dashboard, PeopleAlt, LocalHospital, MedicalServices, AssignmentInd, Assessment, Business, LocalHospitalOutlined, Fullscreen, FullscreenExit, Brightness4, Logout } from "@mui/icons-material";
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
    const [loggedInUsersCount, setLoggedInUsersCount] = useState(0);
    const [servicesCount, setServicesCount] = useState(0);
    const [chpsCount, setChpsCount] = useState(0);
    const [doctorsCount, setDoctorsCount] = useState(0);
    const [clinicsCount, setClinicsCount] = useState(0);
    const [rolesCount, setRolesCount] = useState(0);

    useEffect(() => {
        const fetchLoggedInUsers = async () => {
            try {
                const endDate = new Date();
                const startDate = new Date();
                startDate.setMonth(startDate.getMonth() - 3);

                const response = await axios.get('/login', {
                    params: {
                        startDate: startDate.toISOString(),
                        endDate: endDate.toISOString()
                    }
                });

                setLoggedInUsersCount(response.data.users ? response.data.users.length : 0);
            } catch (error) {
                console.error('Error fetching logged-in users:', error);
            }
        };

        fetchLoggedInUsers();
    }, []);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://192.168.88.244:5500/api/service/viewallservices');
              setServicesCount(response.data.services ? response.data.services.length : 0);
              console.log(response.data)
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    useEffect(() => {
        const fetchChps = async () => {
            try {
                const response = await axios.get('http://192.168.88.244:5500/api/chp/viewallchps');
              setChpsCount(response.data ? response.data.length : 0);
              console.log(response.data)
            } catch (error) {
                console.error('Error fetching CHPS:', error);
            }
        };

        fetchChps();
    }, []);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://192.168.88.244:5500/api/doctor/viewalldoctors');
              setDoctorsCount(response.data ? response.data.length : 0);
              console.log(response.data)
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

    useEffect(() => {
        const fetchClinics = async () => {
            try {
                const response = await axios.get('http://192.168.88.244:5500/api/teleclinic/viewallteleclinics');
                setClinicsCount(response.data ? response.data.length : 0);
            } catch (error) {
                console.error('Error fetching clinics:', error);
            }
        };

        fetchClinics();
    }, []);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get('http://192.168.88.244:5500/api/roles/getallroles');
              setRolesCount(response.data ? response.data.length : 0);
              console.log(response.data)
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchRoles();
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
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: 240,
                    height: "100vh",
                    backgroundColor: brightnessMode ? "#FFFFFF" : "#7B0100",
                    color: brightnessMode ? "#000000" : "white",
                    border: brightnessMode ? "1px solid #c00100" : "none"
                }}
            >
                <List sx={{ paddingTop: 0 }}>
                    <StyledListItem button onClick={() => handleNavigation("/admin-dashboard")}>
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
                    <StyledListItem button onClick={() => handleNavigation("/active-users")}>
                        <ListItemIcon sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}>
                            <PeopleAlt />
                        </ListItemIcon>
                        <ListItemText primary={`Users (${loggedInUsersCount})`} />
                    </StyledListItem>
                    <StyledListItem button onClick={() => handleNavigation("/admin-servicemanagement")}>
                        <ListItemIcon sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}>
                            <MedicalServices />
                        </ListItemIcon>
                        <ListItemText primary={`Services (${servicesCount})`} />
                    </StyledListItem>
                    <StyledListItem button onClick={() => handleNavigation("/manage-chps")}>
                        <ListItemIcon sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}>
                            <LocalHospital />
                        </ListItemIcon>
                        <ListItemText primary={`CHPS (${chpsCount})`} />
                    </StyledListItem>
                    <StyledListItem button onClick={() => handleNavigation("/doctors")}>
                        <ListItemIcon sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}>
                            <AssignmentInd />
                        </ListItemIcon>
                        <ListItemText primary={`Doctors (${doctorsCount})`} />
                    </StyledListItem>
                    <StyledListItem button onClick={() => handleNavigation("/reports")}>
                        <ListItemIcon sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}>
                            <Assessment />
                        </ListItemIcon>
                        <ListItemText primary="Reports" />
                    </StyledListItem>
                    <StyledListItem button onClick={() => handleNavigation("/clinics")}>
                        <ListItemIcon sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}>
                            <Business />
                        </ListItemIcon>
                        <ListItemText primary={`Clinics (${clinicsCount})`} />
                    </StyledListItem>
                    <StyledListItem button onClick={() => handleNavigation("/roles")}>
                        <ListItemIcon sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}>
                            <LocalHospitalOutlined />
                        </ListItemIcon>
                        <ListItemText primary={`Roles (${rolesCount})`} />
                    </StyledListItem>
                </List>
                <List sx={{ paddingBottom: 2 }}>
                    <StyledListItem button onClick={() => handleNavigation("/light-mode")}>
                        <ListItemIcon sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}>
                            <Brightness4 />
                        </ListItemIcon>
                        <ListItemText primary="Theme" />
                    </StyledListItem>
                    <StyledListItem button onClick={() => handleNavigation("/logout")}>
                        <ListItemIcon sx={{ color: brightnessMode ? "#000000" : "white", marginRight: -3 }}>
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
