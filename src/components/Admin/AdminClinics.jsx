import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, createTheme, ThemeProvider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown, Add, Edit, Delete } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#800000', // maroon color
    },
  },
});

const Clinics = () => {
  const [clinics, setClinics] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false); // Dialog open state
  const [editMode, setEditMode] = useState(false); // Edit mode state
  const [selectedClinic, setSelectedClinic] = useState(null); // Selected clinic for edit

  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    try {
      const response = await fetch('http://192.168.89.172:5500/api/teleclinic/viewallteleclinics');
      if (response.ok) {
        const data = await response.json();
        setClinics(data); // Ensure this matches the structure of your API response
        console.log(data)
      } else {
        console.error('Failed to fetch clinics:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching clinics:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleEditClinic = (clinic) => {
    setSelectedClinic(clinic);
    setEditMode(true);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setEditMode(false);
    setSelectedClinic(null);
  };

  const handleUpdateClinic = async () => {
    try {
      const response = await fetch(`http://192.168.88.244:5500/api/teleclinic/updateteleclinic/${selectedClinic.clinicId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedClinic),
      });

      if (response.ok) {
        console.log('Clinic updated successfully.');
        fetchClinics(); // Refresh the list after update
        handleDialogClose();
      } else {
        console.error('Failed to update clinic.');
      }
    } catch (error) {
      console.error('Error updating clinic:', error);
    }
  };

  const handleDeleteClinic = async (clinicId) => {
    if (window.confirm('Are you sure you want to delete this clinic?')) {
      try {
        const response = await fetch(`http://192.168.88.244:5500/api/teleclinic/deleteteleclinic/${clinicId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          console.log(`Clinic with ID ${clinicId} deleted successfully.`);
          fetchClinics(); // Refresh the list after deletion
        } else {
          console.error(`Failed to delete clinic with ID ${clinicId}:`, response.statusText);
        }
      } catch (error) {
        console.error(`Error deleting clinic with ID ${clinicId}:`, error);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', gap: 3, backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
        <Typography variant="h5" gutterBottom>
          Clinics
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextField label="Search clinic" variant="outlined" sx={{ width: '300px' }} value={search} onChange={handleSearchChange} />
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
              Add Clinic <Add />
            </Button>
          </Box>
        </Box>
        <Typography variant="h6" gutterBottom>
          Clinic Details
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Clinic ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Services</TableCell>
                <TableCell>Actions</TableCell> {/* New column for actions */}
              </TableRow>
            </TableHead>
            <TableBody>
              {clinics.map((clinic, index) => (
                <TableRow key={index}>
                  <TableCell>{clinic.clinicId}</TableCell>
                  <TableCell>{clinic.name}</TableCell>
                  <TableCell>{clinic.address}</TableCell>
                  <TableCell>{clinic.location}</TableCell>
                  <TableCell>{clinic.services}</TableCell>
                  <TableCell>
                    <IconButton color="primary" aria-label="Edit" onClick={() => handleEditClinic(clinic)}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton color="secondary" aria-label="Delete" onClick={() => handleDeleteClinic(clinic.clinicId)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={open} onClose={handleDialogClose}>
          <DialogTitle>{editMode ? 'Edit Clinic' : 'Add Clinic'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {editMode ? 'Update clinic details:' : 'Enter new clinic details:'}
            </DialogContentText>
            <TextField
              margin="dense"
              label="Clinic ID"
              fullWidth
              value={selectedClinic ? selectedClinic.clinicId : ''}
              onChange={(e) => setSelectedClinic({ ...selectedClinic, clinicId: e.target.value })}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              value={selectedClinic ? selectedClinic.name : ''}
              onChange={(e) => setSelectedClinic({ ...selectedClinic, name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Address"
              fullWidth
              value={selectedClinic ? selectedClinic.address : ''}
              onChange={(e) => setSelectedClinic({ ...selectedClinic, address: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Location"
              fullWidth
              value={selectedClinic ? selectedClinic.location : ''}
              onChange={(e) => setSelectedClinic({ ...selectedClinic, location: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Services"
              fullWidth
              value={selectedClinic ? selectedClinic.services : ''}
              onChange={(e) => setSelectedClinic({ ...selectedClinic, services: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpdateClinic} color="primary">
              {editMode ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default Clinics;
