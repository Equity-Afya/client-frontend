import React, {useState, useEffect} from 'react';
import Calendar from 'react-calendar'; // Import Calendar component
import "react-calendar/dist/Calendar.css"; // Import default Calendar styles
import { Card, CardContent, Container, Typography, Button } from "@mui/material";


const YourAppointments = () => {

  const [currentDate, setCurrentDate] = useState(new Date());
  // Define colors corresponding to the theme
  const colors = [ "#fcc", "#cff", "#cbf", "#d9d9"]; // Added a variety of colors to match the theme

  const handleViewAppointments = () => {
    // Add logic to navigate to appointments page
    console.log("Redirecting to appointments page...");
  };

  useEffect(() => {

    //Function to update current date every second
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    
    return() => clearInterval(interval); //Clear the interval when the componemt unmounts
  }, []);  //empty dependency array to ensure this effect runs only once when component mounts


  return (
    <Container style={{ width: "25vw", marginTop: "1vh", marginLeft: "0"}}>
      <div>
        <p style={{color: '#00f', fontWeight: "bold", fontSize: "20px", textAlign: "center"}}>{currentDate.toLocaleString()}</p>
      </div>
      <div>  
        <Card  style={{outline: "solid 1px #930100" }}>
          <CardContent>
            <div >
              <h3 style={{textAlign: "center"}}>Your Appointments</h3>
            </div>
            <Calendar />
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card style={{ outline: "solid 1px #930100", marginBottom: "1rem", marginTop: "1vh" }}>
          <CardContent>
            {/* List of appointments */}
            <div style={{ marginBottom: "0.5rem", backgroundColor: colors[0], padding: "0.5rem", borderRadius: "15px" }}>
              <Typography variant="h6">Doctor: Appointment 1</Typography>
              <Typography variant="body1">Time: 10:00 AM</Typography>
            </div>
            <div style={{ marginBottom: "0.5rem", backgroundColor: colors[1], padding: "0.5rem", borderRadius: "15px" }}>
              <Typography variant="h6">Doctor: Appointment 2</Typography>
              <Typography variant="body1">Time: 11:00 AM</Typography>
            </div>
            <div style={{ marginBottom: "0.5rem", backgroundColor: colors[2], padding: "0.5rem", borderRadius: "15px" }}>
              <Typography variant="h6">Doctor: Appointment 3</Typography>
              <Typography variant="body1">Time: 12:00 PM</Typography>
            </div>
            <div style={{ marginBottom: "0.5rem", backgroundColor: colors[3], padding: "0.5rem", borderRadius: "15px" }}>
              <Typography variant="h6">Doctor: Appointment 4</Typography>
              <Typography variant="body1">Time: 1:00 PM</Typography>
            </div>
            {/* Button to direct to appointments page */}
            <Button variant="contained" color="primary"  style={{ marginTop: "1rem", marginLeft: "10%" }} onClick={handleViewAppointments}>
              View All Appointments
            </Button>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}

export default YourAppointments;


