import React from 'react';
import { Container, Typography, Card, CardContent, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

// Define styles
const useStyles = makeStyles({
  header: {
    textAlign: 'center',
    color: '#c00100',
    marginBottom: '20px',
  },
  subheading: {
    textDecoration: 'underline',
    fontWeight: 'bold',
    color: 'brown',
    cursor: 'pointer',
  },
  pharmacyCard: {
    marginTop: '50px',
    height: '50%',
  },
  messageCard: {
    marginTop: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
  },
  message: {
    color: '#c00100',
    fontWeight: 700,
  },
});

const EpharmacyServices = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const navigateToMedicines = () => {
    navigate('/products');
  };

  const navigateToPrescriptions = () => {
    navigate('/prescriptions');
  };

  return (
    <Container>
      <Typography variant="h2" className={classes.header}>
        Welcome to our online pharmacy!
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Typography
          variant="h5"
          className={classes.subheading}
          onClick={navigateToMedicines}
        >
          Medicines
        </Typography>
        <Typography
          variant="h5"
          className={classes.subheading}
          onClick={navigateToPrescriptions}
        >
          Prescriptions
        </Typography>
      </Box>
      <Card className={classes.pharmacyCard} sx={{ height: '80%' }}>
        <CardContent>
          {/* Placeholder for the pharmacy image */}
          <img
            src="https://th.bing.com/th/id/OIP.WlJbV7gUKCc9uScL9ICyaQHaE8?rs=1&pid=ImgDetMain"
            alt="Pharmacy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </CardContent>
      </Card>
      <Card className={classes.messageCard} sx={{ height: '40%' }}>
        <CardContent>
          <Typography variant="body1" className={classes.message}>
            Our pharmacy is equipped with quality, affordable medication provided by professional, highly qualified and certified Pharmacists. Guidance is always provided on accurate usage including age-based dosage.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EpharmacyServices;