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
import Button from '@mui/material/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import debounce from 'lodash/debounce';

const UnapprovedBookings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDates, setSelectedDates] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, rows]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.89.68:5500/api/appointments/unapprovedbookings');
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      if (Array.isArray(data.pendingAppointments)) {
        setRows(data.pendingAppointments);
        setFilteredRows(data.pendingAppointments); // Ensure filteredRows initially contains all data
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
      row.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.appointmentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.residence.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.gender.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRows(filteredData);
  }, 300);

  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  const handleNotifications = () => {
    console.log("Notifications clicked");
  };

  const handleProfile = () => {
    console.log("Profile clicked");
  };

  const handleApprove = async (index) => {
    const rowToApprove = filteredRows[index];
    const selectedDate = selectedDates[index];

    if (!selectedDate) {
      alert('Please select a date before approving.');
      return;
    }

    try {
      console.log('Approving booking:', rowToApprove);
      const response = await fetch(`http://192.168.89.68:5500/api/appointments/approvebookings/${rowToApprove.appointmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          approvedDate: selectedDate.toISOString() // Send the selected date in ISO format
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to approve booking: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`);
      }

      // Show a notification upon successful approval
      alert('Booking approved successfully');

      // Remove the approved booking from the filtered bookings list
      const newFilteredRows = filteredRows.filter((_, i) => i !== index);
      setFilteredRows(newFilteredRows);
    
      const newRows = rows.filter(row => row.appointmentId !== rowToApprove.appointmentId);
      setRows(newRows);
    } catch (error) {
      console.error('Error approving booking:', error.message);
      setError(error.message);
    }
  };

  const handleDateChange = (index, date) => {
    setSelectedDates({
      ...selectedDates,
      [index]: date
    });
  };

  return (
    <div style={{ maxWidth: '100vw', overflowX: 'hidden', backgroundColor: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2vh 2vw', backgroundColor: '#f1f1f1' }}>
        <h2 style={{ margin: 0, color: '#000' }}>Pending Bookings</h2>
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
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <h3 style={{ paddingLeft: '5vw', color: '#000' }}>All Bookings</h3>
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
                <TableCell>Payment Status</TableCell>
                <TableCell>Appointment ID</TableCell>
                <TableCell>Actions</TableCell>
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
                    <TableCell>{row.paymentStatus}</TableCell>
                    <TableCell>{row.appointmentId}</TableCell>
                    <TableCell style={{display: 'flex', flexDirection: 'row'}}>
                      <DatePicker
                        selected={selectedDates[index] || null}
                        onChange={(date) => handleDateChange(index, date)}
                        showTimeSelect
                        dateFormat="Pp"
                        placeholderText="Select Date and Time"
                        customInput={<TextField variant="outlined" />}
                      />
                      <Button
                        color="primary"
                        onClick={() => handleApprove(index)}
                        style={{ marginTop: '1vh' }}
                        disabled={!selectedDates[index]}
                      >
                        Approve
                      </Button>
                    </TableCell>
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

export default UnapprovedBookings;
