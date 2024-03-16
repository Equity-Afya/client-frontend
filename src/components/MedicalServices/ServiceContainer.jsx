import React from 'react';
import { Paper, Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ title }) => {
  const navigate = useNavigate();

  const handleClick = (serviceName) => {
    switch (serviceName) {
      case 'General Consultation':
        navigate('/book-appointment');
        break;
      case 'Modern Lab':
        navigate('/modern-lab');
        break;
      case 'Pharmacy':
        navigate('/pharmacy');
        break;
      case 'Specialist Services':
        navigate('/specialist-services');
        break;
      default:
        break;
    }
  };

  return (
    <Card style={{ marginBottom: '20px' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Button variant="contained" onClick={() => handleClick(title)} style={{ marginTop: '10px', backgroundColor: '#c00100' }}>
          Click Here!
        </Button>
      </CardContent>
    </Card>
  );
};

const ServiceContainer = () => {
  return (
    <Paper elevation={3} style={{ padding: '100px', marginTop: '200px', marginLeft: '100px'}}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6} md={3}>
          <ServiceCard title="General Consultation" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ServiceCard title="Modern Lab" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ServiceCard title="Pharmacy" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ServiceCard title="Specialist Services" />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ServiceContainer;
