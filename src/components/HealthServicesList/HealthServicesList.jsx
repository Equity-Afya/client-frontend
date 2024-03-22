import React, { useState, useEffect } from 'react';
import { List, Box, Typography, Button, IconButton, Avatar } from '@mui/material';
import { ArrowForward, Notifications } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Notification = ({ message }) => {
  return <div>{message}</div>;
};

const HealthServicesList = () => {
  const navigate = useNavigate();
  const [avatarSrc, setAvatarSrc] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);

  const serviceRequestsData = [
    { name: 'Medical services', requests: 65 },
    { name: 'Specialists', requests: 59 },
    { name: 'Appointments', requests: 81 },
    { name: 'Teleclinics', requests: 56 },
    { name: 'Other services', requests: 40 },
  ];

  const healthServices = [
    { name: 'Medical services', photo: 'src/assets/medical_services_photo.jpg', route: '/medical-services' },
    { name: 'Specialists', photo: 'src/assets/specialists_photo.jpg', route: '/specialists' },
    { name: 'My health Records', photo: 'src/assets/health_records_photo.jpg', route: '/health-records' },
    { name: 'My appointments', photo: 'src/assets/appointments_photo.jpg', route: '/appointments' },
    { name: 'Teleclinics', photo: 'src/assets/teleclinics_photo.jpg', route: '/teleclinics' },
    { name: 'Payments', photo: 'src/assets/payments_photo.jpg', route: '/payments' },
    { name: 'Customer care', photo: 'src/assets/customer_care_photo.jpg', route: '/customer-care' },
    { name: 'Other services', photo: 'src/assets/other_services_photo.jpg', route: '/other-services' },
  ];

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications');
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleClick = (route) => {
    navigate(route);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloaded = () => {
      setAvatarSrc(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = () => {
    const filtered = healthServices.filter(service =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', border: '1px solid #ccc',marginTop:'25px', padding: '10px', borderRadius: '8px' }}>
      <Box style={{ marginBottom: '5px', marginTop: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
        <LineChart
          width={900}
          height={250}
          data={serviceRequestsData}
          margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" label={{ value: 'Month', position: 'insideBottom', dy: 30, color: 'blue' }} />
          <YAxis />
          <Tooltip />
          <Legend align="left" verticalAlign="middle" layout="vertical" />
          <Line type="monotone" dataKey="requests" stroke="#8884d8" />
        </LineChart>
      </Box>

      <Box className="search-box" style={{ position: 'fixed', top: 0, right: 0, maxWidth: '90%',backgroundColor:'#80000080',paddingLeft:'40px', padding: '10px', boxSizing: 'border-box', zIndex: 1, display: 'flex', alignItems: 'center', border: '1px solid #ccc', transition: 'all 0.3s ease' }}>
        <Box style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ height: '40px', borderRadius: '5px', border: '1px solid #ccc', marginRight: '10px',width:'537px' }}
          />
          <Button variant="contained" sx={{ height: '40px',backgroundColor:'#C00100',marginRight:'250px' }} onClick={handleSearch}>Search</Button>
        </Box>
        <IconButton size="small" sx={{ color: '#C00100', marginRight: '20px' }}>
          <Notifications />
        </IconButton>
        <label htmlFor="avatar-input" style={{ marginRight: '20px' }}>
          <Avatar
            alt="User Avatar"
            src={avatarSrc}
            sx={{ cursor: 'pointer' }}
            onClick={() => console.log("Avatar clicked")}
          />
          <input
            id="avatar-input"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleAvatarChange}
          />
        </label>
      </Box>

      <Box style={{ height: '60px' }}></Box>

      <List sx={{ display: 'flex', flexWrap: 'wrap', gap: '40px', padding: 0, marginTop: '0px', border: '1px solid #ccc', borderRadius: '8px' }}>
        {(filteredServices.length > 0 ? filteredServices : healthServices).map((service, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              width: '280px',
              height: '200px',
              borderRadius: '0px',
              overflow: 'hidden',
              textAlign: 'center',
              marginTop: '10px',
              border: '1px solid #ccc',
            }}
          >
            <img src={service.photo} alt={service.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', color: 'white', backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.4))', padding: '8px', borderRadius: '8px 8px 0 0' }}>
              <Typography variant="h6" sx={{ color: 'white' }}>{service.name}</Typography>
            </Box>
            <Button
              onClick={() => handleClick(service.route)}
              sx={{
                width: '40px',
                height: '40px',
                position: 'absolute',
                bottom: '4px',
                right: '4px',
                backgroundColor: 'white',
                color: 'black',
                fontWeight: 'bold',
                transform: 'rotate(-45deg)',
                borderRadius: '50%',
                padding: 0,
                minWidth: 0,
              }}
            >
              <ArrowForward sx={{ fontSize: 20 }} />
            </Button>
          </Box>
        ))}
      </List>

  <Box style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
    <ul>
      {notifications.map((notification, index) => (
        <Notification key={index} message={notification.message} />
      ))}
    </ul>
  </Box>
</Box>

  );
};

export default HealthServicesList;