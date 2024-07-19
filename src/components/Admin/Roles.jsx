import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, createTheme, ThemeProvider } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown, Add, Edit, Delete } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#800000', // maroon color
    },
  },
});

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState('');
  const [roleCode, setRoleCode] = useState('');
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedRoleCode, setSelectedRoleCode] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch('http://192.168.88.244:5500/api/roles/getallroles');
      if (response.ok) {
        const data = await response.json();
        setRoles(data); // Ensure this matches the structure of your API response
      } else {
        console.error('Failed to fetch roles:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleCreateRole = async (e) => {
    e.preventDefault();

    const roleData = {
      name: roleName,
      code: roleCode,
    };

    try {
      const response = await fetch('http://192.168.88.244:5500/api/roles/addrole', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roleData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Role created successfully:', result);
        // Clear the form fields
        setRoleName('');
        setRoleCode('');
        handleClose();
        fetchRoles(); // Fetch roles again to update the list
      } else {
        console.error('Error creating role:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating role:', error);
    }
  };

  const handleUpdateRole = async () => {
    const roleData = {
      name: roleName,
      code: roleCode,
    };

    try {
      const response = await fetch(`http://192.168.88.244:5500/api/roles/updaterole/${selectedRoleCode}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roleData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Role updated successfully:', result);
        // Clear the form fields
        setRoleName('');
        setRoleCode('');
        setSelectedRoleCode(null);
        handleClose();
        fetchRoles(); // Fetch roles again to update the list
      } else {
        console.error('Error updating role:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleClickOpen = () => {
    setRoleName('');
    setRoleCode('');
    setOpen(true);
    setEditMode(false); // Reset edit mode when opening dialog
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false); // Reset edit mode when closing dialog
  };

  const handleEditRole = (roleCode) => {
    const selectedRole = roles.find(role => role.code === roleCode);
    setRoleName(selectedRole.name);
    setRoleCode(selectedRole.code);
    setSelectedRoleCode(roleCode);
    setOpen(true);
    setEditMode(true);
  };

  const handleDeleteRole = async (roleCode) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      try {
        const response = await fetch(`http://192.168.88.244:5500/api/roles/deleterole/${roleCode}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          console.log(`Role with Code ${roleCode} deleted successfully.`);
          fetchRoles(); // Fetch roles again to update the list
        } else {
          console.error(`Failed to delete role with Code ${roleCode}:`, response.statusText);
        }
      } catch (error) {
        console.error(`Error deleting role with Code ${roleCode}:`, error);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', gap: 3, backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
        <Typography variant="h5" gutterBottom>
          Roles
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextField label="Search role" variant="outlined" sx={{ width: '300px' }} />
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
              Create Role <Add />
            </Button>
          </Box>
        </Box>
        <Typography variant="h6" gutterBottom>
          Role Details
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Actions</TableCell> {/* New column for actions */}
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role, index) => (
                <TableRow key={index}>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>{role.code}</TableCell>
                  <TableCell>
                    <IconButton color="primary" aria-label="Edit" onClick={() => handleEditRole(role.code)}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton color="secondary" aria-label="Delete" onClick={() => handleDeleteRole(role.code)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editMode ? 'Edit Role' : 'Create A New Role'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {editMode ? 'Update the role details below:' : 'To create a new role, please enter the role name and code here:'}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Role Name"
              fullWidth
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Role Code"
              fullWidth
              value={roleCode}
              onChange={(e) => setRoleCode(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={editMode ? handleUpdateRole : handleCreateRole} color="primary">
              {editMode ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default Roles;
