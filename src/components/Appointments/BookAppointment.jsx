import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  MenuItem,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    minHeight: "100vh",
    paddingTop: "1vh",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: "32px",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  button: {
    marginTop: "20px",
    backgroundColor: "#c00100",
    color: "#fff",
  },
  header: {
    backgroundColor: "#c00100",
    color: "#fff",
    padding: "16px 0",
    textAlign: "center",
    borderRadius: "8px 8px 0 0",
  },
  successMessage: {
    marginTop: "20px",
    color: "green",
  },
  errorMessage: {
    marginTop: "20px",
    color: "red",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  },
};

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    idNumber: "",
    fullName: "",
    phoneNumber: "",
    service: "",
    time: "",
    appointmentType: "",
    age: "",
    gender: "",
    bookFor: "",
    residence: "",
  });
  const [services, setServices] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingUserData, setIsFetchingUserData] = useState(false);
  const navigate = useNavigate();

  const getUserData = async (idNumber) => {
    setIsFetchingUserData(true);
    try {
      const response = await axios.get(`http://192.168.90.31:5500/api/patient/viewonepatient/${idNumber}`);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setErrorMessage("Failed to fetch user data. Please try again.");
      return null;
    } finally {
      setIsFetchingUserData(false);
    }
  };

  useEffect(() => {
    if (formData.bookFor === "myself") {
      if (formData.idNumber === "") {
        setErrorMessage("Please fill in the ID field first.");
      } else {
        getUserData(formData.idNumber).then((userData) => {
          if (userData) {
            setFormData((prevFormData) => ({
              ...prevFormData,
              idNumber: userData.idNumber,
              fullName: userData.name,
              phoneNumber: userData.phoneNumber,
              age: userData.age,
              gender: userData.gender,
              residence: userData.residence,
            }));
          }
        });
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        idNumber: "",
        fullName: "",
        phoneNumber: "",
        age: "",
        gender: "",
        residence: "",
      }));
    }
  }, [formData.bookFor]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://192.168.90.31:5500/api/service/viewallservices");
        if (response.status === 200) {
          console.log('Fetched services:', response.data); // Debug log
          setServices(response.data || []);
        } else {
          throw new Error("Failed to fetch services");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setErrorMessage("Failed to fetch services. Please try again.");
      }
    };

    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    for (const key in formData) {
      if (formData[key] === "" && key !== "time") {
        setErrorMessage("Please fill in all required fields.");
        return false;
      }
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://192.168.90.31:5500/api/appointments/bookappointment",
        formData
      );
      if (response.status === 201) {
        const { appointmentId } = response.data;
        setSuccessMessage("Appointment booked successfully");
        setErrorMessage("");
        setOpenSnackbar(true);
        setFormData({
          idNumber: "",
          fullName: "",
          phoneNumber: "",
          service: "",
          time: "",
          appointmentType: "",
          age: "",
          gender: "male",
          bookFor: "myself",
          residence: "",
        });
        setTimeout(() => {
          navigate("/payments", { state: { appointmentId } });
        }, 2000);
      } else {
        setSuccessMessage("");
        setErrorMessage("Error booking appointment");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      setSuccessMessage("");
      setErrorMessage("Error booking appointment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container style={styles.container} maxWidth="lg">
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <div style={styles.formContainer}>
            <div style={styles.header}>
              <Typography variant="h4">Book Appointment</Typography>
            </div>
            {successMessage && (
              <Typography
                variant="body1"
                align="center"
                style={styles.successMessage}
              >
                {successMessage}
              </Typography>
            )}
            {errorMessage && (
              <Typography variant="body1" align="center" style={styles.errorMessage}>
                {errorMessage}
              </Typography>
            )}
            {isFetchingUserData && (
              <Typography variant="body1" align="center">
                Fetching user data...
              </Typography>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                label="ID Number"
                variant="outlined"
                fullWidth
                margin="normal"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                required
              />
              <TextField
                label="Book For"
                variant="outlined"
                fullWidth
                margin="normal"
                select
                name="bookFor"
                value={formData.bookFor}
                onChange={handleChange}
                required
              >
                <MenuItem value="myself">Myself</MenuItem>
                <MenuItem value="others">Other</MenuItem>
              </TextField>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                margin="normal"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                margin="normal"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
              <TextField
                label="Service"
                variant="outlined"
                fullWidth
                margin="normal"
                select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                {services.map((service) => (
                  <MenuItem key={service.id} value={service.name}>
                    {service.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Appointment Type"
                variant="outlined"
                fullWidth
                margin="normal"
                select
                name="appointmentType"
                value={formData.appointmentType}
                onChange={handleChange}
                required
              >
                <MenuItem value="physical">Physical</MenuItem>
                <MenuItem value="virtual">Virtual</MenuItem>
              </TextField>
              <TextField
                label="Age"
                variant="outlined"
                fullWidth
                margin="normal"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
              <TextField
                label="Gender"
                variant="outlined"
                fullWidth
                margin="normal"
                select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
              <TextField
                label="Residence"
                variant="outlined"
                fullWidth
                margin="normal"
                name="residence"
                value={formData.residence}
                onChange={handleChange}
                required
              />
              <div style={styles.loadingContainer}>
                <Button
                  variant="contained"
                  style={styles.button}
                  fullWidth
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : "Book Appointment"}
                </Button>
              </div>
              <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={() => setOpenSnackbar(false)}
                message={successMessage || errorMessage}
              />
            </form>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookAppointment;
