import React from 'react';
import Sidebar from "../components/SideBar/SideBar";
{/*import SearchBar from "../components/SearchBar/SearchBar";*/}
import HealthServicesList from "../components/HealthServicesList/HealthServicesList";
import { Box } from '@mui/material';

const DashboardPage = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar on the left with margin-right */}
      <Sidebar sx={{ marginRight: '32px' }} /> {/* Increase margin-right to create a larger gap */}

      {/* Search bar and Health services list */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1 }}>
        {/* Search bar */}
      { /*<SearchBar  />*/}

        {/* Health services list with margin-left */}
        <Box sx={{ marginTop: '2px', overflowY: 'auto', height: 'calc(100vh - 48px)', position: 'relative', marginLeft: '32px' }}> {/* Increase marginLeft to create a larger gap */}
          <HealthServicesList sx={{ paddingRight: '20px' }} />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '16px',
              background: 'linear-gradient(to right, transparent, #f0f0f0)', // Adjust the gradient color as needed
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
