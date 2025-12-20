import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useHotel } from '../context/HotelContext';

const UserProfile = () => {
  const { user, logout } = useHotel();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { icon: 'person', title: 'Edit Profile', desc: 'Manage your personal information', link: '/coming-soon' },
    { icon: 'credit_card', title: 'Payment Methods', desc: 'Add or remove cards', link: '/coming-soon' },
    { icon: 'star', title: 'Ratings & Reviews', desc: 'Share your experience', link: '/coming-soon' },
    { icon: 'pool', title: 'Hotel Amenities', desc: 'View what we offer', link: '/coming-soon' },
    { icon: 'info', title: 'About Us', desc: 'Our story and contact info', link: '/coming-soon' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display">
      <Navbar />
      
      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="mx-auto max-w-2xl flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-surface-dark shadow-lg">
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{user.name}</h1>
                <p className="text-slate-500 dark:text-gray-400">{user.email}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-border-dark overflow-hidden">
             {menuItems.map((item, idx) => (
                <a key={idx} href={item.link} className="flex items-center gap-4 p-4 border-b border-slate-100 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors last:border-0">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-gray-700 flex items-center justify-center text-slate-600 dark:text-gray-300">
                        <span className="material-symbols-outlined">{item.icon}</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-slate-900 dark:text-white">{item.title}</h3>
                        <p className="text-xs text-slate-500 dark:text-gray-400">{item.desc}</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                </a>
             ))}
             <button onClick={handleLogout} className="w-full flex items-center gap-4 p-4 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-left group">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                    <span className="material-symbols-outlined">logout</span>
                </div>
                <div>
                    <h3 className="font-bold text-red-600 dark:text-red-400 group-hover:text-red-700">Log Out</h3>
                    <p className="text-xs text-red-400 dark:text-red-500/70">Sign out of your account</p>
                </div>
             </button>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfile;
