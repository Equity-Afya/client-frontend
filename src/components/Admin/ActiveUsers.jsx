import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActiveUsers = () => {
  const [chps, setChps] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.89.172:5500/api/get/all/registeredusers');
        setChps(response.data.chps);
        setDoctors(response.data.doctors);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Registered Users</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>CHPs</h2>
          <ul>
            {chps.map(chp => (
              <li key={chp.email}>
                <strong>Name:</strong> {chp.name}, <strong>Email:</strong> {chp.email}, <strong>Role:</strong> {chp.role}, <strong>Phone:</strong> {chp.phoneNumber}, <strong>Created At:</strong> {chp.createdAt}
              </li>
            ))}
          </ul>
          <h2>Doctors</h2>
          <ul>
            {doctors.map(doctor => (
              <li key={doctor.email}>
                <strong>Name:</strong> {doctor.name}, <strong>Email:</strong> {doctor.email}, <strong>Role:</strong> {doctor.role}, <strong>Phone:</strong> {doctor.phoneNumber}, <strong>Created At:</strong> {doctor.createdAt}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ActiveUsers;
