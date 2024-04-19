import React from 'react'
import { Box } from '@mui/material'
import AdminSidebar from '../components/Admin/AdminSidebar'

function AdminDashboardPage() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AdminSidebar/>
    </Box>
  )
}

export default AdminDashboardPage
