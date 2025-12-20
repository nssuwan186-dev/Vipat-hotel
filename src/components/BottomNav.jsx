import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'หน้าแรก', icon: 'home', path: '/' },
    { label: 'จองห้อง', icon: 'calendar_month', path: '/booking' },
    { label: 'การจอง', icon: 'history', path: '/my-bookings' },
    { label: 'โปรไฟล์', icon: 'person', path: '/profile' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-[#16212b]/90 backdrop-blur-md border-t border-slate-100 dark:border-[#223649] z-50 flex justify-around items-center h-[68px] px-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-all duration-300 active:scale-90 ${
            location.pathname === item.path || (item.path === '/booking' && location.pathname.startsWith('/book'))
              ? 'text-primary' 
              : 'text-slate-400 dark:text-slate-500'
          }`}
        >
          <div className={`flex flex-col items-center gap-0.5 ${location.pathname === item.path ? 'scale-110' : ''}`}>
            <span className={`material-symbols-outlined text-[24px] ${location.pathname === item.path ? 'icon-fill' : ''}`}>
                {item.icon}
            </span>
            <span className="text-[10px] font-bold tracking-tighter">{item.label}</span>
          </div>
          {location.pathname === item.path && (
            <div className="absolute top-0 size-1 bg-primary rounded-full"></div>
          )}
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;