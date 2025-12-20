import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { HotelProvider } from './context/HotelContext';
import GuestHome from './pages/GuestHome';
import AdminDashboard from './pages/AdminDashboard';
import DailyReport from './pages/DailyReport';
import BookingForm from './pages/BookingForm';
import BookingSuccess from './pages/BookingSuccess';
import Login from './pages/Login';
import Register from './pages/Register';
import MyBookings from './pages/MyBookings';
import ManageRooms from './pages/ManageRooms';
import ManageFinances from './pages/ManageFinances';
import UserProfile from './pages/UserProfile';
import ManagePromotions from './pages/ManagePromotions';
import AdminSettings from './pages/AdminSettings';

function App() {
  return (
    <HotelProvider>
      <Router>
        <Routes>
          <Route path="/" element={<GuestHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/rooms" element={<ManageRooms />} />
          <Route path="/admin/finances" element={<ManageFinances />} />
          <Route path="/admin/promotions" element={<ManagePromotions />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/reports" element={<DailyReport />} />
          <Route path="/book/:roomId" element={<BookingForm />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
        </Routes>
        <SpeedInsights />
      </Router>
    </HotelProvider>
  );
}

export default App;
