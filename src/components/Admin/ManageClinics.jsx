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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const ManageClinics = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [error, setError] = useState(null);
  const [editIdx, setEditIdx] = useState(-1);
  const [editedClinic, setEditedClinic] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [clinicToDelete, setClinicToDelete] = useState(null);

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

  const handleAddUser = () => {
    navigate('/create-clinics');
  };

  const handleEditClinic = (index) => {
    setEditIdx(index);
    setEditedClinic(filteredRows[index]);
  };

  const handleCancelEdit = () => {
    setEditIdx(-1);
    setEditedClinic({});
  };

  const handleSaveClinic = async (index) => {
    const clinicId = filteredRows[index].id; // Get the correct clinic ID
    try {
      const response = await fetch(`http://192.168.89.172:5500/api/teleclinic/updateteleclinic/${clinicId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedClinic)
      });
      if (!response.ok) {
        throw new Error(`Failed to update clinic: ${response.status} ${response.statusText}`);
      }
      toast.success('Clinic updated successfully');
      setEditIdx(-1);
      fetchData();
    } catch (error) {
      console.error('Error updating clinic:', error.message);
      toast.error('Failed to update clinic');
    }
  };

  const confirmDeleteClinic = (clinicId) => {
    setClinicToDelete(clinicId);
    setOpenDialog(true);
  };

  const handleDeleteClinic = async () => {
    try {
      const response = await fetch(`http://192.168.89.172:5500/api/teleclinic/deleteclinic/${clinicToDelete}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`Failed to delete clinic: ${response.status} ${response.statusText}`);
      }
      toast.success('Clinic deleted successfully');
      setOpenDialog(false);
      setClinicToDelete(null);
      fetchData();
    } catch (error) {
      console.error('Error deleting clinic:', error.message);
      toast.error('Failed to delete clinic');
      setOpenDialog(false);
    }
  };

  const handleViewServices = (clinic) => {
    navigate('/manage-services', { state: { clinicId: clinic.id } });
  };

  const handleChange = (e) => {
    setEditedClinic({
      ...editedClinic,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ width: '80vw', overflowX: 'hidden' }}>
      <ToastContainer />
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this clinic?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteClinic} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2vh 2vw', backgroundColor: '#f1f1f1' }}>
        <h2 style={{ margin: 0 }}>Manage Clinics</h2>
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
        <h3 style={{ paddingLeft: '5vw' }}>Active Clinics</h3>
        <Button style={{ backgroundColor: '#c00100', color: '#fff', marginLeft: 'auto', height: '5vh' }} onClick={handleAddUser}>
          Add Clinic
        </Button>
      </div>
      {error ? (
        <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>
      ) : (
        <TableContainer component={Paper} style={{ margin: '1vh 0.5vw', maxWidth: '94vw' }}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#cff' }}>
                <TableCell style={{ width: '22%' }}>Facility</TableCell>
                <TableCell style={{ width: '22%' }}>Location</TableCell>
                <TableCell style={{ width: '22%' }}>Address</TableCell>
                <TableCell style={{ width: '19%' }}>Services</TableCell>
                <TableCell style={{ width: '15%' }}>Actions</TableCell>
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
                          value={editedClinic.facility}
                          onChange={handleChange}
                        />
                      ) : (
                        row.facility
                      )}
                    </TableCell>
                    <TableCell>
                      {editIdx === index ? (
                        <TextField
                          name="location"
                          value={editedClinic.location}
                          onChange={handleChange}
                        />
                      ) : (
                        row.location
                      )}
                    </TableCell>
                    <TableCell>
                      {editIdx === index ? (
                        <TextField
                          name="address"
                          value={editedClinic.address}
                          onChange={handleChange}
                        />
                      ) : (
                        row.address
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="outlined" onClick={() => handleViewServices(row)}>
                        View Services
                      </Button>
                    </TableCell>
                    <TableCell>
                      {editIdx === index ? (
                        <>
                          <IconButton onClick={() => handleSaveClinic(index)} style={{ color: 'blue' }}>
                            <SaveIcon />
                          </IconButton>
                          <IconButton onClick={handleCancelEdit} style={{ color: 'grey' }}>
                            <CancelIcon />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton onClick={() => handleEditClinic(index)} style={{ color: 'blue' }}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => confirmDeleteClinic(row.id)} style={{ color: 'violet' }}>
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
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

export default ManageClinics;
