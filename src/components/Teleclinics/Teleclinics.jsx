import React, { useEffect, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { Search } from "@mui/icons-material";

const Teleclinics = () => {
  const [teleclinics, setTeleclinics] = useState([]);
  const [facilitiesPerPage, setFacilitiesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [noMatchError, setNoMatchError] = useState(false);
  const [services, setServices] = useState([]);

  const fetchTeleclinicsData = async () => {
    try {
      const response = await fetch(
        "https://64ac-102-210-244-74.ngrok-free.app/api/facility"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch teleclinics");
      }
      const data = await response.json();
      const sortedTeleclinics = data.sort((a, b) =>
        a.facility.localeCompare(b.facility)
      );
      setTeleclinics(sortedTeleclinics);
    } catch (error) {
      console.error("Error fetching teleclinics data:", error);
    }
  };

  useEffect(() => {
    fetchTeleclinicsData();
  }, []);

  const handleShowMore = () => {
    setFacilitiesPerPage(facilitiesPerPage + 5);
  };

  const totalPages = Math.ceil(teleclinics.length / facilitiesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewServices = async (facility) => {
    setSelectedFacility(facility);
    try {
      const response = await fetch(
        `https://your-backend-api.com/services?facility=${facility}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch services for facility");
      }
      const data = await response.json();
      setServices(data.services);
    } catch (error) {
      console.error("Error fetching services:", error);
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

  return (
    <div
      style={{
        height: "100vh",
        width: "80vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ backgroundColor: "#E6F0F8", padding: "2%", width: "100%" }}>
        <h2 style={{ paddingLeft: "40%" }}>Our Teleclinics</h2>
        <Box
          sx={{
            marginBottom: "20px",
            paddingLeft: "15%",
            borderRadius: "10px",
            width: "75%",
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#c00100",
              },
          }}
        >
          <TextField
            style={{ backgroundColor: "#fff" }}
            fullWidth
            variant="outlined"
            placeholder="Search by teleclinic name or address"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <Search />,
            }}
          />
        </Box>
        {noMatchError && <p>No matching facilities or addresses found.</p>}
        <Box
          sx={{
            backgroundColor: "#ffffff",
            border: "1px solid #670909",
            padding: "20px",
            outline: "none",
            width: "100%",
            position: "relative",
            borderRadius: "20px",
          }}
        >
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Facility</th>
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
                    <td>{teleclinic.address}</td>
                    <td>
                      <Button
                        onClick={() => handleViewServices(teleclinic.facility)}
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
              >
                {page + 1}
              </Button>
            ))}
          </div>
        </Box>
      </div>
      {facilitiesPerPage < teleclinics.length && (
        <button onClick={handleShowMore}>Show More</button>
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
            <button onClick={handleCloseServices}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teleclinics;
