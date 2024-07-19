import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import debounce from 'lodash/debounce';
import 'react-datepicker/dist/react-datepicker.css';

const AdminLatestBookings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All Bookings');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, rows]);

  useEffect(() => {
    filterRowsByStatus(statusFilter);
  }, [statusFilter, rows]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.89.172:5500/api/appointments/getallappointments');
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        console.log('Fetched data:', data);
        setRows(data);
        setFilteredRows(data);
      } else {
        throw new Error('Fetched data is not an array');
      }

      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError(error.message);
    }
  };

  const handleSearch = debounce((searchTerm) => {
    const filteredData = rows.filter(row =>
      row.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.appointmentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (row.scheduledDate && row.scheduledDate.toLowerCase().includes(searchTerm.toLowerCase())) ||
      row.createdAt.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRows(filteredData);
  }, 300);

  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filterRowsByStatus = (status) => {
    let filteredData = rows;
    if (status !== 'All Bookings') {
      filteredData = rows.filter(row => {
        console.log(`Checking row with appointmentStatus: ${row.appointmentStatus}`);
        return row.appointmentStatus === status;
      });
    }
    setFilteredRows(filteredData);
  };

  const handleNotifications = () => {
    console.log("Notifications clicked");
  };

  const handleProfile = () => {
    console.log("Profile clicked");
  };

  return (
    <div style={{ maxWidth: '100vw', overflowX: 'hidden', backgroundColor: '#fff' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2vh 2vw', backgroundColor: '#f1f1f1' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f1f1f1' }}>
          <h2 style={{ margin: 0, color: '#000' }}>Admin Latest Bookings</h2>
          <TextField
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchInputChange}
            style={{ flex: 1, marginLeft: '30vw', width: '32vw', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff'}}
          />
          <NotificationsIcon
            onClick={handleNotifications}
            style={{
              fontSize: '3vh',
              marginLeft: '2vw',
              cursor: 'pointer',
              color: '#c00100',
            }}
          />
          <AccountCircleIcon
            onClick={handleProfile}
            style={{
              fontSize: '3vh',
              marginLeft: '2vw',
              cursor: 'pointer',
              color: '#c00100',
            }}
          />
        </div>
        <div>
          <Select
            value={statusFilter}
            onChange={handleStatusChange}
            style={{ marginLeft: '0vw', width: '20vw', backgroundColor: '#fff' }}
          >
            <MenuItem value="All Bookings">All Bookings</MenuItem>
            <MenuItem value="Pending">Pending Appointments</MenuItem>
            <MenuItem value="Approved">Approved Appointments</MenuItem>
            <MenuItem value="Reviewed">Reviewed Appointments</MenuItem>
          </Select>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <h3 style={{ paddingLeft: '5vw', color: '#000' }}>{statusFilter}</h3>
      </div>
      {error ? (
        <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>
      ) : (
        <TableContainer component={Paper} style={{ margin: '1vh 0.5vw', maxWidth: '94vw' }}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#cff' }}>
                <TableCell>Patient Details</TableCell>
                <TableCell>Booking Type</TableCell>
                <TableCell>Service</TableCell>
                <TableCell>Appointment Status</TableCell>
                <TableCell>Scheduled Date</TableCell>
                <TableCell>Date Booked</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.length > 0 ? (
                filteredRows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div><strong>{row.fullName}</strong></div>
                      <div>Age: {row.age}</div>
                      <div>Gender: {row.gender}</div>
                      <div>Residence: {row.residence}</div>
                      <div>Phone: {row.phoneNumber}</div>
                      <div>Email: {row.email}</div>
                    </TableCell>
                    <TableCell>{row.appointmentType}</TableCell>
                    <TableCell>{row.service}</TableCell>
                    <TableCell>{row.appointmentStatus}</TableCell>
                    <TableCell>{row.scheduledDate || 'N/A'}</TableCell>
                    <TableCell>{row.createdAt}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">No match found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default AdminLatestBookings;
