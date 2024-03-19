import React from 'react';
import { Paper, Card, CardContent, Typography, Button, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <Card style={{ marginBottom: '20px' }}>
      <CardContent>
        <img src={service.image} alt={service.name} style={{ width: '100%', height: 'auto' }} />
        <Typography variant="h5" component="div" style={{ marginTop: '10px' }}>
          {service.name}
        </Typography>
        <Button variant="contained" onClick={() => handleClick(service.route)} style={{ marginTop: '10px', backgroundColor: '#c00100' }}>
          Click Here!
        </Button>
      </CardContent>
    </Card>
  );
};

const DataAnalytics = ({ medicalServices }) => {
  // Transform medicalServices data to display requests
  const data = medicalServices.map(service => ({
    name: service.name,
    value: Math.floor(Math.random() * 100), // Random requests for demonstration
  }));

  return (
    <div style={{ marginTop: '50px' }}>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>Data Analytics</Typography>
      <LineChart width={1100} height={300} data={data} margin={{ top: 5, right: 30, left: 90, bottom: 5 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

const ServiceContainer = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredServices, setFilteredServices] = React.useState([]);

  const medicalServices = [
    { name: 'General consultation', image: 'src/assets/general_consultation.jpg', route: '/book-appointments' },
    { name: 'Modern lab', image: 'src/assets/modern_lab.jpg', route: '/modern-lab' },
    { name: 'Pharmacy', image: 'src/assets/pharmacy_image.jpg', route: '/pharmacy' },
    { name: 'Specialist services', image: 'src/assets/specialist_services.jpg', route: '/specialist-services' }
  ];

  const handleSearch = () => {
    const filtered = medicalServices.filter(service =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '20px', width: '70%', margin: '0 auto', display: 'flex', alignItems: 'center' }}>
        <TextField
          label="Search Services"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1,}}
        />
        <Button variant="contained" onClick={handleSearch} style={{ marginLeft: '10px',height: '53px'}}>Search</Button>
      </div>
      <DataAnalytics medicalServices={medicalServices} />
      <Paper elevation={3} style={{ padding: '20px', margin: '20px auto', maxWidth: '1200px', width: '90%' }}>
        <Grid container spacing={3}>
          {(filteredServices.length > 0 ? filteredServices : medicalServices).map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ServiceCard service={service} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
};

export default ServiceContainer;

