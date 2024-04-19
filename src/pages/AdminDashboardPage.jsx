import React from 'react'
import { Box } from '@mui/material'
import AdminSidebar from '../components/Admin/AdminSidebar'
import AdminDashboard from '../components/Admin/AdminDashboard'

function AdminDashboardPage() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AdminSidebar/>
     <AdminDashboard/>
    </Box>
  )
}

export default AdminDashboardPage
