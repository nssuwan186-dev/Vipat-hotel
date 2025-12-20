import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';

const AdminDashboard = () => {
  const { rooms, stats, user, logout, updateRoomStatus } = useHotel();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleRoomClick = (room) => {
    const statuses = ['Available', 'Occupied', 'Cleaning', 'Maintenance'];
    const currentIndex = statuses.indexOf(room.status);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    updateRoomStatus(room.id, nextStatus);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-white dark:bg-[#16212b] border-2 border-slate-100 dark:border-[#223649] dark:hover:border-green-500 hover:border-green-500 text-slate-700 dark:text-slate-300';
      case 'Occupied': return 'bg-primary text-white shadow-lg shadow-primary/20 hover:-translate-y-1';
      case 'Cleaning': return 'bg-white dark:bg-[#16212b] border border-orange-200 dark:border-orange-500/30';
      case 'Maintenance': return 'bg-slate-100 dark:bg-[#1c2a38] border border-slate-200 dark:border-[#223649] opacity-75 cursor-not-allowed';
      default: return 'bg-white dark:bg-[#16212b]';
    }
  };

  const renderRoomCard = (room) => {
    if (room.status === 'Occupied') {
      return (
        <div key={room.id} onClick={() => handleRoomClick(room)} className="group relative flex flex-col justify-between p-4 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 cursor-pointer hover:-translate-y-1 transition-transform">
          <div className="flex justify-between items-start">
            <span className="text-2xl font-bold">{room.id}</span>
            <span className="material-symbols-outlined text-white/80">bed</span>
          </div>
          <div className="mt-4">
            <p className="text-xs text-white/70 uppercase font-semibold tracking-wide">ไม่ว่าง (Occupied)</p>
            <p className="text-sm font-medium truncate">มีผู้เข้าพัก</p>
            <p className="text-xs text-white/70 mt-1">{room.type}</p>
          </div>
        </div>
      );
    } else if (room.status === 'Available') {
      return (
        <div key={room.id} onClick={() => handleRoomClick(room)} className="group relative flex flex-col justify-between p-4 rounded-xl bg-white dark:bg-[#16212b] border-2 border-slate-100 dark:border-[#223649] dark:hover:border-green-500 hover:border-green-500 hover:shadow-md cursor-pointer transition-all">
          <div className="flex justify-between items-start">
            <span className="text-2xl font-bold text-slate-700 dark:text-slate-300">{room.id}</span>
            <span className="material-symbols-outlined text-green-500">door_open</span>
          </div>
          <div className="mt-4">
            <p className="text-xs text-green-500 uppercase font-bold tracking-wide">ว่าง (Available)</p>
            <p className="text-sm font-medium text-slate-400 dark:text-slate-600 italic">ไม่มีแขก</p>
            <p className="text-xs text-slate-400 dark:text-slate-600 mt-1">{room.type}</p>
          </div>
        </div>
      );
    } else if (room.status === 'Cleaning') {
        return (
            <div key={room.id} onClick={() => handleRoomClick(room)} className="group relative flex flex-col justify-between p-4 rounded-xl bg-white dark:bg-[#16212b] border border-orange-200 dark:border-orange-500/30 hover:shadow-md cursor-pointer transition-all">
                <div className="flex justify-between items-start">
                    <span className="text-2xl font-bold text-slate-700 dark:text-slate-300">{room.id}</span>
                    <span className="material-symbols-outlined text-orange-500 animate-pulse">cleaning_services</span>
                </div>
                <div className="mt-4">
                    <p className="text-xs text-orange-500 uppercase font-bold tracking-wide">ทำความสะอาด (Cleaning)</p>
                    <p className="text-sm font-medium text-slate-500 dark:text-[#90adcb]">แม่บ้าน</p>
                    <p className="text-xs text-slate-400 dark:text-slate-600 mt-1">{room.type}</p>
                </div>
            </div>
        );
    } else {
        return (
            <div key={room.id} onClick={() => handleRoomClick(room)} className="group relative flex flex-col justify-between p-4 rounded-xl bg-slate-100 dark:bg-[#1c2a38] border border-slate-200 dark:border-[#223649] opacity-75 cursor-not-allowed">
                <div className="flex justify-between items-start">
                    <span className="text-2xl font-bold text-slate-400">{room.id}</span>
                    <span className="material-symbols-outlined text-red-400">construction</span>
                </div>
                <div className="mt-4">
                    <p className="text-xs text-red-400 uppercase font-bold tracking-wide">ปิดซ่อม (Maintenance)</p>
                    <p className="text-sm font-medium text-slate-500">{room.type}</p>
                    <p className="text-xs text-slate-400 mt-1">งดให้บริการ</p>
                </div>
            </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased relative">
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col w-72 bg-white dark:bg-[#16212b] border-r border-slate-200 dark:border-[#223649] h-full flex-shrink-0 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200 dark:border-[#223649]">
          <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 shadow-lg" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB0ACRc8RqEjDp3XshG-atYuwNUQh62pJ31xwLtJkv1EDCUIdJm1nC-ezqRs93XP_wtHy2OKlXLX9gqfDRahABVmMlHO8gnTROlOL9o3HLUHATbJUAnKpsVsLXoONedkHpRQEwBLHxG1OEROzTRvxf454vVT_Z2oGHHIPvpqWQRATZyq4-dINVtcSp4iL7bEEbrpnz4VLEHAur92Xwq-yzA1Fple6OnTyz-VIqigaZvsWexp-PKoNPyFFT_Et0Y5JFvVHJpntBqvgay")'}}></div>
          <div className="flex flex-col overflow-hidden">
            <h1 className="text-slate-900 dark:text-white text-base font-bold leading-tight truncate">Vipatkanjak</h1>
            <p className="text-slate-500 dark:text-[#90adcb] text-xs font-medium leading-normal">Bueng Kan Hotel</p>
          </div>
          <button className="lg:hidden ml-auto text-slate-500" onClick={() => setIsSidebarOpen(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        {/* Scrollable Menu */}
        <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-6">
          {/* Section: Front Desk */}
          <div className="flex flex-col gap-1">
            <p className="px-3 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">หน้าเคาน์เตอร์</p>
            <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#223649] transition-colors group">
              <span className="material-symbols-outlined group-hover:text-primary">dashboard</span>
              <span className="text-sm font-medium">ดูภาพรวมโรงแรม</span>
            </Link>
            <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#223649] transition-colors group">
              <span className="material-symbols-outlined group-hover:text-primary">calendar_month</span>
              <span className="text-sm font-medium">จองห้องพัก</span>
            </Link>
            <Link to="/my-bookings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#223649] transition-colors group">
              <span className="material-symbols-outlined group-hover:text-primary">history</span>
              <span className="text-sm font-medium">ประวัติการจอง</span>
            </Link>
            <Link to="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#223649] transition-colors group">
              <span className="material-symbols-outlined group-hover:text-primary">person</span>
              <span className="text-sm font-medium">โปรไฟล์ของฉัน</span>
            </Link>
          </div>

          {/* Section: Administrator */}
          <div className="flex flex-col gap-1">
            <div className="px-3 flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">ระบบจัดการแอดมิน</p>
              <span className="material-symbols-outlined text-slate-600 text-[16px]">lock</span>
            </div>
            <Link to="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary dark:bg-[#3d99f5]/20 dark:text-[#3d99f5] group">
              <span className="material-symbols-outlined icon-fill">analytics</span>
              <span className="text-sm font-semibold">แดชบอร์ด</span>
            </Link>
            <Link to="/admin/rooms" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#223649] transition-colors group">
              <span className="material-symbols-outlined group-hover:text-primary">bed</span>
              <span className="text-sm font-medium">จัดการห้องพัก</span>
            </Link>
            <Link to="/admin/finances" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#223649] transition-colors group">
              <span className="material-symbols-outlined group-hover:text-primary">payments</span>
              <span className="text-sm font-medium">บันทึกรายรับ-จ่าย</span>
            </Link>
            <Link to="/reports" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#223649] transition-colors group">
              <span className="material-symbols-outlined group-hover:text-primary">description</span>
              <span className="text-sm font-medium">รายงานสรุป</span>
            </Link>
            <Link to="/coming-soon" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#223649] transition-colors group">
              <span className="material-symbols-outlined group-hover:text-primary">notifications_active</span>
              <span className="text-sm font-medium">การแจ้งเตือน</span>
            </Link>
            <Link to="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#223649] transition-colors group">
              <span className="material-symbols-outlined group-hover:text-primary">settings</span>
              <span className="text-sm font-medium">ตั้งค่าระบบ</span>
            </Link>
          </div>
        </div>

        {/* Footer: User */}
        <div className="p-4 border-t border-slate-200 dark:border-[#223649]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="bg-center bg-no-repeat bg-cover rounded-full size-10" style={{backgroundImage: `url('${user?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuBCrKwYOgljx0DQBpjknsJ3iBj6Jby5H9HRV9q8--KG35x1UzZN2k-ZQJ9NeRJ6BT9WPv3gCwnnBsWN9QG9b9RaJFvej_dG0R0u5fO1bnWYJPFUsr3tKP9eRS7ImJW1vX_V0F6HoDyPY9j3nTXjeArDmR3pfoI-A0xJ66Gbkr3qIVSy5pONC1Lcg1j-PfiADEYGyXGF2kEwwLH4G6Cwe-A7Tjg81GYfnSEoKlxSbFxIbKLH2KfU17E3r5yU7ahYMY_erasOsggja02H"}')`}}></div>
              <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white dark:border-[#16212b]"></div>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-bold text-slate-900 dark:text-white">{user?.name || "Admin User"}</p>
              <p className="text-xs text-slate-500 dark:text-[#90adcb]">Manager</p>
            </div>
            <button onClick={handleLogout} className="ml-auto text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
        
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-[#16212b] border-b border-slate-200 dark:border-[#223649]">
          <div className="flex items-center gap-4">
            <button 
                onClick={() => setIsSidebarOpen(true)}
                className="text-slate-500 dark:text-white hover:text-primary dark:hover:text-primary transition-colors lg:hidden"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">สถานะห้องพักวันนี้</h2>
              <p className="text-slate-500 dark:text-[#90adcb] text-sm">ประจำวันที่ {new Date().toLocaleDateString('th-TH', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center h-10 w-64 rounded-lg bg-slate-100 dark:bg-[#223649] overflow-hidden">
              <div className="pl-3 text-slate-400 dark:text-[#90adcb]">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input className="w-full bg-transparent border-none text-sm text-slate-900 dark:text-white focus:ring-0 placeholder:text-slate-400 dark:placeholder:text-[#90adcb]" placeholder="ค้นหาห้อง, รายชื่อแขก..." type="text"/>
            </div>
            <button className="flex items-center justify-center size-10 rounded-lg bg-slate-100 dark:bg-[#223649] text-slate-600 dark:text-white hover:bg-slate-200 dark:hover:bg-[#314d68] transition-colors relative">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <div className="absolute top-2 right-2 size-2 bg-red-500 rounded-full"></div>
            </button>
            <Link to="/admin/rooms" className="hidden sm:flex items-center gap-2 h-10 px-4 rounded-lg bg-primary hover:bg-blue-600 text-white font-medium text-sm transition-colors shadow-lg shadow-primary/25">
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>จัดการห้องพัก</span>
            </Link>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-[1280px] mx-auto flex flex-col gap-8">
            
            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex flex-col gap-2 rounded-xl p-5 bg-white dark:bg-[#16212b] border border-slate-200 dark:border-[#314d68] shadow-sm">
                <div className="flex justify-between items-start">
                  <p className="text-slate-500 dark:text-[#90adcb] text-sm font-medium">ห้องว่าง</p>
                  <span className="bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-md p-1">
                    <span className="material-symbols-outlined text-[20px]">door_front</span>
                  </span>
                </div>
                <div className="flex items-end gap-2">
                  <p className="text-slate-900 dark:text-white text-3xl font-bold">{rooms.filter(r => r.status === 'Available').length}</p>
                </div>
                <div className="w-full bg-slate-100 dark:bg-[#223649] h-1.5 rounded-full mt-2">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${(rooms.filter(r => r.status === 'Available').length / rooms.length) * 100}%` }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-2 rounded-xl p-5 bg-white dark:bg-[#16212b] border border-slate-200 dark:border-[#314d68] shadow-sm">
                <div className="flex justify-between items-start">
                  <p className="text-slate-500 dark:text-[#90adcb] text-sm font-medium">ห้องที่มีแขกพัก</p>
                  <span className="bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-md p-1">
                    <span className="material-symbols-outlined text-[20px]">luggage</span>
                  </span>
                </div>
                <div className="flex items-end gap-2">
                  <p className="text-slate-900 dark:text-white text-3xl font-bold">{rooms.filter(r => r.status === 'Occupied').length}</p>
                </div>
                <div className="w-full bg-slate-100 dark:bg-[#223649] h-1.5 rounded-full mt-2">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: `${(rooms.filter(r => r.status === 'Occupied').length / rooms.length) * 100}%` }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-2 rounded-xl p-5 bg-white dark:bg-[#16212b] border border-slate-200 dark:border-[#314d68] shadow-sm">
                <div className="flex justify-between items-start">
                  <p className="text-slate-500 dark:text-[#90adcb] text-sm font-medium">รายได้วันนี้</p>
                  <span className="bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-md p-1">
                    <span className="material-symbols-outlined text-[20px]">payments</span>
                  </span>
                </div>
                <div className="flex items-end gap-2">
                  <p className="text-slate-900 dark:text-white text-3xl font-bold">฿{stats.revenue.toLocaleString()}</p>
                </div>
                <div className="w-full bg-slate-100 dark:bg-[#223649] h-1.5 rounded-full mt-2">
                  <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-2 rounded-xl p-5 bg-white dark:bg-[#16212b] border border-slate-200 dark:border-[#314d68] shadow-sm">
                <div className="flex justify-between items-start">
                  <p className="text-slate-500 dark:text-[#90adcb] text-sm font-medium">รอทำความสะอาด</p>
                  <span className="bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-md p-1">
                    <span className="material-symbols-outlined text-[20px]">cleaning_services</span>
                  </span>
                </div>
                <div className="flex items-end gap-2">
                  <p className="text-slate-900 dark:text-white text-3xl font-bold">{rooms.filter(r => r.status === 'Cleaning').length}</p>
                </div>
                <div className="w-full bg-slate-100 dark:bg-[#223649] h-1.5 rounded-full mt-2">
                  <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${(rooms.filter(r => r.status === 'Cleaning').length / rooms.length) * 100}%` }}></div>
                </div>
              </div>
            </div>

            {/* Room Grid Section */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-slate-900 dark:text-white text-lg font-bold">ผังห้องพัก (ทั้งหมด 51 ห้อง)</h3>
                <div className="flex gap-2">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-[#223649] text-xs font-medium text-slate-600 dark:text-white">
                    <span className="size-2 rounded-full bg-green-500"></span> ว่าง
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-[#223649] text-xs font-medium text-slate-600 dark:text-white">
                    <span className="size-2 rounded-full bg-primary"></span> ไม่ว่าง
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-[#223649] text-xs font-medium text-slate-600 dark:text-white">
                    <span className="size-2 rounded-full bg-orange-500"></span> ทำความสะอาด
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {rooms.map(room => renderRoomCard(room))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
