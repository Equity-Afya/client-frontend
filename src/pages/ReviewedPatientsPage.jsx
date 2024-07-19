import React from "react";
import ReviewedPatients from "../components/ReviewedPatients/ReviewedPatients.jsx";
import DoctorsSideBar from "../components/DoctorsSideBar/DoctorsSidebar.jsx";

const ReviewedPatientsPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#fff",
      }}
    >
      <div>
        <DoctorsSideBar />
      </div>
      <div style={{ marginLeft: "18vw", width: "80vw" }}>
        <ReviewedPatients />
      </div>
    </div>
  );
};

export default ReviewedPatientsPage;
