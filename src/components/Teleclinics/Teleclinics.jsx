import { useState } from "react"; // Import React and useState
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { ArrowRightAltRounded } from "@mui/icons-material";
import CardContent from "@mui/material/CardContent";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button"; // Import Button component
import { ThemeProvider, createTheme } from "@mui/material/styles"; // Import ThemeProvider and createTheme

import myImage from "../../assets/teleclinics_photo.jpg";

const teleclinicFacilities = [
  "Equityafia Ruiru",
  "Equityafia Nakuru",
  "Equityafia Ngong",
  "Equityafia Donholm",
  "Equityafia Thika",
  "Equityafia Upperhill",
  // Add more facilities as needed
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#c00100", // Set primary color to #c00100
    },
  },
});

function TeleclinicsCard() {
  const [selectedFacility, setSelectedFacility] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFacilityChange = (event) => {
    setSelectedFacility(event.target.value);
    setErrorMessage(""); // Reset error message when facility is selected
  };

  const handleButtonClick = () => {
    // Check if a facility is selected
    if (!selectedFacility) {
      // Set error message if no facility is selected
      setErrorMessage("Please select a facility first.");
      return;
    }
    // Perform navigation logic here
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
          backgroundColor: "#D9D9D9",
          borderRadius: "10px",
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
            label={selectedFacility ? "" : "Select a facility"} // Conditionally render label
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
            disabled={!selectedFacility} // Disable button if no facility is selected
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
          {/* Display error message if no facility is selected */}
          {errorMessage && (
            <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
          )}
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

export default TeleclinicsCard;
