import React, { useState } from 'react';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton, Card, CardContent } from '@material-ui/core';
import {Done, Handshake} from '@mui/icons-material';
//import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#800000',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3),
    marginTop: theme.spacing(4),
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'lightgrey',
    color: '#800000',
    width: '500px'
  },
  button: {
    marginTop: theme.spacing(2),
  },
  card: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing(1),
    color: '#800000',
  },
}));

const DeliveryInformation = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    county: '',
    subCounty: '',
    town: '',
    street: '',
    house: '',
    contact: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== 'house') {
        errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCompleteOrder = () => {
    const isValid = validateForm();
    if (isValid) {
      console.log("Form is valid:", isValid);
      setOpenDialog(true);
    }
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.paper}>
        <h1>Delivery Information</h1>
        <FormControl className={classes.formControl} fullWidth >
          <InputLabel id="county-label"> County</InputLabel>
          <Select labelId="county-label" id="county" value={formData.county} onChange={handleChange} fullWidth>
            <MenuItem value="county1">County 1</MenuItem>
            <MenuItem value="county2">County 2</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="subCounty-label"> Sub-County</InputLabel>
          <Select labelId="subCounty-label" id="subCounty" value={formData.subCounty} onChange={handleChange} fullWidth>
            <MenuItem value="">Select Sub-County</MenuItem>
            <MenuItem value="subCounty1">Sub-County 1</MenuItem>
            <MenuItem value="subCounty2">Sub-County 2</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="town-label">Town</InputLabel>
          <Select labelId="town-label" id="town" value={formData.town} onChange={handleChange} fullWidth>
            <MenuItem value="">Select Town</MenuItem>
            <MenuItem value="town1">Town 1</MenuItem>
            <MenuItem value="town2">Town 2</MenuItem>
          </Select>
        </FormControl>
        <TextField 
          id="street" 
          label="Street Name" 
          fullWidth 
          className={classes.textField} 
          required
          value={formData.street}
          onChange={handleChange}
          
        />
        <TextField 
         id="house" 
         label="House/Apartment Name" 
         fullWidth 
         className={classes.textField}
         value={formData.house}
         onChange={handleChange}
        />
        <TextField 
          id="contact" 
          label="Contact Number" 
          fullWidth 
          className={classes.textField} 
          required
          value={formData.contact}
          onChange={handleChange}
          
        />
        <Button className={classes.button} variant="contained" color="primary" fullWidth onClick={handleCompleteOrder}>
          Complete Order
        </Button>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
  <DialogTitle style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>Delivery Message</DialogTitle>
  <DialogContent>
    <Card className={classes.card}>
      <CardContent className={classes.cardContent} style={{ flexDirection: 'column', alignItems: 'center' }}>
        <Done style={{ marginBottom: '8px' }} />
        <Typography variant="body1" style={{ marginBottom: '8px' }}>Your order has been successfully placed.</Typography>
        <Handshake style={{ marginBottom: '8px' }} />
      </CardContent>
      <CardContent style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
        <Typography variant="body1">Thank you for your order!</Typography>
      </CardContent>
    </Card>
  </DialogContent>
  <DialogActions  style={{justifyContent: 'center'}}>
    <Button onClick={handleCloseDialog} color="primary" variant='contained' style={{backgroundColor:'#800000'}}>
      Back
    </Button>
  </DialogActions>
</Dialog>
    </ThemeProvider>
  );
}

export default DeliveryInformation;
