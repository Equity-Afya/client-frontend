import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import VerifyOTPPage from "../pages/VerifyOTPPage";
import DashboardPage from "../pages/DashboardPage";
import RegisterPage from "../pages/RegisterPage";
import MedicalServicesPage from "../pages/MedicalServicesPage";
import SpecialistsPage from "../pages/SpecialistsPage";
import MyHealthRecordsPage from "../pages/MyhealthRecordsPage";
import MyAppointmentsPage from "../pages/MyAppoitmentsPage";
import PaymentsPage from "../pages/PaymentsPage";
import CustomerCarePage from "../pages/CustomerCarePage";
import TeleclinicsPage from "../pages/TeleclinicsPage";
import OtherServicesPage from "../pages/OtherServicesPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import BookAppointmentPage from "../pages/BookAppointmentPage";
import ModernLabPage from "../pages/ModernLabPage";
import OtpPasswordPage from "../pages/OtpPasswordPage"
import CompleteAppointment from "../components/Booking/CompleteBooking";
import CompleteAppointmentPage from "../pages/CompleteAppointmentPage";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}replace />
        <Route path="/login" element={<LoginPage />}replace />
        <Route path="/register" element={<RegisterPage />}replace />
        <Route path="/reset-password" element={<ResetPasswordPage />} replace/>
        <Route path="/verify-otp" element={<VerifyOTPPage />}replace />
        <Route path="/dashboard" element={<DashboardPage />}replace />
        <Route path="/medical-services" element={<MedicalServicesPage />}replace />
        <Route path="/specialists" element={<SpecialistsPage />}replace />
        <Route path="/health-records" element={<MyHealthRecordsPage />} replace/>
        <Route path="/appointments" element={<MyAppointmentsPage />}replace />
        <Route path="/teleclinics" element={<TeleclinicsPage />}replace />
        <Route path="/payments" element={<PaymentsPage />}replace />
        <Route path="/customer-care" element={<CustomerCarePage />} replace/>
        <Route path="/other-services" element={<OtherServicesPage />}replace />
        <Route path="/customer-care" element={< CustomerCarePage />}replace />
        <Route path="/other-services" element={< OtherServicesPage />}replace />
        <Route path="/forgot-password" element={<ForgotPasswordPage />}replace />
        <Route path="/modern-lab" element={<ModernLabPage />} replace/>
        <Route path="/otp-password" element={<OtpPasswordPage />} replace/>
        <Route path="/book-appointment" element={<BookAppointmentPage />}replace />
        <Route path="/modern-lab" element={<ModernLabPage />}replace />
        <Route path="/complete-booking" element={<CompleteAppointmentPage />}replace />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
