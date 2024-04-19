import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import mode from 'cors';

const AdminServiceManagement = () => {
  const { isLoading, error, data: services } = useQuery({
    queryKey: 'services',
    queryFn: async () => {
      try {
        const response = await axios.get('https://fc5d-102-210-244-74.ngrok-free.app/api/getservices');
        mode:'cors'
        return response.data.services;
      } catch (error) {
        throw new Error('Failed to fetch services');
      }
    },
  });

  console.log('isLoading:', isLoading);
  console.log('error:', error);
  console.log('services:', services);

  if (error) return <div className='failed'>Failed to load services: {error.message}</div>;
  if (isLoading) return <div className="loading">Loading...</div>;

  // Check if services is defined before rendering
  return (
    <>
      <div>
        {services && services.map((service, index) => (
          <div key={index}>{service.name}</div>
        ))}
      </div>
      <h1>Yur</h1>
    </>
  );
};

export default AdminServiceManagement;
