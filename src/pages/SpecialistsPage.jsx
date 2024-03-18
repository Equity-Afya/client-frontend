import React from 'react'
import SpecialistServices from '../components/Specialist/Specialists';
import Sidebar from "../components/SideBar/SideBar";
//import SearchBar from "../components/SearchBar/SearchBar";;
import { Box } from "@mui/material";


function SpecialistsPage() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar on the left with margin-right */}
    <Box>
      <Sidebar sx={{ marginRight: '32px', height:'100vh' }} /> 
    </Box>
    <Box sx={{ marginTop: '48px', overflowY: 'auto', height: 'calc(100vh - 48px)', position: 'relative', marginLeft: '32px' }}>
        < SpecialistServices />
    </Box>
      </ Box>
  );
}

export default SpecialistsPage;
