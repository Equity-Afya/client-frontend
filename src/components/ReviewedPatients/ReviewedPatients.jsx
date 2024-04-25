import React, { useState, useEffect } from "react";
import Calendar from "react-calendar"; // Import the Calendar component
import "react-calendar/dist/Calendar.css"; // Import default Calendar styles

function ReviewedPatients() {
  const [patients, setPatients] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);

  useEffect(() => {
    // Fetch list of patients and table headers from backend when the component mounts
    fetchPatients();
    fetchTableHeaders();
  }, []);

  const fetchPatients = () => {
    // Replace the URL with the actual endpoint to fetch patients from the backend
    fetch("patientsEndpoint")
      .then((response) => response.json())
      .then((data) => setPatients(data))
      .catch((error) => console.error("Error fetching patients:", error));
  };

  const fetchTableHeaders = () => {
    // Replace the URL with the actual endpoint to fetch table headers from the backend
    fetch("tableHeadersEndpoint")
      .then((response) => response.json())
      .then((data) => setTableHeaders(data))
      .catch((error) => console.error("Error fetching table headers:", error));
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#cff",
          borderRadius: "2vw",
          boxShadow: "0px 0px 2vw 0px rgba(0, 0, 0, 0.75)",
          margin: "1vw",
          padding: "2vw",
        }}
      >
        <h3 style={{ marginBottom: "2vw" }}>Reviewed patients</h3>
        <table style={{ width: "100%" }}>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                {tableHeaders.map((header) => (
                  <td key={header}>{patient[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: "2vw",
          boxShadow: "0px 0px 2vw 0px rgba(0, 0, 0, 0.75)",
          margin: "1vw",
          padding: "2vw",
          width: "20vw",
          height: "auto",
        }}
      >
        <h3
          style={{
            marginBottom: "1vw",
            backgroundColor: "#c00100",
            color: "#fff",
            width: "100%",
            textAlign: "center",
            padding: "1vh",
            borderRadius: "2vw",
          }}
        >
          Calendar
        </h3>
        <Calendar /> {/* Add the Calendar component here */}
      </div>
    </div>
  );
}

export default ReviewedPatients;
