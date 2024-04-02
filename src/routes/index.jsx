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
import PaymentsPage from "../pages/PaymentsPage";
import CustomerCarePage from "../pages/CustomerCarePage";
import TeleclinicsPage from "../pages/TeleclinicsPage";
import OtherServicesPage from "../pages/OtherServicesPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ModernLabPage from "../pages/ModernLabPage";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import PasswordReset from "../components/PasswordReset/passwordReset";
import AppointmentStatusPage from "../pages/AppointmentStatusPage";
import OtpPasswordPage from "../pages/OtpPasswordPage";
import NotFoundPage from "../pages/NotFoundPage";
import ViewProfilePage from "../pages/ViewProfilePage"
import LanguagePage from "../pages/languagePage"
//import ProfilePage from "../pages/ProfilePage";
import BookAppointmentPage from "../pages/BookAppointmentPage";
import SubmitAppointmentPage from "../pages/SubmitAppointmentPage";
import AppointmentsHistory from "../pages/AppointmentsHistory";
import DentalPage from "../pages/DentalPage"
import EpharmacyDashboardPage from "../pages/EpharmacyDashboardPage";
import EpharmacyLandingPage from "../pages/EpharmacyLandingPage";
import ProductsPage from "../pages/ProductsPage";
import PrescriptionsPage from "../pages/PrescriptionsPage";
import CartPage from "../pages/CartPage";
import MyOrdersPage from "../pages/MyOrdersPage";




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
        <Route path="/submit-appointment" element={<SubmitAppointmentPage />} />
        <Route path="/appointments-history" element={<AppointmentsHistory />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/e-pharmacy" element={<EpharmacyDashboardPage />}/>
        <Route path="/e-pharmacy" element={<EpharmacyLandingPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/prescriptions" element={<PrescriptionsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/my-orders" element={<MyOrdersPage />} />
        <Route path="/view-profile" element={<ViewProfilePage />} />
        <Route path="/language" element={<LanguagePage />} />
        <Route path="/dental" element={<DentalPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;

