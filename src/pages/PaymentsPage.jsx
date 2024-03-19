import Payments from "../components/Payments/Payments";
import Sidebar from "../components/SideBar/SideBar";
import PaymentDetails from "../components/Payments/PaymentDetails";

const PaymentsPage = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh", // Minimum height of the viewport
      }}
    >
      <div style={{ marginRight: "0" }}>
        <Sidebar />
      </div>
      <div style={{ width: "350px", marginLeft: "100px", marginTop: "25px" }}>
        <PaymentDetails />
      </div>
      <div style={{ marginLeft: "150px" }}>
        <Payments />
      </div>
    </div>
  );
};

export default PaymentsPage;
