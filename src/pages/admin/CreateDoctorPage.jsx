import React from 'react';
import CreateDoctor from '../../components/Admin/CreateDoctor';
import AdminSidebar from '../../components/Admin/AdminSidebar';

const CreateDoctorPage = () => {
  return (
    <sdiv style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ position: 'fixed' }}>
        <AdminSidebar />
      </div>
      <div style={{ marginLeft: '40vw' }}>
        <CreateDoctor />
      </div>
    </sdiv>
  );
};

export default CreateDoctorPage;
