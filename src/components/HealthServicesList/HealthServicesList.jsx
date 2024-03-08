import React from 'react';
import { List, ListItem, ListItemText, Box } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

const HealthServicesList = () => {
  // Define your health services here
  const healthServices = [
    'Medical services',
    'Specialists',
    'My health Records',
    'My appoitments',
    'Teleclinics',
    'Other services',
    'Payments',
    'Customer care',
    
    // Add more services as needed
  ];

  return (
    <List sx={{ display: 'flex', flexWrap: 'wrap', gap: '40px', padding: 0 }}>
      {healthServices.map((service, index) => (
        <Box key={index} sx={{ position: 'relative', width: '280px', height: '200px', backgroundColor: '#ccc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ListItemText primary={service} sx={{ textAlign: 'center' }} /> {/* Center the text */}
          {/* Arrow pointer */}
          <Box
            sx={{
              position: 'absolute',
              bottom: '4px',
              right: '4px',
              color: '#c00100',
              transform: 'rotate(-45deg)', // Rotate the arrow to point towards left
            }}
          >
            <ArrowForward />
          </Box>
        </Box>
      ))}
    </List>
  );
};

export default HealthServicesList;
