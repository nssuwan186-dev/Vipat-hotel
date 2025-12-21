import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';

const AdminLayout = () => {
  const { user, logout } = useHotel();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const allMenuItems = [
    { label: 'แดชบอร์ด', icon: 'analytics', path: '/admin', allowedRoles: ['admin', 'monitor'] },
    { label: 'จัดการห้องพัก', icon: 'bed', path: '/admin/rooms', allowedRoles: ['admin', 'monitor'] },
    { label: 'จัดการการเงิน', icon: 'payments', path: '/admin/finances', allowedRoles: ['admin'] },
    { label: 'รายงานรายวัน', icon: 'description', path: '/admin/reports', allowedRoles: ['admin', 'monitor'] },
    { label: 'โปรโมชั่น', icon: 'campaign', path: '/admin/promotions', allowedRoles: ['admin', 'monitor'] },
    { label: 'การแจ้งเตือน', icon: 'notifications_active', path: '/admin/notifications', allowedRoles: ['admin', 'monitor'] },
    { label: 'ตั้งค่าระบบ', icon: 'settings', path: '/admin/settings', allowedRoles: ['admin'] },
  ];

  const menuItems = allMenuItems.filter(item => item.allowedRoles.includes(user?.role));

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-dark font-display text-white">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col w-72 bg-[#16212b] border-r border-[#223649] transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-[#223649] flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <p className="text-xs text-[#90adcb]">Vipatkanjak Hotel</p>
          </div>
          <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === item.path ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:bg-white/5'}`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-[#223649] flex items-center gap-3">
          <img src={user?.avatar} className="size-10 rounded-full" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate">{user?.name}</p>
            <p className="text-[10px] text-[#90adcb]">Administrator</p>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} className="text-slate-400 hover:text-red-400"><span className="material-symbols-outlined">logout</span></button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="flex lg:hidden items-center p-4 border-b border-[#223649] bg-[#16212b]">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2"><span className="material-symbols-outlined">menu</span></button>
          <h2 className="ml-2 font-bold text-lg">ระบบจัดการแอดมิน</h2>
        </header>
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
