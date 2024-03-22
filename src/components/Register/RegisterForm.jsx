import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const FormTitle = styled("div")({
  backgroundColor: "#c00100",
  color: "white",
  width: 400,
  textAlign: "center",
  fontFamily: "Nunito, sans-serif",
  fontSize: 15,
  fontWeight: 50,
  padding: "0.5px",
  borderRadius: "0.5rem",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "0",
  marginBottom: "5px",
});

function RegisterForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const showLoginLink = location.pathname !== "/login";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const areFieldsFilled = () => {
    return (
      name && email && phoneNumber && idNumber && password && confirmPassword
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormErrors({ ...formErrors, [name]: "" });
    setServerError("");
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "idNumber":
        setIdNumber(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    const regex = /^(?=.\d)(?=.[a-zA-Z])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{5,15}$/;
    if (!regex.test(newPassword)) {
      setFormErrors({
        ...formErrors,
        password:
          "Password should be between 5 and 15 characters and contain at least one letter, one number, and one special character",
      });
    } else {
      setFormErrors({ ...formErrors, password: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (password !== confirmPassword) {
        setFormErrors({
          ...formErrors,
          confirmPassword: "Passwords do not match",
        });
        return;
      }

      const userData = { name, email, phoneNumber, idNumber, password };

      const response = await axios.post(
        "https://b50f-102-210-244-74.ngrok-free.app/api/patient/register",
        userData
      );

      if (response.status === 200) {
        console.log("Registration successful:", response.data);
        //Show success message
        toast.success("Registration successful!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Navigate to the OTP verification page
        setTimeout(() => {
          navigate("/verify-otp", { state: { email } });
        }, 3000); //Delay navigation to verification
        // Reset form data on successful registration
        navigate("/verify-otp", { state: { email } });
        setName("");
        setEmail("");
        setPhoneNumber("");
        setIdNumber("");
        setPassword("");
        setConfirmPassword("");
        setFormErrors({});
      } else {
        console.error("Registration failed. Status:", response.status);
      }
    } catch (error) {
      if (!error.response) {
        setServerError("No server response");
      } else if (error.response.status === 400) {
        setFormErrors({
          ...formErrors,
          email: "User already exists, Log in instead",
        });
      } else {
        setServerError("Internal Server Error");
        console.error("Error submitting form data:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#c00100",
      },
      action: {
        active: "#d9d9d9",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: { xs: "10px", md: "20px" },
        }}
      >
        <ToastContainer />

        <Box sx={{ width: "100%", maxWidth: { xs: "100%", md: "400px" } }}>
          <FormTitle>
            <h1>TeleAfia</h1>
            <h3 style={{ textAlign: "center", position: "relative" }}>
              <span
                style={{
                  borderBottom: "1px solid white",
                  display: "inline-block",
                  width: "calc(200px)",
                  padding: "0 10px",
                }}
              >
                Register
              </span>
            </h3>
          </FormTitle>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                { label: "Name", name: "name", value: name },
                { label: "Email", name: "email", value: email },
                {
                  label: "Phone Number",
                  name: "phoneNumber",
                  value: phoneNumber,
                },
                { label: "ID Number", name: "idNumber", value: idNumber },
                {
                  label: "Password",
                  name: "password",
                  value: password,
                  type: showPassword ? "text" : "password", // Toggle between text and password type
                  InputProps: {
                    // Show/Hide password visibility toggle
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          style={{ background: "grey" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                },
                {
                  label: "Confirm Password",
                  name: "confirmPassword",
                  value: confirmPassword,
                  type: showPassword ? "text" : "password", // Toggle between text and password type
                  InputProps: {
                    // Show/Hide password visibility toggle
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          style={{ background: "grey" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                },
              ].map((field) => (
                <TextField
                  key={field.name}
                  label={field.label}
                  variant="outlined"
                  type={field.type || "text"}
                  name={field.name}
                  value={field.value}
                  onChange={
                    field.name === "password"
                      ? handlePasswordChange
                      : handleChange
                  }
                  error={Boolean(formErrors[field.name])}
                  helperText={formErrors[field.name]}
                  style={{ width: "100%" }}
                  autoComplete="off" // Turn off autocomplete // Pass input properties including the visibility toggle
                  InputProps={{
                    sx: {
                      "&:focus": {
                        backgroundColor: theme.palette.action.active,
                      },
                    },
                  }}
                />
              ))}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
                disabled={loading || !areFieldsFilled()}
              >
                {loading ? "Loading..." : "Register"}
              </Button>
              {serverError && <p style={{ color: "red" }}>{serverError}</p>}
            </Box>
          </form>
          {showLoginLink && (
            <Box mt={2}>
              <Link to="/login">Already registered? Proceed to Login</Link>
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default RegisterForm;
