import React from "react";
import DoctorsDashboard from "../components/DoctorsDashboard/DoctorsDashboard";
import DoctorsSideBar from "../components/DoctorsSideBar/DoctorsSidebar";

const DoctorsDashboardPage = () => {
  return (
    <div style={{ display: "flex" }}>
      <DoctorsSideBar />
      <div style={{ paddingLeft: "19%" }}>
        <DoctorsDashboard />
      </div>
    </div>
  );
};

export default DoctorsDashboardPage;
