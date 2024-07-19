import React from 'react';
import { Typography, Button, createTheme, ThemeProvider, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RecordForm from '../../components/MyHealthRecords/recordForm';

const theme = createTheme({
    palette: {
      primary: {
        main: '#c00100', // maroon color
      },
    },
  });

const BMIRecord = () => {
    const navigate = useNavigate();
    
    const handlePreviousClick = () => {
        navigate('/blood-pressure');
      };

  const handleNextClick = () => {
    navigate('/lab-results');
  };

    return (
      <ThemeProvider theme={theme}>
    <div>
      <Typography variant="h4" gutterBottom  sx={{color:'#800000'}}>
        BMI Records
      </Typography>
          <RecordForm formFields={['Date', 'Weight', 'Height', 'HeightUnit']} calculateBMI />
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
    <Button
            variant="contained"
            color="primary"
            onClick={handlePreviousClick}
          >
            Previous
              </Button>
              
      <Button variant="contained" color="primary" onClick={handleNextClick}>
        Next
      </Button>
   </Box>
    </div>
        </ThemeProvider>
  );
};

export default BMIRecord;
