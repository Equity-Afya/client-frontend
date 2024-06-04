import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const theme = createTheme({
  palette: {
    primary: {
      main: '#c00100',
    },
  },
});

const CreateChp = () => {
  const [formValues, setFormValues] = useState({
    fullName: '',
    idNumber: '',
    email: '',
    countryCode: '254',
    phoneNumber: '',
    location: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    idNumber: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    if (name === 'email') {
      validateEmail(value);
    } else if (name === 'fullName') {
      validateFullName(value);
    } else if (name === 'phoneNumber') {
      validatePhoneNumber(value);
    } else if (name === 'idNumber') {
      validateIdNumber(value);
    } else if (name === 'password') {
      validatePassword(value);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9]+@gmail\.com$/;
    if (!emailRegex.test(email) || email.length > 32) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Input a valid email',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: '',
      }));
    }
  };

  const validateFullName = (fullName) => {
    const fullNameRegex = /^[A-Za-z]+ [A-Za-z]+$/;
    if (!fullNameRegex.test(fullName)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fullName: 'Enter full names',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fullName: '',
      }));
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[17][0-9]{8}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: 'Phone number must start with 1 or 7 and be 9 digits long',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: '',
      }));
    }
  };

  const validateIdNumber = (idNumber) => {
    const idNumberRegex = /^[0-9]{5,10}$/;
    if (!idNumberRegex.test(idNumber)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        idNumber: 'ID Number must contain only digits and be between 5 and 10 characters long',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        idNumber: '',
      }));
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password must be at least 8 characters long, and include at least one letter, one number, and one special character',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: '',
      }));
    }
  };

  const isFormValid = () => {
    return (
      Object.values(formValues).every((value) => value.trim() !== '') &&
      Object.values(errors).every((error) => error === '')
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert('Please fill out the form correctly');
      return;
    }

    try {
      const response = await fetch('https://your-backend-endpoint.com/api/create-chp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        const data = await response.json();
        alert('User created successfully');
        // Clear the form
        setFormValues({
          fullName: '',
          idNumber: '',
          email: '',
          countryCode: '254',
          phoneNumber: '',
          location: '',
          password: '',
        });
      } else {
        alert('Failed to create user');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the user');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <header style={{paddingLeft: '7vw', backgroundColor: '#930100', color: '#fff', height: '6vh', marginBottom: '2vh', borderRadius: '10px'}}>
          <h2 style={{textDecoration: 'underline'}}>CHP REGISTRATION</h2>
        </header>
        
        <form style={{width: '30vw'}} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Full Names"
                name="fullName"
                value={formValues.fullName}
                onChange={handleChange}
                variant="outlined"
                color="primary"
                error={!!errors.fullName}
                helperText={errors.fullName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="ID Number"
                name="idNumber"
                value={formValues.idNumber}
                onChange={handleChange}
                variant="outlined"
                color="primary"
                error={!!errors.idNumber}
                helperText={errors.idNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                variant="outlined"
                color="primary"
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth required>
                <InputLabel>Country Code</InputLabel>
                <Select
                  name="countryCode"
                  value={formValues.countryCode}
                  onChange={handleChange}
                  variant="outlined"
                  label="Country Code"
                >
                  <MenuItem value="256">Uganda</MenuItem>
                  <MenuItem value="254">Kenya</MenuItem>
                  <MenuItem value="243">DRC</MenuItem>
                  <MenuItem value="250">Rwanda</MenuItem>
                  <MenuItem value="257">Burundi</MenuItem>
                  <MenuItem value="211">South Sudan</MenuItem>
                  <MenuItem value="255">Tanzania</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                required
                label="Phone Number"
                name="phoneNumber"
                value={formValues.phoneNumber}
                onChange={handleChange}
                variant="outlined"
                color="primary"
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Location"
                name="location"
                value={formValues.location}
                onChange={handleChange}
                variant="outlined"
                color="primary"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                type={showPassword ? 'text' : 'password'}
                label="Password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                variant="outlined"
                color="primary"
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disabled={!isFormValid()}
              >
                Create User
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default CreateChp;
