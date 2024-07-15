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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const ManageDoctors = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [editedData, setEditedData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.89.172:5500/api/doctor/viewalldoctors');
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
      row.name.toLowerCase().includes(searchTerm) ||
      row.email.toLowerCase().includes(searchTerm) ||
      row.licenseNo.toLowerCase().includes(searchTerm) ||
      row.phoneNumber.toLowerCase().includes(searchTerm)
    );
    setFilteredRows(filteredData);
  };

  const handleNotifications = () => {
    console.log("Notifications clicked");
  };

  const handleProfile = () => {
    console.log("Profile clicked");
  };

  const handleAddUser = () => {
    navigate('/create-doctor');
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedData(filteredRows[index]);
  };

  const handleDelete = async (index) => {
    const rowToDelete = filteredRows[index];
    try {
      const response = await fetch(`http://192.168.89.172:5500/api/doctor/delete/${rowToDelete.id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`Failed to delete data: ${response.status} ${response.statusText}`);
      }
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error.message);
      setError(error.message);
    }
  };

  const handleInputChange = (event, field) => {
    setEditedData({
      ...editedData,
      [field]: event.target.value
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://192.168.89.172:5500/api/doctor/updatedetails/${editedData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });
      if (!response.ok) {
        throw new Error(`Failed to update data: ${response.status} ${response.statusText}`);
      }
      fetchData();
      setEditIndex(-1);
    } catch (error) {
      console.error('Error updating data:', error.message);
      setError(error.message);
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch('http://192.168.89.172:5500/api/doctor/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rows),
      });
      if (!response.ok) {
        throw new Error(`Failed to export data: ${response.status} ${response.statusText}`);
      }
      console.log('Data exported successfully');
    } catch (error) {
      console.error('Error exporting data:', error.message);
      setError(error.message);
    }
  };

  return (
    <div style={{ width: '80vw', overflowX: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2vh 2vw', backgroundColor: '#f1f1f1' }}>
        <h2 style={{ margin: 0 }}>Manage Doctors</h2>
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
        <h3 style={{ paddingLeft: '5vw' }}>Active Doctors</h3>
        <Button style={{ backgroundColor: '#c00100', color: '#fff', marginLeft: 'auto', height: '5vh' }} onClick={handleExport}>
          Export
        </Button>
        <Button
          style={{ backgroundColor: '#c00100', color: '#fff', marginLeft: '2vw', height: '5vh' }}
          onClick={handleAddUser}
        >
          Add User
        </Button>
      </div>
      {error ? (
        <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>
      ) : (
        <TableContainer component={Paper} style={{ margin: '1vh 0.5vw', maxWidth: '94vw' }}>
          <Table>
            <TableHead>
              <TableRow style={{backgroundColor: '#cff'}}>
                <TableCell>Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>License Number</TableCell>
                <TableCell>Specialization</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.length > 0 ? (
                filteredRows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {editIndex === index ? (
                        <TextField
                          id={`name-${index}`}
                          defaultValue={row.name}
                          variant="outlined"
                          onChange={(e) => handleInputChange(e, 'name')}
                        />
                      ) : (
                        row.name
                      )}
                    </TableCell>
                    <TableCell>
                      {editIndex === index ? (
                        <TextField
                          id={`phoneNumber-${index}`}
                          defaultValue={row.phoneNumber}
                          variant="outlined"
                          onChange={(e) => handleInputChange(e, 'phoneNumber')}
                        />
                      ) : (
                        row.phoneNumber
                      )}
                    </TableCell>
                    <TableCell>
                      {editIndex === index ? (
                        <TextField
                          id={`licenseNo-${index}`}
                          defaultValue={row.licenseNo}
                          variant="outlined"
                          onChange={(e) => handleInputChange(e, 'licenseNo')}
                        />
                      ) : (
                        row.licenseNo
                      )}
                    </TableCell>
                    <TableCell>
                      {editIndex === index ? (
                        <TextField
                          id={`specialization-${index}`}
                          defaultValue={row.specialization}
                          variant="outlined"
                          onChange={(e) => handleInputChange(e, 'specialization')}
                        />
                      ) : (
                        <ol>
                          {row.specialization.split(',').map((specialization, i) => (
                            <li key={i}>{specialization.trim()}</li>
                          ))}
                        </ol>
                      )}
                    </TableCell>
                    <TableCell>
                      {editIndex === index ? (
                        <Button
                          color="primary"
                          onClick={handleSave}
                          style={{ marginRight: '1vw' }}
                        >
                          Save
                        </Button>
                      ) : (
                        <IconButton
                          color="primary"
                          onClick={() => handleEdit(index)}
                          style={{ marginRight: '1vw' }}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                      <IconButton
                        color="secondary"
                        onClick={() => handleDelete(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">No match found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ManageDoctors;
