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
    <div className="flex flex-col h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white transition-colors duration-300 relative">
      
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm lg:hidden transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Header Bar */}
      <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-[#16212b]/80 backdrop-blur-md border-b border-slate-200 dark:border-[#223649] px-4 h-16 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full">
                <span className="material-symbols-outlined text-[28px]">menu</span>
            </button>
            <h1 className="font-black text-xl tracking-tighter">VIPATKANJAK</h1>
        </div>
        
        <div className="flex items-center gap-2">
            <button className="relative p-2 text-slate-500">
                <span className="material-symbols-outlined text-[24px]">notifications</span>
                {unreadNotifs > 0 && <span className="absolute top-1.5 right-1.5 size-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-[#16212b]">{unreadNotifs}</span>}
            </button>
            {user ? (
                <Link to="/profile" className="size-9 rounded-full overflow-hidden border-2 border-primary">
                    <img src={user.avatar} className="w-full h-full object-cover" />
                </Link>
            ) : (
                <Link to="/login" className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-full shadow-lg shadow-primary/20">เข้าสู่ระบบ</Link>
            )}
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col w-72 bg-white dark:bg-[#16212b] border-r border-slate-200 dark:border-[#223649] transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-slate-100 dark:border-[#223649] flex justify-between items-center bg-primary/5">
            <div>
                <h2 className="font-bold text-lg">โรงแรมวิพัฒน์กาลจักร</h2>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">ยินดีต้อนรับ</p>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400 hover:text-red-500 transition-colors"><span className="material-symbols-outlined">close</span></button>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
            {menuItems.map(item => (
                <Link 
                    key={item.path} 
                    to={item.path} 
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${location.pathname === item.path ? 'bg-primary text-white shadow-xl shadow-primary/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                >
                    <span className="material-symbols-outlined">{item.icon}</span>
                    <span className="font-bold text-sm">{item.label}</span>
                </Link>
            ))}
        </nav>

        {user && (
            <div className="p-4 bg-slate-50 dark:bg-black/20 m-4 rounded-3xl flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <img src={user.avatar} className="size-10 rounded-full" />
                    <div>
                        <p className="text-xs font-bold">{user.name}</p>
                        <p className="text-[10px] text-slate-500">Member</p>
                    </div>
                </div>
                <button onClick={() => { logout(); setIsSidebarOpen(false); navigate('/'); }} className="w-full py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-xs font-bold hover:bg-red-200 transition-all">ออกจากระบบ</button>
            </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 scroll-smooth">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default CustomerLayout;