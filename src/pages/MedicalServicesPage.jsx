import React from 'react';
import Sidebar from "../components/SideBar/SideBar";
import SearchBar from "../components/SearchBar/SearchBar";
import { Box } from '@mui/material';
import ServiceContainer from '../components/MedicalServices/ServiceContainer';

const MedicalServicesPage = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar on the left with margin-right */}
      <Sidebar sx={{ marginRight: '32px' }} /> {/* Increase margin-right to create a larger gap */}

      {/* Search bar and Medical services content */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1 }}>
        {/* Search bar */}
        {/*<SearchBar />*/}

        {/* Medical services content with margin-left */}
        <Box sx={{ marginLeft: '200px', justifyContent: 'center', alignItems:'center' }}> {/* Increase marginLeft to create a larger gap */}
          {/* Medical Services /> */}
          <ServiceContainer />
        </Box>
      </Box>
    </Box>
  );
};

export default MedicalServicesPage;
