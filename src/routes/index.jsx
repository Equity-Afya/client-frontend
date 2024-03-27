import React from "react";
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
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import PasswordReset from "../components/PasswordReset/passwordReset";
import AppointmentStatusPage from "../pages/AppointmentStatusPage";
import OtpPasswordPage from "../pages/OtpPasswordPage";
import CompleteAppointmentPage from "../pages/CompleteAppointmentPage";
import NotFoundPage from "../pages/NotFoundPage";
import ViewProfilePage from "../pages/ViewProfilePage"
import LanguagePage from "../pages/languagePage"


function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/medical-services" element={<MedicalServicesPage />} />
        <Route path="/specialists" element={<SpecialistsPage />} />
        <Route path="/health-records" element={<MyHealthRecordsPage />} />
        <Route path="/appointments" element={<MyAppointmentsPage />} />
        <Route path="/teleclinics" element={<TeleclinicsPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/customer-care" element={<CustomerCarePage />} />
        <Route path="/other-services" element={<OtherServicesPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/modern-lab" element={<ModernLabPage />} />
        <Route path="/appointment-status" element={<AppointmentStatusPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/otp-password" element={<OtpPasswordPage />} />
        <Route path="/book-appointment" element={<BookAppointmentPage />} />
        <Route path="/complete-booking" element={<CompleteAppointmentPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/view-profile" element={<ViewProfilePage />} />
        <Route path="/language" element={<LanguagePage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
