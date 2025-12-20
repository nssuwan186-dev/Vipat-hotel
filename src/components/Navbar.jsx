import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';

const Navbar = () => {
  const { user, logout } = useHotel();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-border-dark bg-[#101a23]/90 backdrop-blur-md px-4 py-3 lg:px-10">
      <div className="flex items-center gap-4 text-white">
        <div className="size-8 flex items-center justify-center rounded-lg bg-primary/20 text-primary">
          <span className="material-symbols-outlined">hotel</span>
        </div>
        <Link to="/" className="text-white text-lg font-bold leading-tight tracking-tight hidden sm:block">
          โรงแรมวิพัฒน์กาลจักร
        </Link>
      </div>
      <div className="flex flex-1 justify-end gap-4 lg:gap-8 items-center">
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-white text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">home</span> หน้าหลัก
          </Link>
          <Link to="/reports" className="text-text-secondary text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">assessment</span> Reports
          </Link>
          <a href="#rooms" className="text-text-secondary text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">king_bed</span> Rooms
          </a>
          {user && (
            <Link to="/my-bookings" className="text-text-secondary text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">history</span> My Bookings
            </Link>
          )}
        </nav>
        <div className="flex gap-2 items-center">
          <button 
            onClick={() => document.documentElement.classList.toggle('dark')}
            className="p-2 text-text-secondary hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">contrast</span>
          </button>
          
          {user ? (
            <div className="flex items-center gap-3 pl-2">
               <Link to="/profile" className="w-8 h-8 rounded-full overflow-hidden border border-primary hover:opacity-80 transition-opacity">
                 <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
               </Link>
               <button onClick={logout} className="text-sm text-text-secondary hover:text-red-400">Logout</button>
            </div>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="flex items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
            >
              <span className="truncate">Guest Login</span>
            </button>
          )}
          
          <Link to="/admin" className="hidden lg:flex items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-surface-dark border border-border-dark text-text-secondary hover:text-white text-sm font-bold transition-all">
            <span className="material-symbols-outlined mr-2 text-[18px]">admin_panel_settings</span>
            Admin Portal
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
