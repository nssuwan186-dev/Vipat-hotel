import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';

const AdminDashboard = () => {
  const { rooms, stats, transactions, updateRoomStatus } = useHotel();
  const navigate = useNavigate();

  // คำนวณสรุปการเงินจริงจาก Transactions
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = Math.abs(transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0));
  const netBalance = totalIncome - totalExpense;

  const handleRoomClick = (room) => {
    const statuses = ['Available', 'Occupied', 'Cleaning', 'Maintenance'];
    const currentIndex = statuses.indexOf(room.status);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    updateRoomStatus(room.id, nextStatus);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-500/10 border-green-500/30 text-green-400';
      case 'Occupied': return 'bg-primary/10 border-primary/30 text-primary';
      case 'Cleaning': return 'bg-orange-500/10 border-orange-500/30 text-orange-400';
      case 'Maintenance': return 'bg-red-500/10 border-red-500/30 text-red-400';
      default: return 'bg-slate-800 border-slate-700 text-slate-400';
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-[1280px] mx-auto flex flex-col gap-10">
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-[#16212b] p-6 rounded-3xl border border-slate-200 dark:border-[#223649] flex flex-col gap-2 shadow-sm">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">สถานะห้องพัก</p>
            <div className="flex items-end justify-between">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white">{rooms.filter(r => r.status === 'Available').length}</h3>
                <span className="text-green-500 text-xs font-bold">ห้องว่าง</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-[#1c2a38] h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-green-500 h-full" style={{ width: `${(rooms.filter(r => r.status === 'Available').length / rooms.length) * 100}%` }}></div>
            </div>
        </div>

        <div className="bg-white dark:bg-[#16212b] p-6 rounded-3xl border border-slate-200 dark:border-[#223649] flex flex-col gap-2 shadow-sm text-green-400">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">รายรับวันนี้</p>
            <h3 className="text-3xl font-black">฿{totalIncome.toLocaleString()}</h3>
            <p className="text-[10px] opacity-70">ยอดโอน/เงินสดรวม</p>
        </div>

        <div className="bg-white dark:bg-[#16212b] p-6 rounded-3xl border border-slate-200 dark:border-[#223649] flex flex-col gap-2 shadow-sm text-red-400">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">รายจ่ายรวม</p>
            <h3 className="text-3xl font-black">฿{totalExpense.toLocaleString()}</h3>
            <p className="text-[10px] opacity-70">ค่าน้ำไฟ/อุปกรณ์</p>
        </div>

        <div className="bg-primary/10 p-6 rounded-3xl border border-primary/30 flex flex-col gap-2 shadow-lg text-primary">
            <p className="text-xs font-bold text-primary uppercase tracking-widest">คงเหลือสุทธิ</p>
            <h3 className="text-3xl font-black">฿{netBalance.toLocaleString()}</h3>
            <p className="text-[10px] text-primary opacity-70">ยอดหักมัดจำแล้ว</p>
        </div>
      </div>

      {/* Room Grid */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center px-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">ผังห้องพัก (Real-time)</h2>
            <div className="flex gap-2">
                {['Available', 'Occupied', 'Cleaning', 'Maintenance'].map(s => (
                    <div key={s} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase">
                        <span className={`size-2 rounded-full ${s === 'Available' ? 'bg-green-500' : s === 'Occupied' ? 'bg-primary' : s === 'Cleaning' ? 'bg-orange-500' : 'bg-red-500'}`}></span>
                        {s === 'Available' ? 'ว่าง' : s === 'Occupied' ? 'ไม่ว่าง' : s === 'Cleaning' ? 'ทำความสะอาด' : 'ปิดซ่อม'}
                    </div>
                ))}
            </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-3">
            {rooms.map(room => (
                <button 
                    key={room.id} 
                    onClick={() => handleRoomClick(room)}
                    className={`p-3 rounded-2xl border text-center transition-all hover:scale-105 active:scale-95 ${getStatusColor(room.status)} shadow-sm`}
                >
                    <span className="text-lg font-black block">{room.id}</span>
                    <span className="text-[8px] font-bold uppercase opacity-70">{room.type === 'Standard' ? 'STD' : 'TWIN'}</span>
                </button>
            ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-[#16212b] rounded-3xl border border-slate-200 dark:border-[#223649] overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-200 dark:border-[#223649] flex justify-between items-center">
            <h3 className="font-bold text-slate-900 dark:text-white">รายการเงินล่าสุด</h3>
            <Link to="/admin/finances" className="text-xs text-primary font-bold hover:underline">ดูทั้งหมด</Link>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="bg-slate-50 dark:bg-[#1c2a38] text-slate-500 dark:text-slate-400">
                        <th className="px-6 py-3 font-bold">รายการ</th>
                        <th className="px-6 py-3 font-bold">วันที่</th>
                        <th className="px-6 py-3 font-bold text-right">จำนวนเงิน</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-[#223649]">
                    {transactions.slice(0, 5).map((t, i) => (
                        <tr key={i} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{t.desc}</td>
                            <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{t.date}</td>
                            <td className={`px-6 py-4 text-right font-black ${t.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                ฿{Math.abs(t.amount).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;