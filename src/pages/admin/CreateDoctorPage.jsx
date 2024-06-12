import React from 'react';
import CreateDoctor from '../../components/Admin/CreateDoctor';
import AdminSidebar from '../../components/Admin/AdminSidebar';

const CreateDoctorPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div>
        <AdminSidebar />
      </div>
      <div style={{ paddingLeft: '20vw' }}>
        <CreateDoctor />
      </div>
    </div>
  );
};

export default CreateDoctorPage;
