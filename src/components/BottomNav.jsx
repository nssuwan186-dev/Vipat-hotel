import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'หน้าแรก', icon: 'home', path: '/' },
    { label: 'จองห้องพัก', icon: 'calendar_month', path: '/booking' },
    { label: 'ประวัติการจอง', icon: 'history', path: '/my-bookings' },
    { label: 'โปรไฟล์', icon: 'person', path: '/profile' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#16212b] border-t border-slate-200 dark:border-[#223649] z-50 flex justify-around items-center h-16 px-2">
      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${
            location.pathname === item.path ? 'text-primary' : 'text-slate-400'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
          <span className="text-[10px] font-bold">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
