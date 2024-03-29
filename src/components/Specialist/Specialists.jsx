import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, TextField, CssBaseline } from '@mui/material';
import { Link } from 'react-router-dom';

const servicesData = [
  { id: 1, name: 'Consultation', image:'src/assets/consultation.jpg', route: '/book-appointment' },
  { id: 2, name: 'Dental', image: 'src/assets/dental.jpg', route: '/dental' },
  { id: 3, name: 'Surgical', image: 'src/assets/surgical.jpg', route: '/surgical' },
  { id: 4, name: 'Family Planning', image: 'src/assets/family_planning.jpg', route: '/family-planning' },
  { id: 5, name: 'ENT', image: 'src/assets/ent.jpg', route: '/ent' },
  { id: 6, name: 'Orthopedics', image: 'src/assets/orthopedic.jpg', route: '/orthopedics' },
  { id: 7, name: 'MCH', image: 'src/assets/mch.jpg', route: '/mch' },
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
                  <Link to={service.route}>
                    <img src={service.image} alt={service.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  </Link>
                  <Typography variant="h6">{service.name}</Typography>
                  {/* Removed the details */}
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
