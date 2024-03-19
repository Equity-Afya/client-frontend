import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, TextField, CssBaseline } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const servicesData = [
  { id: 1, name: 'Consultation', details: 'Details about Consultation service.', image:'src/assets/consultation.jpg' },
  { id: 2, name: 'Dental', details: 'Details about Dental service.', image: 'src/assets/dental.jpg' },
  { id: 3, name: 'Surgical', details: 'Details about Surgical service.', image: 'src/assets/surgical.jpg' },
  { id: 4, name: 'Family Planning', details: 'Details about Family Planning service.', image: 'src/assets/family_planning.jpg' },
  { id: 5, name: 'ENT', details: 'Details about ENT service.', image: 'src/assets/ent.jpg' },
  { id: 6, name: 'Orthopedics', details: 'Details about Orthopedics service.', image: 'src/assets/orthopedic.jpg' },
  { id: 7, name: 'MCH', details: 'Details about MCH service.', image: 'src/assets/mch.jpg' },
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
    <>
    <CssBaseline />
    <div style={{ textAlign: 'center' }}>
      <div style={{ position: 'sticky', top: '0', backgroundColor: '#ffffff', zIndex: '999', padding: '10px', marginBottom: '10px' }}>
        <TextField
          label="Search Services"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '70%', marginRight: '10px'}}
        />
        <Button variant="contained" sx={{backgroundColor:'#c00100'}} onClick={handleSearch} style={{ height: '55px' }}>
          Search
        </Button>
      </div>
      <Grid container spacing={2}>
        {(filteredServices.length > 0 ? filteredServices : servicesData).map((service) => (
          <Grid item key={service.id} xs={12} sm={6} md={4} lg={4}>
            <Card style={{ backgroundColor: '#f0f0f0', border: '1px solid #ddd' }}>
              <CardContent> 
                <img src={service.image} alt={service.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <Typography variant="h6">{service.name}</Typography>
                <Typography variant="body2" paragraph>{service.details}</Typography>
                <Button
                  onClick={() => handleServiceClick(service.id)}
                  style={{ color: '#c00100', float: 'right' }}
                  endIcon={<ArrowForwardIcon />}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
    </>
  );
};

export default SpecialistServices;
