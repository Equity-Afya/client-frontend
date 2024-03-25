import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import api from "../../services/api"; // Import your API service

const MyHistory = () => {
  const [loading, setLoading] = useState(true); // State to manage loading indicator

  useEffect(() => {
    // Function to fetch form data from the database
    const fetchFormData = async () => {
      try {
        const response = await api.get("/appointmenthistory");

        if (response.status === 200) {
          setLoading(false); // Turn off loading indicator
        } else {
          throw new Error("Internal Server error");
        }
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchFormData(); // Call the fetchFormData function when the component mounts
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        My History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              // Display loading indicator if data is being fetched
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              // Directly render fetched data
              <TableRow>
                <TableCell>Fetched Full Name</TableCell>
                <TableCell>Fetched Phone Number</TableCell>
                <TableCell>Fetched Service</TableCell>
                <TableCell>Fetched Date</TableCell>
                <TableCell>Fetched Time</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/payments-page"
        sx={{ mt: 2 }}
      >
        Proceed to Payments
      </Button>
    </Container>
  );
};

export default MyHistory;
