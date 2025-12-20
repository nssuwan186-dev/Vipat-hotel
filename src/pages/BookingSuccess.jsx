import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BookingSuccess = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/30 animate-bounce">
          <span className="material-symbols-outlined text-4xl text-white">check</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Booking Confirmed!</h1>
        <p className="text-slate-500 dark:text-text-secondary max-w-md mb-8">
          Thank you for choosing Vipatkanjak Hotel. Your reservation has been successfully placed. We look forward to welcoming you.
        </p>
        <div className="flex gap-4">
            <Link to="/" className="px-6 py-3 rounded-xl bg-surface-dark border border-border-dark text-white font-bold hover:bg-gray-800 transition-colors">
                Back to Home
            </Link>
            <Link to="/reports" className="px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-blue-600 transition-colors">
                View Reports (Admin)
            </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingSuccess;
