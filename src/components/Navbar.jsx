import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';

const Navbar = () => {
  const { user, logout } = useHotel();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-border-dark bg-white/80 dark:bg-[#101a23]/80 backdrop-blur-md px-4 py-3 lg:px-10">
      <div className="flex items-center gap-4 text-slate-900 dark:text-white">
        <div className="size-8 flex items-center justify-center rounded-lg bg-primary/20 text-primary">
          <span className="material-symbols-outlined">hotel</span>
        </div>
        <Link to="/" className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight hidden sm:block">
          โรงแรมวิพัฒน์กาลจักร
        </Link>
      </div>
      <div className="flex flex-1 justify-end gap-4 lg:gap-8 items-center">
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-slate-900 dark:text-white text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">home</span> หน้าแรก
          </Link>
          <Link to="/reports" className="text-slate-500 dark:text-text-secondary text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">assessment</span> รายงาน
          </Link>
          <a href="#rooms" className="text-slate-500 dark:text-text-secondary text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">king_bed</span> ห้องพัก
          </a>
          {user && (
            <Link to="/my-bookings" className="text-slate-500 dark:text-text-secondary text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">history</span> การจองของฉัน
            </Link>
          )}
        </nav>
        <div className="flex gap-2 items-center">
          {user ? (
            <div className="flex items-center gap-3 pl-2">
               <Link to="/profile" className="w-8 h-8 rounded-full overflow-hidden border border-primary hover:opacity-80 transition-opacity">
                 <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
               </Link>
               <button onClick={logout} className="text-sm text-slate-500 dark:text-text-secondary hover:text-red-400">ออกจากระบบ</button>
            </div>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="flex items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-primary text-slate-900 dark:text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
            >
              <span className="truncate">เข้าสู่ระบบ</span>
            </button>
          )}
          
          <Link to="/admin" className="hidden lg:flex items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-border-dark text-slate-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-white text-sm font-bold transition-all">
            <span className="material-symbols-outlined mr-2 text-[18px]">admin_panel_settings</span>
            ระบบจัดการ
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;