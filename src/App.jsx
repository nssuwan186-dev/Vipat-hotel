import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HotelProvider, useHotel } from './context/HotelContext';

// Layouts
import CustomerLayout from './components/CustomerLayout';
import AdminLayout from './components/AdminLayout';

// Guest Pages
import GuestHome from './pages/GuestHome';
import BookingForm from './pages/BookingForm';
import BookingSuccess from './pages/BookingSuccess';
import MyBookings from './pages/MyBookings';
import UserProfile from './pages/UserProfile';
import Promotions from './pages/Promotions';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import ManageRooms from './pages/ManageRooms';
import ManageFinances from './pages/ManageFinances';
import DailyReport from './pages/DailyReport';
import AdminSettings from './pages/AdminSettings';
import AdminNotifications from './pages/AdminNotifications';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useHotel();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <HotelProvider>
      <Router>
        <Routes>
          {/* Customer Application */}
          <Route element={<CustomerLayout />}>
            <Route path="/" element={<GuestHome />} />
            <Route path="/booking" element={<GuestHome />} />
            <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book/:roomId" element={<BookingForm />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
          </Route>

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Application */}
          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="rooms" element={<ManageRooms />} />
            <Route path="finances" element={<ManageFinances />} />
            <Route path="reports" element={<DailyReport />} />
            <Route path="promotions" element={<Promotions />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="notifications" element={<AdminNotifications />} />
          </Route>
        </Routes>
      </Router>
    </HotelProvider>
  );
}

export default App;