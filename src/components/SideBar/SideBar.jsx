import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton } from '@mui/material';
import { Dashboard, EventNote, PeopleAlt, History, Payment, Headset, AccountCircle, Brightness4, Logout } from '@mui/icons-material';

function Sidebar() {
  return (
    <Box sx={{ width: 240, height: '100%', backgroundColor: '#C00100', color: 'white', paddingTop: 0 }}>
      {/* Dashboard */}
    
      <List>
        {/* Main Menu Items */}
        <ListItem button >
          <ListItemIcon sx={{ color: 'white', marginRight: -3 }}><Dashboard /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ color: 'white', marginRight: -3 }}><EventNote /></ListItemIcon>
          <ListItemText primary="My Appointments" />
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ color: 'white', marginRight: -3 }}><PeopleAlt /></ListItemIcon>
          <ListItemText primary="Specialists" />
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ color: 'white', marginRight: -3 }}><History /></ListItemIcon>
          <ListItemText primary="My History" />
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ color: 'white', marginRight: -3 }}><Payment /></ListItemIcon>
          <ListItemText primary="Payments" />
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ color: 'white', marginRight: -3 }}><Headset /></ListItemIcon>
          <ListItemText primary="Customer Care" />
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ color: 'white', marginRight: -3 }}><AccountCircle /></ListItemIcon>
          <ListItemText primary="My Account" />
        </ListItem>
        {/* Additional Items */}
        <ListItem button sx={{ paddingTop: 22 }}>
          <ListItemIcon sx={{ color: 'white', marginRight: -3 }}><Brightness4 /></ListItemIcon>
          <ListItemText primary="Light Mode" />
        </ListItem>
        <ListItem button  >
          <ListItemIcon sx={{ color: 'white', marginRight: -3 }}><Logout /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );
}

export default Sidebar;
