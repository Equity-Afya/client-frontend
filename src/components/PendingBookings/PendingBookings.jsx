import { useState, useEffect} from 'react'
import { Card, CardContent} from '@mui/material';


const PendingBookings = () => {
  const [ pendingBookings, setPendingBookings ] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    //Fetching pending bookings from the backend
    const fetchPendingBookings = async () => {
      try{
       const response = await fetch('backend_endpoint_to_fetch_pending_b00kings');
       if (response.ok) {
         const data = await response.json();
         setPendingBookings(data);  //update state with the fetched pending bookings
       } else{
         console.error('Failed to fetch pending bookings');
       }
      } catch (error) {
      console.error('Error fetching pending bookings:', error);
    }
  };

  fetchPendingBookings();
}, []);

  useEffect(() => {

    //Function to update current date every second
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    
    return() => clearInterval(interval); //Clear the interval when the componemt unmounts
  }, []);  //empty dependency array to ensure this effect runs only once when component mounts


  return (
    <div style={{display: "flex", flexDirection: "column", alignItems:"center"}}>
      <div  style={{display: "flex", flexDirection: "row", alignItems:"center"}}>
        <h2 style={{ color: "#c00100", }}>Pending Bookings</h2>
        <p style={{color: '#c00100', fontWeight: "bold", fontSize: "25px", paddingLeft: "20VW"}}>{currentDate.toLocaleString()}</p>
      </div>
    
      <Card style={{ width: "90%", backgroundColor: "#E6F0F8", boxShadow: "0px 0px 1vw 0px rgba(0, 0, 0, 0.75)",}}>
        <CardContent>
           <table style={{ width: '100%', tableLayout: 'auto'}}>
            <thead>
              <tr>
                <th style={{color: "#c00100"}}>Patient Details</th>
                <th style={{color: "green"}}>Service</th>
                <th style={{color: "blue"}}>Mode of service delivery</th>
              </tr>
            </thead>
            <tbody>
              {pendingBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <div>
                      <p>Name: {`${booking.patientFirstName} ${booking.patientLastName}`}</p>
                      <p>Age: {booking.age}</p>
                      <p>Phone: {booking.phoneNumber}</p>
                      <p>Email: {booking.email}</p>
                      <p>Residence: {booking.residence}</p>

                    </div>
                  </td>
                  <td>{booking.service}</td>
                  <td style={{color: '#c00100'}}>{booking.modeOfServiceDelivery}</td>
                </tr>
              ))}
            </tbody>
           </table>
        </CardContent>
      </Card>
    </div>
  )
}

export default PendingBookings

