import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import makeStyles from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    width: 350,
    textAlign: "center",
    fontFamily: "Nunito, sans-serif",
    fontSize: 20,
    fontWeight: 100,
    padding: "1px",
    borderRadius: "0.5rem",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "2px",
  },
}));

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    idNumber: "",
    password: "",
    confirmPassword: "", // Added confirmPassword field
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    idNumber: "",
    password: "",
    confirmPassword: "", // Added confirmPassword field
  });

  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Password complexity validation
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&-]{8,}$/;
    const errors = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        errors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
      }
    });

    if (!passwordRegex.test(formData.password)) {
      errors.password =
        "Password must contain at least one letter, one number, and one special character";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://cfc0-102-210-244-74.ngrok-free.app/api/patient/register",
        formData
      );

      if (response.status === 200) {
        console.log("Registration successful:", response.data);
      } else {
        console.error("Registration failed. Status:", response.status);
      }
    } catch (error) {
      if (!error.response) {
        setFormErrors({ ...formErrors, server: "No server response" });
      } else if (error.response.status === 404) {
        setFormErrors({ ...formErrors, name: "Name taken" });
      } else {
        console.error("Error submitting form data:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#c00100",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <section>
        <Box sx={{ width: "350px" }}>
          <div className={classes.title}>
            <h1>Register</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Name"
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={Boolean(formErrors.name)}
                helperText={formErrors.name}
                style={{ width: "350px" }}
              />

              <TextField
                label="Email"
                variant="outlined"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(formErrors.email)}
                helperText={formErrors.email}
                style={{ width: "350px" }}
              />

              <TextField
                label="Phone Number"
                variant="outlined"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={Boolean(formErrors.phoneNumber)}
                helperText={formErrors.phoneNumber}
                style={{ width: "350px" }}
              />

              <TextField
                label="ID Number"
                variant="outlined"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                error={Boolean(formErrors.idNumber)}
                helperText={formErrors.idNumber}
                style={{ width: "350px" }}
              />

              <TextField
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={Boolean(formErrors.password)}
                helperText={formErrors.password}
                style={{ width: "350px" }}
              />

              <TextField
                label="Confirm Password"
                variant="outlined"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={Boolean(formErrors.confirmPassword)}
                helperText={formErrors.confirmPassword}
                style={{ width: "350px" }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
                disabled={loading} // Disable button while loading
              >
                {loading ? "Loading..." : "Register"}
              </Button>
              {formErrors.server && <p>{formErrors.server}</p>}
            </Box>
          </form>
        </Box>
      </section>
    </ThemeProvider>
  );
}

export default RegisterForm;
