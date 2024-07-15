import React from 'react'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import AdminsLatestBookings from '../../components/Admin/AdminsLatestBookings'


const AdminLatestBookingsPage = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'row', minHeight: '100vh'}}>
      <div style={{width: '17vw', position: 'fixed'}}>
        <AdminSidebar/>
      </div>
      <div style={{marginLeft: '18vw', width: '80vw'}}>
        <AdminsLatestBookings/>
      </div>
    </div>
  )
}

export default AdminLatestBookingsPage
