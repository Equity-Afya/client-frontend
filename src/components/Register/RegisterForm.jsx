import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to check if all fields are filled
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

    // Custom password regex allowing user to choose special characters
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

      const response = await axios.post( "https://062d-102-210-244-74.ngrok-free.app/api/patient/register",
         userData
      );

      if (response.status === 200) {
        console.log("Registration successful:", response.data);
        // Navigate to the OTP verification page
        navigate("/verify-otp", { state: { email } });
        // Reset form data on successful registration
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
          maxHeight: "100vh",
        }}
      >
        <Box sx={{ width: "400px", maxWidth: "100%" }}>
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
                  type: "password",
                },
                {
                  label: "Confirm Password",
                  name: "confirmPassword",
                  value: confirmPassword,
                  type: "password",
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
                  autoComplete="off" // Turn off autocomplete
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
                disabled={loading || !areFieldsFilled()} // Disable button if fields are not filled
              >
                {loading ? "Loading..." : "Register"}
              </Button>
              {serverError && <p style={{ color: "red" }}>{serverError}</p>}
            </Box>
          </form>
          <Box mt={2}>
            <Link to="/login">Already registered? Proceed to Login</Link>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default RegisterForm;
