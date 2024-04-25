import React, { useState, useEffect } from 'react';
import { Container, MenuItem, Card, CardContent, Typography, Box } from '@mui/material';
import Photo from "../../assets/doctors.jpg";
import YourAppointments from './YourAppointments';

const DoctorsDashboard = () => {
  const [doctorData, setDoctorData] = useState(null);
  const [reportType, setReportType] = useState('This Week');
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    fetchDoctorData();
  }, []);

  const fetchDoctorData = async () => {
    try {
      const response = await fetch('https://example.com/api/doctor');
      const data = await response.json();
      setDoctorData(data);
    } catch (error) {
      console.error('Error fetching doctor data:', error);
    }
  };

  const fetchReportData = async (type) => {
    try {
      const response = await fetch(`https://example.com/api/reports?type=${type}`);
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  const handleReportTypeChange = async (event) => {
    const selectedType = event.target.value;
    setReportType(selectedType);
    console.log("Fetching report for:", selectedType);
    await fetchReportData(selectedType);
  };

  return (
    <Container style={{ display: 'flex', flexDirection: "column", marginLeft: "0"}}>
      {doctorData && (
        <div>
          <Card style={{ width: "53vw", height: "25vh", backgroundColor: "#c00100", color: "#fff", borderRadius: "10px", position: "relative" }}>
            <CardContent>
              <h5>Welcome back</h5>
              <h3>Dr. {doctorData.name}</h3>
              <h4>You have {doctorData.appointments.length} appointments today!!</h4>
            </CardContent>
            <img src={Photo} alt='Doctors image' style={{ position: "absolute", top: 0, right: 0, width: "30%", height: "100%", objectFit: "cover" }} />
          </Card>
        </div>
      )}
      {doctorData && (
        <div style={{ position: "relative", outline: "solid 1px #670909", width: "53vw", borderRadius: "10px", marginTop: "2vh" }}>
          <h3 style={{ marginLeft: "2%" }}>Report</h3>
          <MenuItem value="This Week" onClick={() => handleReportTypeChange("This Week")}>This Week</MenuItem>
          <MenuItem value="This Month" onClick={() => handleReportTypeChange("This Month")}>This Month</MenuItem>
          <MenuItem value="This Year" onClick={() => handleReportTypeChange("This Year")}>This Year</MenuItem>
          <Card style={{ display: 'flex', flexDirection: 'row', width: "53vw", height: "25vh", backgroundColor: "#fff", marginTop: "2vh", marginBottom: "0" }}>
            <CardContent style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              {reportData && (
                <>
                  <Box style={{ backgroundColor: "#670909", color: "#fff", borderRadius: "15px", width: "18%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="h6" gutterBottom>
                      Total patients
                    </Typography>
                    <Typography variant="h3" gutterBottom>
                      {reportData.totalPatients}
                    </Typography>
                  </Box>
                  <Box style={{ backgroundColor: "#670909", color: "#fff", borderRadius: "15px", width: "18%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Typography variant="h6" gutterBottom>
                        Consultation
                      </Typography>
                      <Typography variant="h3" gutterBottom>
                        {reportData.consultation}
                      </Typography>
                    </Box>
                    <Box style={{ backgroundColor: "#670909", color: "#fff", borderRadius: "15px", width: "18%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Typography variant="h6" gutterBottom>
                        Surgery
                      </Typography>
                      <Typography variant="h3" gutterBottom>
                        {reportData.surgery}
                      </Typography>
                    </Box>
                    <Box style={{ backgroundColor: "#670909", color: "#fff", borderRadius: "15px", width: "18%", height: "18vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Typography variant="h6" gutterBottom>
                        Injection
                      </Typography>
                      <Typography variant="h3" gutterBottom>
                        {reportData.injection}
                      </Typography>
                    </Box>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "row", marginTop: "2vh", width: "53vw", justifyContent: "space-between" }}>
        <Card style={{ width: "55%", height: "40vh", outline: "solid 1px #670909", borderRadius: "15px" }}>
          <CardContent style={{ position: "relative"}}>
            <h3 style={{ position: "absolute", top: 0, left: 0}}>Patients</h3>
          </CardContent>
        </Card>
        <Card style={{ width: "30%", height: "40vh", outline: "solid 1px #670909", borderRadius: "15px" }}>
          <CardContent style={{position: "relative"}}>
            <h3 style={{ position: "absolute", top: 0, left: 0}}>Gender</h3>
          </CardContent>
        </Card>
      </div>
      {doctorData && (
        <YourAppointments
           appointments={doctorData.appointments}
        />
      )}
    </Container>
  );
};

export default DoctorsDashboard;
