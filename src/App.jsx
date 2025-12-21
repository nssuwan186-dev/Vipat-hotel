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
import EditProfile from './pages/EditProfile';
import PaymentMethods from './pages/PaymentMethods';
import HotelReviews from './pages/HotelReviews';
import Login from './pages/Login';
import Register from './pages/Register';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import ManageRooms from './pages/ManageRooms';
import ManageFinances from './pages/ManageFinances';
import DailyReport from './pages/DailyReport';
import AdminSettings from './pages/AdminSettings';
import AdminNotifications from './pages/AdminNotifications';

const ProtectedRoute = ({ children, role, allowedRoles }) => {
  const { user } = useHotel();
  if (!user) return <Navigate to="/login" />;

  // Create list of allowed roles. If both props are missing, allow all authenticated users.
  const authorizedRoles = allowedRoles || (role ? [role] : []);

  if (authorizedRoles.length > 0 && !authorizedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
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
            <Route path="/profile/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
            <Route path="/profile/payment" element={<ProtectedRoute><PaymentMethods /></ProtectedRoute>} />
            <Route path="/profile/reviews" element={<HotelReviews />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book/:roomId" element={<BookingForm />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
          </Route>

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Application */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin', 'monitor']}><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="rooms" element={<ManageRooms />} />
            <Route path="finances" element={<ProtectedRoute role="admin"><ManageFinances /></ProtectedRoute>} />
            <Route path="reports" element={<DailyReport />} />
            <Route path="promotions" element={<Promotions />} />
            <Route path="settings" element={<ProtectedRoute role="admin"><AdminSettings /></ProtectedRoute>} />
            <Route path="notifications" element={<AdminNotifications />} />
          </Route>
        </Routes>
      </Router>
    </HotelProvider>
  );
}

export default App;
