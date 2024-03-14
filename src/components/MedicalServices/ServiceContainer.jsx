import React from 'react';
import { Paper, Card, CardContent, Typography, Button } from '@mui/material';

const ServiceCard = ({ title, onClick }) => {
  return (
    <Card style={{ marginBottom: '20px' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Button variant="contained" onClick={onClick} style={{ marginTop: '10px', backgroundColor: '#c00100' }}>
          Click Here!
        </Button>
      </CardContent>
    </Card>
  );
};

const ServiceContainer = () => {
  const handleClick = (serviceName) => {
    alert(`You clicked on ${serviceName}`);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <ServiceCard title="General Consultation" onClick={() => handleClick('General Consultation')} />
      <ServiceCard title="Modern Lab" onClick={() => handleClick('Modern Lab')} />
      <ServiceCard title="Pharmacy" onClick={() => handleClick('Pharmacy')} />
      <ServiceCard title="Specialist Services" onClick={() => handleClick('Specialist Services')} />
    </Paper>
  );
};

export default ServiceContainer;
