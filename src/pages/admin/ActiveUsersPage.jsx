import React from 'react'
import ActiveUsers from '../../components/Admin/ActiveUsers'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import { Box } from '@mui/system'



const ActiveUsersPage = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: "#D9D9D9", width: '100vw'}}>
        <Box>
        <AdminSidebar sx={{ flex: '0 0 auto', width: '18vw', overflowY: 'auto', height: '100vh' }}/>
        </Box>
        <Box style={{paddingLeft: '0'}}>
        <ActiveUsers/>
        </Box>
    </Box>
  )
}

export default ActiveUsersPage
