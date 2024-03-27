import React from 'react';
import Sidebar from "../components/SideBar/SideBar";
{/*import SearchBar from "../components/SearchBar/SearchBar";*/}
import HealthServicesList from "../components/HealthServicesList/HealthServicesList";
import { Box } from '@mui/material';

const DashboardPage = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar on the left with margin-right */}
<<<<<<< HEAD
      <Sidebar sx={{display: 'flex', flexDirection: 'column', flex: '0 0 auto', marginRight: '32px'}} /> {/* Increase margin-right to create a larger gap */}
=======
      <Sidebar sx={{display: 'flex', flexDirection: 'column', flex: '0 auto', marginRight: '32px'}} /> {/* Increase margin-right to create a larger gap */}
>>>>>>> 652ab1840df9e00c6a42ebed3b8cdb9fa9287a19

      
        {/* Health services list with margin-left */}
        <Box sx={{display: 'flex', flexDirection: 'column', flex: '1', overflowY: 'auto', marginTop: '10px', marginLeft: '32px'}}>
          <HealthServicesList/>
        </Box>
      </Box>
  
  );
};

export default DashboardPage;
