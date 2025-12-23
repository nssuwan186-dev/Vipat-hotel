import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HotelProvider } from './context/HotelContext';

// Layouts
import AdminLayout from './components/AdminLayout';

// Pages
import AdminDashboard from './pages/AdminDashboard';
import ManageRooms from './pages/ManageRooms';
import ManageFinances from './pages/ManageFinances';
import DailyReport from './pages/DailyReport';
import AdminSettings from './pages/AdminSettings';
import AdminNotifications from './pages/AdminNotifications';
import ManagePromotions from './pages/ManagePromotions';
import CalendarView from './pages/CalendarView';
import Invoice from './pages/Invoice';
import Login from './pages/Login';
import ActivityLogs from './pages/ActivityLogs';
import GuestHistory from './pages/GuestHistory';
import BookingForm from './pages/BookingForm';

function App() {
  return (
    <HotelProvider>
      <Router>
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<Login />} />

          {/* Main Application Layout */}
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="rooms" element={<ManageRooms />} />
            <Route path="calendar" element={<CalendarView />} />
            <Route path="finances" element={<ManageFinances />} />
            <Route path="reports" element={<DailyReport />} />
            <Route path="guests" element={<GuestHistory />} />
            <Route path="promotions" element={<ManagePromotions />} />
            <Route path="logs" element={<ActivityLogs />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="notifications" element={<AdminNotifications />} />
            
            {/* Booking Features */}
            <Route path="book/:roomId" element={<BookingForm />} />
            <Route path="booking-success" element={<BookingSuccess />} />
          </Route>

          {/* Standalone Pages (No Layout) */}
          <Route path="/invoice/:transactionId" element={<Invoice />} />

          {/* Redirect any unknown paths to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </HotelProvider>
  );
}

export default App;
