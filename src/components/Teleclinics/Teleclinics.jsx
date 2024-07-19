import React, { useState, useEffect } from "react";
import { Box, TextField, Button, CircularProgress, IconButton, Menu, MenuItem } from "@mui/material";
import { Search, Notifications, AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Teleclinics = () => {
  const [teleclinics, setTeleclinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [facilitiesPerPage, setFacilitiesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [noMatchError, setNoMatchError] = useState(false);
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeleclinicsData = async () => {
      try {
        const response = await fetch(
          "http://192.168.91.100:5500/api/teleclinic/viewallteleclinics"
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }

        const data = await response.json();
        setTeleclinics(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeleclinicsData();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://192.168.91.100:5500/api/notifications");

      if (!response.ok) {
        throw new Error(`Failed to fetch notifications: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }

      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError(error.message);
    }
  };

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
    fetchNotifications();
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleShowMore = () => {
    setFacilitiesPerPage((prev) => prev + 5);
  };

  const totalPages = Math.ceil(teleclinics.length / facilitiesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewServices = (facility) => {
    setSelectedFacility(facility);
    const selectedFacilityData = teleclinics.find(
      (item) => item.facility === facility
    );
    if (selectedFacilityData) {
      setServices(selectedFacilityData.services);
    }
  };

  const handleCloseServices = () => {
    setSelectedFacility(null);
    setServices([]);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setNoMatchError(false);
  };

  const filteredTeleclinics = teleclinics.filter((teleclinic) => {
    const query = searchQuery.toLowerCase();
    return (
      teleclinic.facility.toLowerCase().includes(query) ||
      teleclinic.address.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    setNoMatchError(filteredTeleclinics.length === 0 && searchQuery !== "");
  }, [filteredTeleclinics, searchQuery]);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "79vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ backgroundColor: "#E6F0F8", padding: "1%", width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ textAlign: "left", margin: 0 }}>Our Teleclinics</h2>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "60%",
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#c00100",
              },
            }}
          >
            <TextField
              style={{ backgroundColor: "#fff", height: "50px", flex: 1 }}
              variant="outlined"
              placeholder="Search by teleclinic name or address"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: <Search style={{ color: "#c00100" }} />,
              }}
            />
            <IconButton
              style={{ color: "#c00100", marginLeft: "10px" }}
              onClick={handleNotificationClick}
            >
              <Notifications />
            </IconButton>
            <IconButton
              style={{ color: "#c00100", marginLeft: "10px" }}
              onClick={handleProfileClick}
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleNotificationClose}
          >
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <MenuItem key={index} onClick={handleNotificationClose}>
                  {notification.message}
                </MenuItem>
              ))
            ) : (
              <MenuItem onClick={handleNotificationClose}>No notifications</MenuItem>
            )}
          </Menu>
        </div>
        {noMatchError && <p>No matching facilities or addresses found.</p>}
        {error && <p>{error}</p>}
        <Box
          sx={{
            backgroundColor: "#ffffff",
            border: "1px solid #670909",
            padding: "10px",
            borderRadius: "10px",
            width: "100%",
            height: "78vh", // Fixed height for table container
            overflow: "auto",
            marginTop: "1vw",
          }}
        >
          <table style={{ width: "100%" }}>
            <thead style={{textAlign: 'left'}}>
              <tr>
                <th>Facility</th>
                <th>Location</th>
                <th>Address</th>
                <th>Services</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeleclinics
                .slice(
                  (currentPage - 1) * facilitiesPerPage,
                  currentPage * facilitiesPerPage
                )
                .map((teleclinic, index) => (
                  <tr key={index}>
                    <td>{teleclinic.facility}</td>
                    <td>{teleclinic.location}</td>
                    <td>{teleclinic.address}</td>
                    <td>
                      <Button
                        onClick={() => handleViewServices(teleclinic.facility)}
                        aria-label={`View services for ${teleclinic.facility}`}
                      >
                        View Our Services
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            {[...Array(totalPages)].map((_, page) => (
              <Button
                key={page + 1}
                onClick={() => handlePageChange(page + 1)}
                style={{
                  margin: "0 5px",
                  cursor: "pointer",
                  fontWeight: currentPage === page + 1 ? "bold" : "normal",
                }}
                aria-label={`Go to page ${page + 1}`}
              >
                {page + 1}
              </Button>
            ))}
          </div>
        </Box>
      </div>
      {facilitiesPerPage < teleclinics.length && (
        <Button
          variant="outlined"
          onClick={handleShowMore}
          style={{ marginTop: "10px" }}
        >
          Show More
        </Button>
      )}
      {selectedFacility && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "20px",
              borderRadius: "5px",
              width: "50%",
              maxHeight: "80%",
              overflowY: "scroll",
            }}
          >
            <h3>{selectedFacility} Services</h3>
            <ul>
              {services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
            <Button variant="outlined" onClick={handleCloseServices}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teleclinics;
