import React from 'react';
import Ent from '../components/Ent';
import Sidebar from '../components/SideBar/SideBar';
import { Box } from '@mui/system';


function EntPage() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar on the left with margin-right */}
    <Box sx={{display: 'flex', flexDirection: 'column', flex: '0 0 auto', marginRight: '32px'}}>
      <Sidebar /> 
    </Box>
    <Box sx={{display: 'flex', flexDirection: 'column', overflowY: 'auto', marginTop: '0px', marginLeft: '0px', marginRight: '0px', width: '100%'}}>
        < Ent />
    </Box>
      </ Box>
  );
}

export default EntPage