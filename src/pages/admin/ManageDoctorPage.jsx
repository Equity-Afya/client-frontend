import React from 'react'
import ManageDoctors from '../../components/Admin/ManageDoctor'
import AdminSidebar from '../../components/Admin/AdminSidebar'

const ManageDoctorsPage = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <div>
        <AdminSidebar/>
      </div>
      <div style={{paddingLeft: '1vw'}}>
        <ManageDoctors/>
      </div>
    </div>
  )
}

export default ManageDoctorsPage
