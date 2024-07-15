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
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const ManageServices = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [error, setError] = useState(null);
  const [editIdx, setEditIdx] = useState(-1);
  const [editedService, setEditedService] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.89.172:5500/api/teleclinic/viewallteleclinics');
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setRows(data);
      setFilteredRows(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError(error.message);
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredData = rows.filter(row =>
      row.facility.toLowerCase().includes(searchTerm) ||
      row.location.toLowerCase().includes(searchTerm) ||
      row.address.toLowerCase().includes(searchTerm)
    );
    setFilteredRows(filteredData);
  };

  const handleNotifications = () => {
    console.log("Notifications clicked");
  };

  const handleProfile = () => {
    console.log("Profile clicked");
  };

  const handleAddService = () => {
    navigate('/create-clinic');
  };

  const handleEditService = (index) => {
    setEditIdx(index);
    setEditedService({
      ...filteredRows[index],
      services: filteredRows[index].services.split(',').map(service => service.trim())
    });
  };

  const handleCancelEdit = () => {
    setEditIdx(-1);
    setEditedService({});
  };

  const handleSaveService = async () => {
    const updatedService = {
      ...editedService,
      services: editedService.services.join(', ')
    };

    try {
      const response = await fetch(`http://192.168.89.172:5500/api/teleclinic/updateteleclinic/${editedService.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedService)
      });
      if (!response.ok) {
        throw new Error(`Failed to update service: ${response.status} ${response.statusText}`);
      }
      toast.success('Service updated successfully');
      setEditIdx(-1);
      fetchData();
    } catch (error) {
      console.error('Error updating service:', error.message);
      toast.error('Failed to update service');
    }
  };

  const handleChange = (e) => {
    setEditedService({
      ...editedService,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ width: '80vw', overflowX: 'hidden' }}>
      <ToastContainer />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2vh 2vw', backgroundColor: '#f1f1f1' }}>
        <h2 style={{ margin: 0 }}>Manage Services</h2>
        <TextField
          variant="outlined"
          placeholder="Search..."
          onChange={handleSearch}
          style={{ flex: 1, marginLeft: '30vw', width: '32vw' }}
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
        <h3 style={{ paddingLeft: '5vw' }}>Active Services</h3>
        <Button style={{ backgroundColor: '#c00100', color: '#fff', marginLeft: 'auto', height: '5vh' }} onClick={handleAddService}>
          Add Service
        </Button>
      </div>
      {error ? (
        <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>
      ) : (
        <TableContainer component={Paper} style={{ margin: '1vh 0.5vw', maxWidth: '94vw' }}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#cff' }}>
                <TableCell style={{ width: '33%' }}>Facility</TableCell>
                <TableCell style={{ width: '33%' }}>Services</TableCell>
                <TableCell style={{ width: '34%' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.length > 0 ? (
                filteredRows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {editIdx === index ? (
                        <TextField
                          name="facility"
                          value={editedService.facility}
                          onChange={handleChange}
                        />
                      ) : (
                        row.facility
                      )}
                    </TableCell>
                    <TableCell>
                      {editIdx === index ? (
                        <TextField
                          name="services"
                          value={editedService.services.join(', ')}
                          onChange={e => setEditedService({ ...editedService, services: e.target.value.split(',').map(service => service.trim()) })}
                        />
                      ) : (
                        <ol>
                          {row.services.split(',').map((service, idx) => (
                            <li key={idx}>{service.trim()}</li>
                          ))}
                        </ol>
                      )}
                    </TableCell>
                    <TableCell>
                      {editIdx === index ? (
                        <>
                          <IconButton onClick={handleSaveService} style={{ color: 'blue' }}>
                            <SaveIcon />
                          </IconButton>
                          <IconButton onClick={handleCancelEdit} style={{ color: 'grey' }}>
                            <CancelIcon />
                          </IconButton>
                        </>
                      ) : (
                        <IconButton onClick={() => handleEditService(index)} style={{ color: 'blue' }}>
                          <EditIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">No match found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ManageServices;
