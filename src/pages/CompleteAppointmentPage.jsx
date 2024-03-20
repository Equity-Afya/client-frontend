// eslint-disable-next-line no-unused-vars
import React from 'react'
import CompleteAppointment from '../components/Booking/CompleteBooking'
import { Box } from '@mui/system';
import Sidebar from '../components/SideBar/SideBar';

const CompleteAppointmentPage = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box sx={{ marginTop: '48px',  marginLeft: '400px'}}>
        <CompleteAppointment />
      </Box>
    </Box>
  );
}

export default CompleteAppointmentPage
