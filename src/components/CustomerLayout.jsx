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
    <div className="flex flex-col h-screen w-full overflow-hidden bg-[#f8fafc] dark:bg-[#0b1218] font-display text-slate-900 dark:text-white transition-colors duration-200 relative">
      
      {/* Sidebar Overlay - optimized for high-res screens */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-[3px] lg:hidden transition-all duration-300"
            onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Modern Compact Header */}
      <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#16212b]/95 backdrop-blur-md border-b border-slate-100 dark:border-[#223649] px-4 h-[52px] flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
            <button 
                onClick={() => setIsSidebarOpen(true)} 
                className="size-9 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full active:scale-90 transition-all"
            >
                <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
            <h1 className="font-black text-sm tracking-widest text-primary uppercase">VIPAT</h1>
        </div>
        
        <div className="flex items-center gap-1">
            <button className="relative size-9 flex items-center justify-center text-slate-500">
                <span className="material-symbols-outlined text-[22px]">notifications</span>
                {unreadNotifs > 0 && <span className="absolute top-1.5 right-1.5 size-3.5 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-[#16212b]">{unreadNotifs}</span>}
            </button>
            {user ? (
                <Link to="/profile" className="size-8 rounded-full overflow-hidden border border-primary/50 ml-1 shadow-sm">
                    <img src={user.avatar} className="w-full h-full object-cover" />
                </Link>
            ) : (
                <Link to="/login" className="px-3 py-1.5 bg-primary text-white text-[10px] font-bold rounded-full shadow-md ml-1 active:scale-95 transition-transform">เข้าสู่ระบบ</Link>
            )}
        </div>
      </header>

      {/* Edge-to-Edge Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-[70] flex flex-col w-[280px] bg-white dark:bg-[#16212b] border-r border-slate-200 dark:border-[#223649] shadow-2xl transition-transform duration-300 ease-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-slate-100 dark:border-[#223649] flex justify-between items-center bg-primary/5">
            <div>
                <h2 className="font-bold text-base">วิพัฒน์กาลจักร</h2>
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-medium mt-0.5">Hotel Guest App</p>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="size-8 flex items-center justify-center text-slate-400 hover:text-red-500"><span className="material-symbols-outlined text-[20px]">close</span></button>
        </div>
        
        <nav className="flex-1 p-3 flex flex-col gap-1 overflow-y-auto">
            {menuItems.map(item => (
                <Link 
                    key={item.path} 
                    to={item.path} 
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${location.pathname === item.path ? 'bg-primary text-white shadow-lg' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                >
                    <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                    <span className="font-bold text-sm">{item.label}</span>
                </Link>
            ))}
        </nav>

        {user && (
            <div className="p-4 bg-slate-50 dark:bg-black/20 m-3 rounded-3xl flex items-center gap-3 border border-slate-100 dark:border-[#223649]">
                <img src={user.avatar} className="size-10 rounded-full shadow-sm" />
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate">{user.name}</p>
                    <button onClick={() => { logout(); setIsSidebarOpen(false); navigate('/'); }} className="text-[10px] text-red-500 font-bold hover:underline">ออกจากระบบ</button>
                </div>
            </div>
        )}
      </aside>

      {/* Main Content with Safe Area Bottom Padding */}
      <main className="flex-1 overflow-y-auto pb-[80px] scroll-smooth bg-[#f8fafc] dark:bg-[#0d141b]">
        <Outlet />
      </main>

      {/* Optimized Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default CustomerLayout;