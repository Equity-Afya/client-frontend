import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Card, CardContent, Button, TextField, MenuItem, CircularProgress } from '@mui/material';
import { FavoriteBorderOutlined, Height, Description } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios'; // Import Axios

const MyHealthRecords = () => {
  const [labResults, setLabResults] = useState([]);
  const [showLabResults, setShowLabResults] = useState(false);

  const fetchLabResults = async () => {
    try {
      const response = await axios.get('YOUR_API_ENDPOINT'); // Use axios.get
      setLabResults(response.data); // Access data with response.data
      setShowLabResults(true); // Show lab results after fetching
    } catch (error) {
      console.error('Failed to fetch lab results:', error);
    }
  };

  const downloadLabResults = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(labResults, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = "labResults.json";
    document.body.appendChild(element); // Required for this to work in Firefox
    element.click();
  };

  return (
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
          <RecordCard title="Lab Results" buttonText="View" icon={<Description />} onViewClick={fetchLabResults} />
        </div>
      </Paper>
      {showLabResults && (
        <div>
          <Typography variant="h5" gutterBottom>
            Lab Results
          </Typography>
          <pre>{JSON.stringify(labResults, null, 2)}</pre>
          <Button variant="contained" style={{ backgroundColor: '#c00100', color: 'white' }} onClick={downloadLabResults}>
            Download Lab Results
          </Button>
        </div>
      )}
      <DataAnalyticsGraph />
    </Container>
  );
};

const RecordCard = ({ title, buttonText, icon, formFields = [], onViewClick }) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    if (title === "Lab Results") {
      setLoading(true);
      onViewClick().then(() => setLoading(false)); // Ensure loading stops after fetching
    } else {
      setShowForm(true);
    }
  };

  const handleFormSubmit = (data) => {
    // Make an axios post request with the data
    axios.post('http:// 192.168.89.46:5500/api/createrecord', data)
      .then(response => {
        console.log('Data submitted successfully:', response.data);
        setShowForm(false); // Hide form after submission
      })
      .catch(error => {
        console.error('Failed to submit data:', error);
      });
  };

  return (
    <Card style={{ width: '30%', margin: '10px', background: 'lightgrey', borderRadius: '20px' }}>
      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ background: 'darkgrey', padding: '10px', borderRadius: '50%' }}>
          {icon}
        </div>
        <Typography variant="h6" gutterBottom style={{ marginTop: '10px', color: 'black', fontWeight: 'bold', textDecoration: 'underline' }}>
          {title}
        </Typography>
        {title === 'Blood Pressure' && <Typography variant="h6" gutterBottom style={{ color: 'black' }}>Weekly Average:</Typography>}
        <Button variant="contained" color="primary" style={{ backgroundColor: '#C00100' }} onClick={handleButtonClick}>
          {loading ? <CircularProgress color="inherit" size={24} /> : buttonText}
        </Button>
        {showForm && <RecordForm formFields={formFields} onSubmit={handleFormSubmit} />}
      </CardContent>
    </Card>
  );
};

const RecordForm = ({ formFields, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    // Simulate a backend request
    axios.post('YOUR_BACKEND_API_ENDPOINT', formData)
      .then(response => {
        console.log('Data submitted successfully:', response.data);
        setLoading(false);
        onSubmit(formData); // Hide form after submission and pass formData
      })
      .catch(error => {
        console.error('Failed to submit data:', error);
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px', width: '100%', textAlign: 'center' }}>
      {formFields.map((field, index) => (
        <TextField
          key={index}
          label={field}
          value={formData[field] || ''}
          onChange={(e) => handleChange(field, e.target.value)}
          style={{ marginBottom: '10px', borderRadius: '20px', color: 'black', width: '80%' }}
          InputProps={{
            style: { color: 'black' }
          }}
        />
      ))}
      <Button type="submit" variant="contained" color="primary" style={{ backgroundColor: '#C00100' }}>
        {loading ? <CircularProgress color="inherit" size={24} /> : "Submit"}
      </Button>
    </form>
  );
};

const DataAnalyticsGraph = () => {
  const bloodPressureData = [
    { date: 'Monday', systolic: 120, diastolic: 80 },
    { date: 'Tuesday', systolic: 118, diastolic: 78 },
    { date: 'Wednesday', systolic: 122, diastolic: 82 },
    { date: 'Thursday', systolic: 115, diastolic: 75 },
    { date: 'Friday', systolic: 125, diastolic: 85 },
    { date: 'Saturday', systolic: 122, diastolic: 83 },
    { date: 'Sunday', systolic: 123, diastolic: 81 },
  ];

  const [timeInterval, setTimeInterval] = useState('Daily');

  const handleTimeIntervalChange = (event) => {
    setTimeInterval(event.target.value);
  };

  // Calculate weekly average for blood pressure
  const weeklyAverage = bloodPressureData.reduce((sum, entry) => sum + entry.systolic + entry.diastolic, 0) / bloodPressureData.length;

  return (
    <Card style={{ marginTop: '80px', width: '50%', padding: '20px', borderRadius: '20px', background: 'lightgrey' }}>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" gutterBottom style={{ color: 'black' }}>
            Pressure Map
          </Typography>
          <TextField
            select
            value={timeInterval}
            onChange={handleTimeIntervalChange}
            variant="outlined"
            size="small"
            label="Time Interval"
            style={{ color: 'black' }}
          >
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
          </TextField>
        </div>
        <Typography variant="h6" gutterBottom style={{ color: 'black' }}>
          Weekly Average: {weeklyAverage.toFixed(2)}
        </Typography>
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
