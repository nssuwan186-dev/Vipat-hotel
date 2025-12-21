import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';
import BottomNav from './BottomNav';

const CustomerLayout = () => {
  const { user, logout, notifications } = useHotel();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.read).length;

  const menuItems = [
    { label: 'หน้าแรก', icon: 'home', path: '/' },
    { label: 'จองห้องพัก', icon: 'calendar_month', path: '/booking' },
    { label: 'การจองของฉัน', icon: 'history', path: '/my-bookings' },
    { label: 'โปรโมชั่น', icon: 'campaign', path: '/promotions' },
    { label: 'โปรไฟล์', icon: 'person', path: '/profile' },
    { label: 'ติดต่อเรา', icon: 'info', path: '/contact' },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc] dark:bg-[#0b1218] font-display text-slate-900 dark:text-white antialiased relative transition-colors duration-300">
      
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-[4px] lg:hidden transition-all duration-300"
            onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Navigation - Always visible on large screens, Drawer on mobile */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-[70] flex flex-col w-[280px] bg-white dark:bg-[#16212b] border-r border-slate-200 dark:border-[#223649] shadow-2xl lg:shadow-none transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-slate-100 dark:border-[#223649] flex justify-between items-center bg-primary/5">
            <div className="flex items-center gap-3">
                <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined text-[24px]">hotel</span>
                </div>
                <div>
                    <h2 className="font-black text-sm tracking-tighter">VIPATKANJAK</h2>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Hotel Guest App</p>
                </div>
            </div>
            <button className="lg:hidden text-slate-400" onClick={() => setIsSidebarOpen(false)}>
                <span className="material-symbols-outlined">close</span>
            </button>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-1.5 overflow-y-auto">
            <p className="px-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-2">เมนูหลัก</p>
            {menuItems.map(item => (
                <Link 
                    key={item.path} 
                    to={item.path} 
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 ${location.pathname === item.path ? 'bg-primary text-white shadow-xl shadow-primary/30 scale-[1.02]' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                >
                    <span className={`material-symbols-outlined text-[24px] ${location.pathname === item.path ? 'icon-fill' : ''}`}>{item.icon}</span>
                    <span className="font-bold text-sm">{item.label}</span>
                </Link>
            ))}
        </nav>

        {user ? (
            <div className="p-4 bg-slate-50 dark:bg-black/20 m-4 rounded-[2rem] flex items-center gap-3 border border-slate-100 dark:border-[#223649] shadow-sm">
                <img src={user.avatar} className="size-10 rounded-full border-2 border-primary shadow-sm" />
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-black truncate">{user.name}</p>
                    <button onClick={() => { logout(); navigate('/'); }} className="text-[10px] text-red-500 font-bold hover:underline">ออกจากระบบ</button>
                </div>
            </div>
        ) : (
            <div className="p-4 m-4">
                <Link to="/login" className="flex items-center justify-center w-full py-3.5 bg-primary text-white font-black text-sm rounded-2xl shadow-xl shadow-primary/25 hover:brightness-110 transition-all active:scale-95">
                    เข้าสู่ระบบ
                </Link>
            </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#f8fafc] dark:bg-[#0d141b] relative">
        
        {/* Compact Header for Mobile only */}
        <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#16212b]/95 backdrop-blur-md border-b border-slate-100 dark:border-[#223649] px-4 h-14 flex items-center justify-between shrink-0 lg:hidden shadow-sm">
          <div className="flex items-center gap-3">
            <button 
                onClick={() => setIsSidebarOpen(true)} 
                className="size-10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-all active:scale-90"
            >
              <span className="material-symbols-outlined text-[28px]">menu</span>
            </button>
            <h1 className="font-black text-base tracking-tighter text-primary">VIPATKANJAK</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="relative size-10 flex items-center justify-center text-slate-500">
                <span className="material-symbols-outlined text-[24px]">notifications</span>
                {unreadNotifs > 0 && <span className="absolute top-2 right-2 size-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-[#16212b]">{unreadNotifs}</span>}
            </button>
            {user && (
                <Link to="/profile" className="size-9 rounded-full overflow-hidden border-2 border-primary shadow-sm">
                    <img src={user.avatar} className="w-full h-full object-cover" />
                </Link>
            )}
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto pb-20 scroll-smooth">
            <Outlet />
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </main>
    </div>
  );
};

export default CustomerLayout;
