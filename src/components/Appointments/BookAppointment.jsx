import React, { useState } from "react";
import {
	Button,
	TextField,
	Typography,
	Container,
	Grid,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Snackbar,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const styles = {
	container: {
		minHeight: "100vh",
		paddingTop: "64px",
	},
	formContainer: {
		backgroundColor: "#fff",
		padding: "32px",
		borderRadius: "8px",
		boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
	},
	button: {
		marginTop: "20px",
		backgroundColor: "brown",
	},
	successMessage: {
		marginTop: "20px",
		color: "green",
	},
};

const BookAppointment = () => {
	const [formData, setFormData] = useState({
		idNumber: "",
		fullName: "",
		phoneNumber: "",
		service: "",
		date: "",
		time: "",
		appointmentType: "",
		age: "",
		gender: "",
		bookFor: "",
	});
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://192.168.89.29:5500/api/appointments/bookappointment",
				formData
			);
			if (response.status === 201) {
				const { appointmentId } = response.data; // Extract appointmentId from response data
				setSuccessMessage("Appointment booked successfully");
				setErrorMessage("");
				setOpenSnackbar(true);
				setFormData({
					idNumber: "",
					fullName: "",
					phoneNumber: "",
					service: "",
					date: "",
					time: "",
					appointmentType: "",
					age: "",
					gender: "",
					bookFor: "",
				});
				setTimeout(() => {
					navigate("/appointments-history", { state: { appointmentId } });
				}, 2000); // Navigate after 2 seconds
			} else {
				setSuccessMessage("");
				setErrorMessage("Error booking appointment");
			}
			console.log(response);
		} catch (error) {
			console.error("Error booking appointment:", error);
			setSuccessMessage("");
			setErrorMessage("Error booking appointment");
		}
	};

	return (
		<Container style={styles.container} maxWidth="lg">
			<Grid container justifyContent="center">
				<Grid item xs={12} sm={8} md={6}>
					<div style={styles.formContainer}>
						<Typography variant="h4" align="center">
							Book Appointment
						</Typography>
						{successMessage && (
							<Typography
								variant="body1"
								align="center"
								style={styles.successMessage}>
								{successMessage}
							</Typography>
						)}
						{errorMessage && (
							<Typography
								variant="body1"
								align="center"
								style={{ color: "red" }}>
								{errorMessage}
							</Typography>
						)}
						<form onSubmit={handleSubmit}>
							<FormControl fullWidth margin="normal">
								<InputLabel htmlFor="bookFor">Book For</InputLabel>
								<Select
									id="bookFor"
									name="bookFor"
									value={formData.bookFor}
									onChange={handleChange}>
									<MenuItem value="myself">Myself</MenuItem>
									<MenuItem value="others">Others</MenuItem>
								</Select>
							</FormControl>
							{formData.bookFor === "others" && (
								<>
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
								</>
							)}
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
								label="Service"
								variant="outlined"
								fullWidth
								margin="normal"
								name="service"
								value={formData.service}
								onChange={handleChange}
								required
							/>
							<TextField
								label="Date"
								variant="outlined"
								fullWidth
								margin="normal"
								name="date"
								type="date"
								value={formData.date}
								onChange={handleChange}
								required
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<TextField
								label="Time"
								variant="outlined"
								fullWidth
								margin="normal"
								name="time"
								type="time"
								value={formData.time}
								onChange={handleChange}
								required
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<FormControl fullWidth margin="normal">
								<InputLabel htmlFor="appointmentType">
									Appointment Type
								</InputLabel>
								<Select
									id="appointmentType"
									name="appointmentType"
									value={formData.appointmentType}
									onChange={handleChange}
									required>
									<MenuItem value="physical">Physical</MenuItem>
									<MenuItem value="virtual">Virtual</MenuItem>
								</Select>
							</FormControl>
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
							<FormControl fullWidth margin="normal">
								<InputLabel htmlFor="gender">Gender</InputLabel>
								<Select
									id="gender"
									name="gender"
									value={formData.gender}
									onChange={handleChange}
									required>
									<MenuItem value="male">Male</MenuItem>
									<MenuItem value="female">Female</MenuItem>
								</Select>
							</FormControl>
							<Button
								variant="contained"
								color="primary"
								fullWidth
								type="submit"
								style={styles.button}>
								Book Appointment
							</Button>
							<Snackbar
								open={openSnackbar}
								autoHideDuration={2000}
								onClose={() => setOpenSnackbar(false)}
								message="Booking successful"
							/>
						</form>
					</div>
				</Grid>
			</Grid>
		</Container>
	);
};

export default BookAppointment;
