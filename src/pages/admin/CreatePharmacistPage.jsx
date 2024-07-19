import React from 'react';
import CreatePharmacist from '../../components/Admin/CreatePharmacist';
import AdminSidebar from '../../components/Admin/AdminSidebar';

const CreatePharmacistPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div>
        <AdminSidebar />
      </div>
      <div style={{ paddingLeft: '20vw' }}>
        <CreatePharmacist />
      </div>
    </div>
  );
};

export default CreatePharmacistPage;