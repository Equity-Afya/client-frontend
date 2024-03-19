import Sidebar from "../components/SideBar/SideBar";
import TeleclinicsCard from "../components/Teleclinics/Teleclinics";

const TeleclinicPage = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div
        style={{
          height: "100vh",
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TeleclinicsCard />
      </div>
    </div>
  );
};

export default TeleclinicPage;
