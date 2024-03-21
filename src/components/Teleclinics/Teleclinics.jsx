import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { ArrowRightAltRounded } from "@mui/icons-material";
import CardContent from "@mui/material/CardContent";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import myImage from "../../assets/teleclinics_photo.jpg";

const theme = createTheme({
  palette: {
    primary: {
      main: "#c00100",
    },
  },
});

function TeleclinicsCard() {
  const [selectedFacility, setSelectedFacility] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [teleclinicFacilities, setTeleclinicFacilities] = useState([]);

  // Simulating fetching data from an API
  useEffect(() => {
    // Replace this with actual API fetch logic
    const fetchTeleclinics = async () => {
      try {
        // Simulated API call to fetch teleclinics
        const response = await fetch("https://api.example.com/teleclinics");
        const data = await response.json();
        // Update state with fetched teleclinics
        setTeleclinicFacilities(data);
      } catch (error) {
        console.error("Error fetching teleclinics:", error);
      }
    };

    fetchTeleclinics();
  }, []);

  const handleFacilityChange = (event) => {
    setSelectedFacility(event.target.value);
    setErrorMessage("");
  };

  const handleButtonClick = () => {
    if (!selectedFacility) {
      setErrorMessage("Please select a facility first.");
      return;
    }
    console.log("Navigating to booking appointment...");
  };

  return (
    <ThemeProvider theme={theme}>
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          maxWidth: "500px",
          height: "auto",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          outline: "1px solid #c00100",
        }}
      >
        <CardContent>
          <h3>Teleclinics</h3>
          <h5>Select facility</h5>
          <TextField
            select
            value={selectedFacility}
            onChange={handleFacilityChange}
            variant="outlined"
            style={{
              width: "75%",
              height: "auto",
              "&:focus": { color: "#c00100" },
            }}
            label={selectedFacility ? "" : "Select a facility"}
          >
            {teleclinicFacilities.map((facility, index) => (
              <MenuItem key={index} value={facility}>
                {facility}
              </MenuItem>
            ))}
          </TextField>
          <img
            src={myImage}
            alt="Teleclinics Image"
            style={{
              width: "400px",
              height: "250px",
              marginTop: "20px",
            }}
          />
          <h5>Book appointment</h5>
          <Button
            variant="contained"
            onClick={handleButtonClick}
            disabled={!selectedFacility}
            style={{
              backgroundColor: "#c00100",
              color: "white",
              marginTop: "10px",
              cursor: "pointer",
              "&:hover": { backgroundColor: "#c00100" },
            }}
          >
            <ArrowRightAltRounded />
          </Button>
          {errorMessage && (
            <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
          )}
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

export default TeleclinicsCard;
