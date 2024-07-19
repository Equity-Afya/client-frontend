import React from 'react'
import CancelledReturnedOrders from '../components/E-Pharmacy/MyOrders/cancelledReturnedOrders';
import { Box } from '@mui/system';
import EpharmacySidebar from '../components/E-Pharmacy/EpharmacySideBar/EpharmacySidebar';

function CancelledReturnedPage() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
    {/* EpharmacySidebar on the left with margin-right */}
    <EpharmacySidebar sx={{display: 'flex', flexDirection: 'column', flex: '0 auto', marginRight: '32px'}} /> {/* Increase margin-right to create a larger gap */}

    <Box sx={{display: 'flex', flexDirection: 'column', flex: '1', overflowY: 'auto', marginTop: '10px', marginLeft: '32px'}}>
      <CancelledReturnedOrders />
    </Box>
</Box>
  )
}

export default CancelledReturnedPage