import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Button, createTheme, ThemeProvider, Box, Grid } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#c00100', // maroon color
    },
  },
});

const MyHealthRecords = () => {
  const navigate = useNavigate();

  const goToPage = (path) => {
    navigate(path);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={false} disableGutters={true} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: 0, margin: 0 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'flex-start', 
            flexGrow: 1,
            textAlign: 'center',
            paddingTop: '80px', // Adjust this value to move it up or down
            paddingBottom: '20px' // Added padding bottom to ensure space for content
          }}
        >
          <Typography variant="h1" gutterBottom>
            My Health Records
          </Typography>
          <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', maxWidth: '100vh' }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => goToPage('/blood-pressure')}
                  fullWidth
                  style={{ height: '100px', fontSize: '18px' }} // Adjust button height and font size for a better appearance
                >
                  Blood Pressure Records
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => goToPage('/bmi')}
                  fullWidth
                  style={{ height: '100px', fontSize: '18px' }}
                >
                  BMI Records
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => goToPage('/lab-results')}
                  fullWidth
                  style={{ height: '100px', fontSize: '18px' }}
                >
                  Lab Results
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default MyHealthRecords;
