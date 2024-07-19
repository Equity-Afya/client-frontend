import React, { useState } from 'react';
import { Typography, Button, Grid, TextField, createTheme, ThemeProvider, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BloodPressureChart  from '../../components/MyHealthRecords/dataAnalyticsGraphs';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#c00100', // maroon color
    },
  },
});

const BloodPressureRecord = () => {
  const navigate = useNavigate();
  const [Date, setDate] = useState('');
  const [Systolic, setSystolic] = useState('');
  const [Diastolic, setDiastolic] = useState('');

  const handleNextClick = () => {
    navigate('/bmi');
  };

  const handlePreviousClick = () => {
    navigate('/health-records');
  };

  const handleSubmit = () => {
    // Prepare data object to send to the backend
    const formData = {
      Date,
      Systolic,
      Diastolic,
    };

    // Example POST request using Axios
    axios.post('https://192.168.89.172:5500/api/createrecord', formData)
      .then(response => {
        console.log('Data submitted successfully:', response.data);
        // Optionally navigate to the next page or handle success
        handleNextClick();
      })
      .catch(error => {
        console.error('Failed to submit data:', error);
        // Handle error if needed
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Typography variant="h4" gutterBottom sx={{color:'#800000'}}>
          Blood Pressure Records
        </Typography>
        <Grid container spacing={2} style={{ marginBottom: '10px' }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={Date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: '100%'}} // Adjust width of TextField
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Systolic"
              value={Systolic}
              onChange={(e) => setSystolic(e.target.value)}
              sx={{ width: '100%' }} // Adjust width of TextField
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Diastolic"
              value={Diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              sx={{ width: '100%'}} // Adjust width of TextField
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <BloodPressureChart  />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePreviousClick}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextClick}
          >
            Next
          </Button>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default BloodPressureRecord;