import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Grid } from '@mui/material';

const servicesData = [
  { id: 1, name: 'Consultation', details: 'Details about Consultation service.' },
  { id: 2, name: 'Dental', details: 'Details about Dental service.' },
  { id: 3, name: 'Surgical', details: 'Details about Surgical service.' },
  { id: 4, name: 'Family Planning', details: 'Details about Family Planning service.' },
  { id: 5, name: 'ENT', details: 'Details about ENT service.' },
  { id: 6, name: 'Orthopedics', details: 'Details about Orthopedics service.' },
  { id: 7, name: 'MCH', details: 'Details about MCH service.' },
];

const SpecialistServices = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);

  const handleSearch = () => {
    const filtered = servicesData.filter(
      (service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  const handleServiceClick = (serviceId) => {
    // Handle navigation to individual service details page
    console.log(`Navigate to details of service with id ${serviceId}`);
  };

  return (
    <Box m={2} >
      <Grid container spacing={4} mt={2} padding={5} >
        {filteredServices.length > 0
          ? filteredServices.map((service) => (
              <Grid item key={service.id} xs={12} sm={6} md={4} lg={3} >
                <Card style={{ backgroundColor: '#f0f0f0', border: '1px solid #ddd' }}>
                  <CardContent> 
                    <Typography variant="h6">{service.name}</Typography>
                    <Button
                      variant="outlined"
                      onClick={() => handleServiceClick(service.id)}
                      style={{ backgroundcolor: '#c00100'}}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
            : servicesData.map((service) => (
              <Grid item key={service.id} xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{service.name}</Typography>
                    <Button
                      variant="outlined"
                      onClick={() => handleServiceClick(service.id)}
                      style={{ backgroundcolor: '#c00100'}}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default SpecialistServices;

