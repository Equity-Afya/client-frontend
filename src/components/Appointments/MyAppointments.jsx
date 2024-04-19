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
import api from "../../services/api";

const AppointmentHistory = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState([]);
  const [idNumber, setIdNumber] = useState("");

  useEffect(() => {

    const fetchIdNumber = async () => {
      try {
        const response = await api.get("/idNumberEndpoint"); 

        if (response.status === 200) {
          setIdNumber(response.data.idNumber); 
        } else {
          throw new Error("Failed to fetch ID number");
        }
      } catch (error) {
        console.error("Error fetching ID number:", error);
      }
    };

    fetchIdNumber(); // Call the fetchIdNumber function when the component mounts
  }, []);

  useEffect(() => {
    // Function to fetch form data from the database
    const fetchFormData = async () => {
      try {
        const response = await api.get(`/appointmenthistory/${idNumber}`);

        if (response.status === 200) {
          setFormData(response.data); // Store fetched data in state
          setLoading(false); // Turn off loading indicator
        } else {
          throw new Error("Internal Server error");
        }
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    if (idNumber) {
      fetchFormData(); // Call the fetchFormData function only if idNumber is truthy
    }
  }, [idNumber]);

  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        My Appointments
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
            ) : formData.length === 0 ? ( // Display a message if no data is available
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              // Map over fetched data and render rows
              formData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>{data.fullName}</TableCell>
                  <TableCell>{data.phoneNumber}</TableCell>
                  <TableCell>{data.service}</TableCell>
                  <TableCell>{data.date}</TableCell>
                  <TableCell>{data.time}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/payments"
        sx={{ mt: 2 }}
      >
        Proceed to Payments
      </Button>
    </Container>
  );
};

export default AppointmentHistory;
