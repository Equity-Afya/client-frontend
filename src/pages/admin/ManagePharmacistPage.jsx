import React from 'react'
import ManagePharmacists from '../../components/Admin/ManagePharmacist'
import AdminSidebar from '../../components/Admin/AdminSidebar'

const ManagePharmacistPage = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <div>
        <AdminSidebar/>
      </div>
      <div style={{paddingLeft: '1vw'}}>
        <ManagePharmacists/>
      </div>
    </div>
  )
}

export default ManagePharmacistPage