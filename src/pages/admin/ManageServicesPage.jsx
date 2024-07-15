import React from 'react'
import ManageServices from '../../components/Admin/ManageServices'
import { Box } from '@mui/material'
import AdminSidebar from '../../components/Admin/AdminSidebar'

function ManageServicesPage() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }} >
    <AdminSidebar sx={{display: 'flex', flexDirection: 'column', flex: '0 auto', marginRight: '32px'}}/>
      <Box sx={{display: 'flex', flexDirection: 'column', flex: '1', overflowY: 'auto', marginTop: '10px', marginLeft: '32px'}}>
      <ManageServices/>
  </Box>
    </Box>
  )
}

export default ManageServicesPage
