import React, { useState, useEffect } from "react";
import {
	Button,
	TextField,
	Typography,
	Container,
	Grid,
	MenuItem,
	Snackbar,
	Select,
	FormControl,
	InputLabel,
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
		backgroundColor: "#c00100",
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
};

const BookAppointment = () => {
	const [formData, setFormData] = useState({
		idNumber: "",
		fullName: "",
		phoneNumber: "",
		countryCode: "+254",
		service: "",
		time: "",
		appointmentType: "",
		age: "",
		gender: "",
		bookFor: "myself",
		areaOfResidence: "",
	});
	const [services, setServices] = useState([]);
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const navigate = useNavigate();

	const getUserData = async () => {
		try {
			const response = await axios.get("http://192.168.89.29:5500/api/userdata");
			if (response.status === 200) {
				return response.data;
			}
		} catch (error) {
			console.error("Error fetching user data:", error);
			return null;
		}
	};

	const getServices = async () => {
		try {
			const response = await axios.get("http://192.168.89.29:5500/api/services");
			if (response.status === 200) {
				setServices(response.data);
			}
		} catch (error) {
			console.error("Error fetching services:", error);
		}
	};

	useEffect(() => {
		if (formData.bookFor === "myself") {
			getUserData().then((userData) => {
				if (userData) {
					setFormData((prevFormData) => ({
						...prevFormData,
						...userData,
					}));
				}
			});
		}
	}, [formData.bookFor]);

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
				const { appointmentId } = response.data;
				setSuccessMessage("Appointment booked successfully");
				setErrorMessage("");
				setOpenSnackbar(true);
				setFormData({
					idNumber: "",
					fullName: "",
					phoneNumber: "",
					countryCode: "+254",
					service: "",
					time: "",
					appointmentType: "",
					age: "",
					gender: "",
					bookFor: "myself",
					areaOfResidence: "",
				});
				setTimeout(() => {
					navigate("/appointments-history", { state: { appointmentId } });
				}, 2000);
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
							<Typography
								variant="body1"
								align="center"
								style={{ color: "red" }}
							>
								{errorMessage}
							</Typography>
						)}
						<form onSubmit={handleSubmit}>
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
								<MenuItem value="others">Others</MenuItem>
							</TextField>
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
									<Grid container spacing={2}>
										<Grid item xs={4}>
											<FormControl fullWidth variant="outlined">
												<InputLabel>Country Code</InputLabel>
												<Select
													name="countryCode"
													value={formData.countryCode}
													onChange={handleChange}
													label="Country Code"
													required
												>
													<MenuItem value="+254">Kenya (+254)</MenuItem>
													<MenuItem value="+255">Tanzania (+255)</MenuItem>
													<MenuItem value="+256">Uganda (+256)</MenuItem>
													<MenuItem value="+250">Rwanda (+250)</MenuItem>
													<MenuItem value="+257">Burundi (+257)</MenuItem>
													<MenuItem value="+243">Congo (+243)</MenuItem>
													<MenuItem value="+211">South Sudan (+211)</MenuItem>
												</Select>
											</FormControl>
										</Grid>
										<Grid item xs={8}>
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
										</Grid>
									</Grid>
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
							<FormControl fullWidth variant="outlined" margin="normal">
								<InputLabel>Service</InputLabel>
								<Select
									name="service"
									value={formData.service}
									onChange={handleChange}
									onOpen={getServices}
									label="Service"
									required
								>
									{services.map((service) => (
										<MenuItem key={service.id} value={service.name}>
											{service.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
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
								label="Area of Residence"
								variant="outlined"
								fullWidth
								margin="normal"
								name="areaOfResidence"
								value={formData.areaOfResidence}
								onChange={handleChange}
								required
							/>
							<Button
								variant="contained"
								color="primary"
								fullWidth
								type="submit"
								style={styles.button}
							>
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
