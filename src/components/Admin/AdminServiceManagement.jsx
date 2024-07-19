// src/AdminServiceManagement.jsx
import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, createTheme, ThemeProvider} from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown, Add } from '@mui/icons-material';
import axios from 'axios';
const theme = createTheme({
  palette: {
    primary: {
      main: '#800000', // maroon color
    },
  },
});

const AdminServiceManagement = () => {
  const [image, setImage] = useState(null);
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [serviceCategory, setServiceCategory] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [serviceAmount, setServiceAmount] = useState('');
  const [editServiceId, setEditServiceId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://192.168.88.244:5500/api/service/viewallservices');
      setServices(response.data.services || []);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setServiceName(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setServiceCategory(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setServiceDescription(e.target.value);
  };

  const handleAmountChange = (e) => {
    setServiceAmount(e.target.value);
  };

  const handleEdit = (id, name, category, description, amount) => {
    setEditServiceId(id);
    setServiceName(name);
    setServiceCategory(category);
    setServiceDescription(description);
    setServiceAmount(amount);
    setOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://192.168.88.244:5500/api/service/updateService/${editServiceId}`, {
        name: serviceName,
        category: serviceCategory,
        description: serviceDescription,
        amount: serviceAmount
      });
      alert('Service updated successfully');
      fetchServices();
      handleClose();
    } catch (error) {
      console.error('Failed to update service:', error);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', serviceName);
    formData.append('category', serviceCategory);
    formData.append('description', serviceDescription);
    formData.append('amount', serviceAmount);

    try {
      await axios.post('http://localhost:3000/add-service', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Service uploaded successfully');
      fetchServices();
      handleClose();
    } catch (error) {
      console.error('Failed to upload service:', error);
    }
  };

  const handleDelete = async (serviceId) => {
    try {
      await axios.delete(`http://192.168.88.244:5500/api/service/deleteService/${serviceId}`);
      alert('Service deleted successfully');
      fetchServices();
    } catch (error) {
      console.error('Failed to delete service:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setServiceName('');
    setServiceCategory('');
    setServiceDescription('');
    setServiceAmount('');
    setEditServiceId('');
  };

  if (loading) {
    return <p>Loading services...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', gap: 3, backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Typography variant="h5" gutterBottom>
        Service Management
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField label="Search service" variant="outlined" sx={{ width: '300px' }} />
        <Box>
          <IconButton color="primary" aria-label="Import">
            <KeyboardArrowDown fontSize="small" />
            <Typography variant="caption">Import</Typography>
          </IconButton>
          <IconButton color="primary" aria-label="Export">
            <KeyboardArrowUp fontSize="small" />
            <Typography variant="caption">Export</Typography>
          </IconButton>
          <Button variant="contained" color="primary" sx={{ marginLeft: 2 }} onClick={handleClickOpen}>
            Add Service <Add />
          </Button>
        </Box>
      </Box>
      <Typography variant="h6" gutterBottom>
        Service Details
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Service ID</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount Charged</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service, index) => (
              <TableRow key={index}>
                <TableCell>{service.serviceId}</TableCell>
                <TableCell>{service.category}</TableCell>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>{service.amount}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(service._id, service.name, service.category, service.description, service.amount)}>Edit</Button>
                  <Button onClick={() => handleDelete(service._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editServiceId ? "Edit Service" : "Add Service"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editServiceId ? "Edit the details of the service." : "To add a new service, please fill in the details below."}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Service Name"
            fullWidth
            value={serviceName}
            onChange={handleNameChange}
          />
          <TextField
            margin="dense"
            label="Category"
            fullWidth
            value={serviceCategory}
            onChange={handleCategoryChange}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={serviceDescription}
            onChange={handleDescriptionChange}
          />
          <TextField
            margin="dense"
            label="Amount Charged"
            fullWidth
            value={serviceAmount}
            onChange={handleAmountChange}
          />
          <input type="file" onChange={handleImageChange} style={{ marginTop: '10px' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={editServiceId ? handleEditSubmit : handleUpload} color="primary">
            {editServiceId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
      </ThemeProvider>
  );
};

export default AdminServiceManagement;
