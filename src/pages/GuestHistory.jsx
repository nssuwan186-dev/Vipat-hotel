import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';

const GuestHistory = () => {
  const { transactions } = useHotel();
  const [searchTerm, setSearchTerm] = useState('');

  // Group transactions by customer name
  const guests = transactions.reduce((acc, t) => {
    if (!t.customerName) return acc;
    const name = t.customerName;
    if (!acc[name]) {
        acc[name] = {
            name: name,
            phone: t.customerPhone,
            visits: 0,
            totalSpent: 0,
            lastVisit: t.date,
            history: []
        };
    }
    acc[name].visits += 1;
    acc[name].totalSpent += t.amount;
    acc[name].history.push(t);
    // Update last visit if this transaction is newer
    // (Assuming transactions are sorted or we rely on date string comparison roughly)
    return acc;
  }, {});

  const guestList = Object.values(guests).filter(g => 
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (g.phone && g.phone.includes(searchTerm))
  );

  return (
    <div className="p-6 md:p-10 max-w-[1000px] mx-auto flex flex-col gap-6 text-slate-900 dark:text-white">
      <div>
        <h1 className="text-3xl font-black">ประวัติลูกค้า (Guest CRM)</h1>
        <p className="text-slate-500 dark:text-[#90adcb]">ฐานข้อมูลลูกค้าและประวัติการเข้าพัก</p>
      </div>

      {/* Search */}
      <div className="relative">
        <input 
            type="text" 
            placeholder="ค้นหาชื่อ หรือ เบอร์โทรศัพท์..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white dark:bg-[#16212b] border border-slate-200 dark:border-[#223649] focus:ring-2 focus:ring-primary outline-none text-lg"
        />
        <span className="material-symbols-outlined absolute left-4 top-4 text-slate-400">search</span>
      </div>

      {/* Guest List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guestList.map((guest, index) => (
            <div key={index} className="bg-white dark:bg-[#16212b] p-6 rounded-3xl border border-slate-200 dark:border-[#223649] shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xl">
                            {guest.name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">{guest.name}</h3>
                            <p className="text-sm text-slate-500">{guest.phone || 'ไม่ระบุเบอร์'}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-slate-500 uppercase font-bold">ยอดใช้จ่ายรวม</p>
                        <p className="text-lg font-black text-primary">฿{guest.totalSpent.toLocaleString()}</p>
                    </div>
                </div>
                
                <div className="bg-slate-50 dark:bg-[#1c2a38] rounded-xl p-4">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-500">จำนวนครั้งที่มาพัก</span>
                        <span className="font-bold">{guest.visits} ครั้ง</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">ล่าสุดเมื่อ</span>
                        <span className="font-bold">{guest.lastVisit}</span>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default GuestHistory;
