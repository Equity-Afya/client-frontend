import React from 'react';
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

const ManageChps = () => {
  const navigate = useNavigate();

  const handleSearch = (event) => {
    console.log("Search term:", event.target.value);
  };

  const handleNotifications = () => {
    console.log("Notifications clicked");
  };

  const handleProfile = () => {
    console.log("Profile clicked");
  };

  const createData = (name, email, location, phone, regDate) => {
    return { name, email, location, phone, regDate };
  };

  const rows = [
    createData('John Doe', 'john.doe@example.com', 'New York', '123-456-7890', '01-01-2022'),
    createData('Jane Smith', 'jane.smith@example.com', 'Los Angeles', '098-765-4321', '02-02-2023'),
    // Add more rows as needed
  ];

  const handleAddUser = () => {
    navigate('/create-chp');
  };

  return (
    <div style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2vh 2vw', backgroundColor: '#f1f1f1' }}>
        <h2 style={{ margin: 0 }}>Manage CHPs</h2>
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
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <h3 style={{ paddingLeft: '5vw' }}>Active Users</h3>
        <Button style={{backgroundColor: '#c00100', color: '#fff', marginLeft: 'auto', height: '5vh'}}>Export</Button>
        <Button 
          style={{backgroundColor: '#c00100', color: '#fff', marginLeft: '2vw', height: '5vh'}}
          onClick={handleAddUser}
        >
          Add User
        </Button>
      </div>
      <TableContainer component={Paper} style={{ margin: '1vh 0.5vw', maxWidth: '94vw' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Reg. Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.regDate}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => console.log('Edit', row.name)}
                    style={{ marginRight: '1vw' }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => console.log('Delete', row.name)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageChps;
