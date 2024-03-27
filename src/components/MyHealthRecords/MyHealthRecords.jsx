import React, { useState } from 'react';
import { Container, Typography, Paper, Card, CardContent, Button, TextField, MenuItem } from '@mui/material';
import { FavoriteBorderOutlined, Height, Description } from '@mui/icons-material'; // Importing icons
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // Importing Recharts components

const MyHealthRecords = () => (
  <Container>
    <Typography variant="h1" gutterBottom>
      My Health Records
    </Typography>
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Health Records
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <RecordCard title="Blood Pressure" buttonText="Record" icon={<FavoriteBorderOutlined />} formFields={['Date', 'Systolic', 'Diastolic']} />
        <RecordCard title="BMI" buttonText="Record" icon={<Height />} formFields={['Weight', 'Height']} />
        <RecordCard title="Lab Result" buttonText="View" icon={<Description />} />
      </div>
    </Paper>
    <DataAnalyticsGraph />
  </Container>
);

const RecordCard = ({ title, buttonText, icon, formFields = [] }) => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    if (title === "Lab Result") {
      // If it's Lab Result, directly show the results
      // You can implement logic to fetch and display lab results here
      console.log("Show lab results");
    } else {
      setShowForm(true);
    }
  };

  const handleSubmit = () => {
    // Handle form submission here
    // You can collect the form data and perform further actions
    setShowForm(false); // Close the form after submission
  };

  return (
    <Card style={{ width: '30%', margin: '10px', background: `linear-gradient(to bottom, #B60709, #500304)`, borderRadius: '20px' }}>
      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ background: `linear-gradient(to bottom, #C03b00, #AE0B0F)`, padding: '10px', borderRadius: '50%' }}>
          {icon}
        </div>
        <Typography variant="h6" gutterBottom style={{ marginTop: '10px', color: 'white', fontWeight: 'bold', textDecoration: 'underline' }}>
          {title}
        </Typography>
        <Button variant="contained" color="primary" style={{ backgroundColor: '#C00100' }} onClick={handleButtonClick}>
          {buttonText}
        </Button>
        {showForm && <RecordForm formFields={formFields} onSubmit={handleSubmit} />}
      </CardContent>
    </Card>
  );
};

const RecordForm = ({ formFields, onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px', width: '100%', textAlign: 'center' }}>
      {formFields.map((field, index) => (
        <TextField
          key={index}
          label={field}
          value={formData[field] || ''}
          onChange={(e) => handleChange(field, e.target.value)}
          style={{ marginBottom: '10px', borderRadius: '20px', color: 'white', width: '80%' }}
          InputProps={{
            style: { color: 'white' }
          }}
        />
      ))}
      <Button type="submit" variant="contained" background="#c00100">
        Submit
      </Button>
    </form>
  );
};

const DataAnalyticsGraph = () => {
  // Sample data for illustration
  const bloodPressureData = [
    { date: '2022-01-01', systolic: 120, diastolic: 80 },
    { date: '2022-01-02', systolic: 118, diastolic: 78 },
    { date: '2022-01-03', systolic: 122, diastolic: 82 },
    { date: '2022-01-04', systolic: 115, diastolic: 75 },
    { date: '2022-01-05', systolic: 125, diastolic: 85 },
    // Add more data as needed
  ];

  const [timeInterval, setTimeInterval] = useState('Daily');

  const handleTimeIntervalChange = (event) => {
    setTimeInterval(event.target.value);
  };

  return (
    <Card style={{ marginTop: '70px', width: '50%', padding: '20px', borderRadius: '20px', background: `linear-gradient(to bottom, #C03b00, #AE0B0F)` }}>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" gutterBottom style={{ color: 'white' }}>
            Pressure Map
          </Typography>
          <TextField
            select
            value={timeInterval}
            onChange={handleTimeIntervalChange}
            variant="outlined"
            size="small"
            label="Time Interval"
            style={{ color: 'white' }}
          >
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
          </TextField>
        </div>
        {/* Recharts LineChart */}
        <LineChart width={500} height={200} data={bloodPressureData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="systolic" stroke="#8884d8" />
          <Line type="monotone" dataKey="diastolic" stroke="#82ca9d" />
        </LineChart>
      </CardContent>
    </Card>
  );
};

export default MyHealthRecords;
