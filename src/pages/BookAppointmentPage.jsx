import React from 'react'
import { Box } from '@mui/system';
import Sidebar from '../components/SideBar/SideBar'
import AppointmentForm from '../components/Appointments/BookAppointment';



const BookAppointmentPage = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box sx={{ marginTop: '48px', overflowY: 'auto', height: 'calc(100vh - 48px)', position: 'relative', marginLeft: '200px'}}>
        <AppointmentForm />
      </Box>
    </Box>
  );
}

export default BookAppointmentPage
