import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { label: 'แดชบอร์ด', icon: 'analytics', path: '/' },
    { label: 'ปฏิทินการจอง', icon: 'calendar_month', path: '/calendar' },
    { label: 'จัดการห้องพัก', icon: 'bed', path: '/rooms' },
    { label: 'จัดการการเงิน', icon: 'payments', path: '/finances' },
    { label: 'ประวัติลูกค้า', icon: 'person_search', path: '/guests' },
    { label: 'รายงานรายวัน', icon: 'description', path: '/reports' },
    { label: 'โปรโมชั่น', icon: 'campaign', path: '/promotions' },
    { label: 'บันทึกการใช้งาน', icon: 'history', path: '/logs' },
    { label: 'การแจ้งเตือน', icon: 'notifications_active', path: '/notifications' },
    { label: 'ตั้งค่าระบบ', icon: 'settings', path: '/settings' },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col w-72 bg-white dark:bg-[#16212b] border-r border-slate-200 dark:border-[#223649] transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-slate-200 dark:border-[#223649] flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Vipat Hotel</h1>
            <p className="text-xs text-slate-500 dark:text-[#90adcb]">Management System <span className="text-primary font-bold ml-1">v2.0 (Final)</span></p>
          </div>
          <button className="lg:hidden text-slate-900 dark:text-white" onClick={() => setIsSidebarOpen(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
          {menuItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path} 
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === item.path ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'}`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="flex lg:hidden items-center p-4 border-b border-slate-200 dark:border-[#223649] bg-white dark:bg-[#16212b]">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-900 dark:text-white"><span className="material-symbols-outlined">menu</span></button>
          <h2 className="ml-2 font-bold text-lg text-slate-900 dark:text-white">ระบบจัดการโรงแรม</h2>
        </header>
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;