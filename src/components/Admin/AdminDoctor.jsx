import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, ThemeProvider, createTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown, Add, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#800000', // maroon color
    },
  },
});

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false); // Dialog open state
  const [editMode, setEditMode] = useState(false); // Edit mode state
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Selected doctor for edit

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://192.168.89.172:5500/api/doctor/viewalldoctors');
      setDoctors(response.data || []);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleEditDoctor = (doctorId) => {
    const doctor = doctors.find(doc => doc.doctorId === doctorId);
    setSelectedDoctor(doctor);
    setEditMode(true);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setEditMode(false);
    setSelectedDoctor(null);
  };

  const handleUpdateDoctor = async () => {
    try {
      const response = await axios.put(`http://192.168.88.244:5500/api/doctor/${selectedDoctor.doctorId}`, selectedDoctor);
      if (response.status === 200) {
        console.log('Doctor updated successfully.');
        fetchDoctors(); // Refresh the list after update
        handleDialogClose();
      } else {
        console.error('Failed to update doctor.');
      }
    } catch (error) {
      console.error('Error updating doctor:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedDoctor(prevDoctor => ({
      ...prevDoctor,
      [name]: value,
    }));
  };

  if (loading) {
    return <p>Loading doctors...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', gap: 3, backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
        <Typography variant="h5" gutterBottom>
          Doctors
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextField label="Search doctor" variant="outlined" sx={{ width: '300px' }} />
          <Box>
            <IconButton color="primary" aria-label="Import">
              <KeyboardArrowDown fontSize="small" />
              <Typography variant="caption">Import</Typography>
            </IconButton>
            <IconButton color="primary" aria-label="Export">
              <KeyboardArrowUp fontSize="small" />
              <Typography variant="caption">Export</Typography>
            </IconButton>
            <Button variant="contained" color="primary" sx={{ marginLeft: 2 }}>
              Add Doctor <Add />
            </Button>
          </Box>
        </Box>
        <Typography variant="h6" gutterBottom>
          Doctor Details
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Doctor ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>ID Number</TableCell>
                <TableCell>Specialization</TableCell>
                <TableCell>License No</TableCell>
                <TableCell>Actions</TableCell> {/* New column for actions */}
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((doctor, index) => (
                <TableRow key={index}>
                  <TableCell>{doctor.doctorId}</TableCell>
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>{doctor.phoneNumber}</TableCell>
                  <TableCell>{doctor.idNumber}</TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell>{doctor.licenseNo}</TableCell>
                  <TableCell>
                    <IconButton color="primary" aria-label="Edit" onClick={() => handleEditDoctor(doctor.doctorId)}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton color="secondary" aria-label="Delete">
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={open} onClose={handleDialogClose}>
          <DialogTitle>{editMode ? 'Edit Doctor' : 'Add Doctor'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {editMode ? 'Update doctor details:' : 'Enter new doctor details:'}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              name="name"
              value={selectedDoctor ? selectedDoctor.name : ''}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Email"
              fullWidth
              name="email"
              value={selectedDoctor ? selectedDoctor.email : ''}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Phone Number"
              fullWidth
              name="phoneNumber"
              value={selectedDoctor ? selectedDoctor.phoneNumber : ''}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="ID Number"
              fullWidth
              name="idNumber"
              value={selectedDoctor ? selectedDoctor.idNumber : ''}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Specialization"
              fullWidth
              name="specialization"
              value={selectedDoctor ? selectedDoctor.specialization : ''}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="License No"
              fullWidth
              name="licenseNo"
              value={selectedDoctor ? selectedDoctor.licenseNo : ''}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpdateDoctor} color="primary">
              {editMode ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default Doctors;
