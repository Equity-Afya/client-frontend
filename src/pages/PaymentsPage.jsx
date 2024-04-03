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
      <div style={{ marginLeft: "100px" }}>
        <PaymentDetails />
      </div>
    </div>
  );
};

export default PaymentsPage;
