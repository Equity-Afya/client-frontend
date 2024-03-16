import React from 'react'
import SpecialistServices from '../components/Specialist/Specialists';
import Sidebar from "../components/SideBar/SideBar";
import SearchBar from "../components/SearchBar/SearchBar";;
import { Box } from "@mui/material";


function SpecialistsPage() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>

    <Sidebar sx={{ marginRight: '32px' }} /> 
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1 }}>
        {/* Search bar */}
        <SearchBar />

        {/* Medical services content with margin-left */}
        <Box sx={{ marginTop: '48px', overflowY: 'auto', height: 'calc(100vh - 48px)', position: 'relative', marginLeft: '32px' }}> {/* Increase marginLeft to create a larger gap */}
        < SpecialistServices />;
        </Box>
      </Box>

    
    </Box>
  )
}

export default SpecialistsPage
