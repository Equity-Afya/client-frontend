import Sidebar from "../components/SideBar/SideBar";
import Teleclinics from "../components/Teleclinics/Teleclinics";
import SearchBar from "../components/SearchBar/SearchBar";
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
        <Teleclinics />
      </div>
    </div>
  );
};

export default TeleclinicPage;
