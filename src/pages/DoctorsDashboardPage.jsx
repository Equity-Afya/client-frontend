import React from "react";
import DoctorsDashboard from "../components/DoctorsDashboard/DoctorsDashboard";
import DoctorsSideBar from "../components/DoctorsSideBar/DoctorsSidebar";
import YourAppointments from "../components/DoctorsDashboard/YourAppointments";
import DoctorsDashboardHeader from "../components/DoctorsDashboard/DoctorsDashboardHeader";

const DoctorsDashboardPage = () => {
  return (
    <div style={{ display: "flex", marginLeft: "17vw" }}>
      <DoctorsSideBar />
      <div>
        <div>
          <DoctorsDashboardHeader />
        </div>
        <div style={{ display: "flex", flexDirection: "row"}}>
          <div>
            <DoctorsDashboard />
          </div>
          <div style={{ width: "25vw", marginLeft: "0" }}>
            <YourAppointments />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsDashboardPage;
