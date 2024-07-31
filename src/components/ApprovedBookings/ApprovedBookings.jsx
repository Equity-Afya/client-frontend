import React, { useState, useEffect } from "react";
import './ApprovedBookings.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardMedia } from "@mui/material";
import Typography from '@mui/material/Typography';
import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import VideoCallIcon from '@mui/icons-material/VideoCall';

const ContactInfo = ({ IconComponent, contact }) => (
  <div className="contact-info">
    <IconComponent style={{ color: 'green', marginTop: 30 }} />
    <Typography style={{ color: '#C00100', marginTop: 30, marginLeft: 20 }}>{contact}</Typography>
  </div>
);

const InfoTable = ({ booking }) => (
  <table className="booking-info-table">
    <tbody>
      <tr>
        <th>Name</th>
        <td>{booking.name}</td>
      </tr>
      <tr>
        <th>ID No</th>
        <td>{booking.idNumber}</td>
      </tr>
      <tr>
        <th>Type of Appointment</th>
        <td>{booking.appointmentType}</td>
      </tr>
      <tr>
        <th>Date of Appointment</th>
        <td>{booking.appointmentDate}</td>
      </tr>
      <tr>
        <th>Time of Appointment</th>
        <td>{booking.appointmentTime}</td>
      </tr>
      <tr>
        <th>Meeting via</th>
        <td>{booking.meetingVia}</td>
      </tr>
      <tr>
        <th>Meeting link</th>
        <td>
          <a href={booking.meetingLink} target="_blank" rel="noopener noreferrer">
            {booking.meetingLink}
          </a>
        </td>
      </tr>
      <tr>
        <th>Passcode</th>
        <td>{booking.passcode}</td>
      </tr>
      <tr>
        <th>Phone number</th>
        <td>{booking.phoneNumber}</td>
      </tr>
      <tr>
        <th>Email address</th>
        <td>{booking.email}</td>
      </tr>
    </tbody>
  </table>
);

function ApprovedBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.88.17:5500/api/appointments/approvedbookings/D59979');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);  // Log the data to see its structure
        setBookings(result.data.slice(0, 4));  // Set only the first 4 bookings
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    fetchData();
  }, []);

  if (bookings.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="approved-bookings">
      {bookings.map((booking, index) => (
        <div key={index} className="booking-card-container">
        
          <Card className="booking-card">
            <CardContent>
              <CardMedia
                className="booking-card-media"
                component="img"
                alt="Logo"
                image={booking.imageUrl} // Use the image URL from the fetched data
                title="Logo"
              />
            </CardContent>
          </Card>
          

          <div className="booking-info">
            <InfoTable booking={booking} />

            <a className="review-patient-link" href="/patient-file">Review patient</a>

            <div className="contact-info-container">
              <ContactInfo IconComponent={CallIcon} contact={booking.phoneNumber} />
              <ContactInfo IconComponent={WhatsAppIcon} contact={booking.phoneNumber} />
              <ContactInfo IconComponent={VideoCallIcon} contact={booking.phoneNumber} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ApprovedBookings;
