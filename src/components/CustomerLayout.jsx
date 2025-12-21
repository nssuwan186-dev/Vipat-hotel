import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';
import BottomNav from './BottomNav';

const CustomerLayout = () => {
  const { user, logout } = useHotel();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { label: 'หน้าแรก', icon: 'home', path: '/' },
    { label: 'จองห้องพัก', icon: 'calendar_month', path: '/booking' },
    { label: 'ประวัติการจอง', icon: 'history', path: '/my-bookings' },
    { label: 'โปรโมชั่น', icon: 'campaign', path: '/promotions' },
    { label: 'โปรไฟล์', icon: 'person', path: '/profile' },
    { label: 'ติดต่อเรา', icon: 'info', path: '/contact' },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f1f5f9] dark:bg-[#05090c] font-display text-slate-900 dark:text-white transition-all duration-200">
      
      {/* 1. Sidebar Drawer */}
      <aside className={`fixed inset-y-0 left-0 z-[100] flex flex-col w-[260px] bg-white dark:bg-[#111827] border-r border-slate-200 dark:border-slate-800 shadow-2xl transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-primary/10">
            <h2 className="font-black text-sm text-primary tracking-tighter uppercase">เมนูบริการ</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="p-1 rounded-full bg-white/50 dark:bg-black/20"><span className="material-symbols-outlined text-[20px]">close</span></button>
        </div>
        <nav className="flex-1 p-2 flex flex-col gap-1">
            {menuItems.map(item => (
                <Link key={item.path} to={item.path} onClick={() => setIsSidebarOpen(false)} className={`flex items-center gap-4 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${location.pathname === item.path ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5'}`}>
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span> {item.label}
                </Link>
            ))}
        </nav>
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 font-bold text-center italic">VERSION 3.0.1 (MOBILE)</div>
      </aside>

      {/* 2. Main Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Compact Header */}
        <header className="h-[50px] bg-white/90 dark:bg-[#111827]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-3 shrink-0 z-50">
            <div className="flex items-center gap-2">
                <button onClick={() => setIsSidebarOpen(true)} className="size-9 flex items-center justify-center bg-primary/10 text-primary rounded-xl active:scale-90 transition-all shadow-sm border border-primary/20">
                    <span className="material-symbols-outlined text-[22px]">menu</span>
                </button>
                <h1 className="font-black text-sm text-primary tracking-tighter">VIPATKANJAK</h1>
            </div>
            {user ? (
                <Link to="/profile" className="size-8 rounded-full border-2 border-primary overflow-hidden shadow-sm">
                    <img src={user.avatar} className="w-full h-full object-cover" />
                </Link>
            ) : (
                <Link to="/login" className="text-[10px] font-black text-primary border-2 border-primary px-3 py-1 rounded-full active:scale-95 transition-all">เข้าสู่ระบบ</Link>
            )}
        </header>

        {/* Content View */}
        <main className="flex-1 overflow-y-auto pb-[70px] bg-slate-50 dark:bg-[#05090c] relative">
            <Outlet />
            {/* Version Marker for verification */}
            <div className="fixed bottom-[75px] right-2 z-[99] bg-black/50 text-white text-[8px] px-2 py-0.5 rounded-full pointer-events-none">V3.0 UPDATED</div>
        </main>

        <BottomNav />
      </div>

      {/* Overlay */}
      {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[90] lg:hidden"></div>}
    </div>
  );
};

export default CustomerLayout;