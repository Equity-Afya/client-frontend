// eslint-disable-next-line no-unused-vars
import React from 'react'
import SubmitAppointment from '../components/Appointments/SubmitAppointment';
import { Box } from '@mui/system';
import Sidebar from '../components/SideBar/SideBar';

const SubmitAppointmentPage = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box sx={{ marginTop: '48px',  marginLeft: '200px'}}>
        <SubmitAppointment />
      </Box>
    </Box>
  );
}

export default SubmitAppointmentPage
