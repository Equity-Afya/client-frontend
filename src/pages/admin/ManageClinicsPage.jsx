import React from 'react';
import ManageClinics from '../../components/Admin/ManageClinics';
import AdminSidebar from '../../components/Admin/AdminSidebar';

const ManageClinicsPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      <div style={{ position: 'fixed' }}> {/* Set sidebar to fixed */}
        <AdminSidebar />
      </div>
      <div style={{ marginLeft: '17vw', paddingLeft: '1vw' }}> {/* Adjust marginLeft to accommodate the fixed sidebar */}
        <ManageClinics />
      </div>
    </div>
  );
};

export default ManageClinicsPage;
