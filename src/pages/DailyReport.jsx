import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';

const DailyReport = () => {
  const { transactions } = useHotel();
  
  // ใช้ Date Object ของวันนี้เป็นค่าเริ่มต้น
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);

  // Helper สำหรับจัดรูปแบบวันที่เปรียบเทียบ (d/m/yyyy) ให้ตรงกับที่เก็บใน Context
  const formatDateForFilter = (date) => {
    return date.toLocaleDateString('th-TH');
  };

  // Helper สำหรับแสดงผลหัวข้อ (เช่น "5 ตุลาคม 2566")
  const formatDateDisplay = (date) => {
    return date.toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Filter Transactions
  const filteredTransactions = transactions.filter(t => t.date === formatDateForFilter(selectedDate));

  // Calculate totals
  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpense = Math.abs(filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0));

  const netBalance = totalIncome - totalExpense;

  // Calendar Generation Helpers
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay(); // 0 = Sunday

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedDate);
    const firstDay = getFirstDayOfMonth(selectedDate);
    const days = [];

    // Empty slots for previous month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-9 w-full"></div>);
    }

    // Days of current month
    for (let d = 1; d <= daysInMonth; d++) {
        const isSelected = d === selectedDate.getDate();
        days.push(
            <button 
                key={d} 
                onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), d))}
                className={`h-9 w-full text-sm font-medium rounded-full transition-colors ${isSelected ? 'bg-primary text-white shadow-md shadow-primary/30 font-bold' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-slate-700 dark:text-gray-300'}`}
            >
                {d}
            </button>
        );
    }
    return days;
  };

  const changeMonth = (offset) => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + offset, 1));
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden">
      
      <main className="flex flex-1 gap-6 p-6 lg:px-10 overflow-hidden flex-col lg:flex-row">
        {/* Sidebar: Calendar Selection */}
        <aside className="flex w-full flex-col gap-4 lg:w-80 lg:shrink-0 overflow-y-auto">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:bg-[#16212b] dark:border-[#223649]">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between p-1 pb-4 border-b border-gray-100 dark:border-[#223649]">
                <button onClick={() => changeMonth(-1)} className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
                <p className="text-base font-bold leading-tight">{selectedDate.toLocaleDateString('th-TH', { month: 'long', year: 'numeric' })}</p>
                <button onClick={() => changeMonth(1)} className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
              <div className="grid grid-cols-7 pt-4 gap-y-1">
                {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map(day => (
                  <p key={day} className="text-slate-400 dark:text-[#4c739a] text-[12px] font-bold text-center pb-2">{day}</p>
                ))}
                {generateCalendarDays()}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="px-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#4c739a]">เมนูด่วน</p>
            <button onClick={() => setSelectedDate(new Date())} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold bg-white dark:bg-[#16212b] border border-slate-200 dark:border-[#223649] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <span className="material-symbols-outlined text-[20px] text-primary">calendar_today</span>
              วันนี้
            </button>
          </div>
        </aside>

        {/* Main Dashboard Area */}
        <div className="flex min-w-0 flex-1 flex-col gap-6 overflow-y-auto pr-2">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-black leading-tight tracking-[-0.033em]">รายงานประจำวัน</h1>
              <p className="text-slate-500 dark:text-[#90adcb] text-base font-normal leading-normal">สรุปยอดเงินและรายละเอียดธุรกรรม ประจำวันที่ <span className="text-primary font-bold">{formatDateDisplay(selectedDate)}</span></p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => window.print()} className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-white text-sm font-bold shadow-lg shadow-primary/30 hover:bg-blue-600 transition-all">
                <span className="material-symbols-outlined text-[18px]">print</span>
                <span>พิมพ์รายงาน</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex flex-col gap-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:bg-[#16212b] dark:border-[#223649]">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <p className="text-slate-500 dark:text-[#90adcb] text-sm font-bold uppercase tracking-wider">รายรับรวม</p>
              </div>
              <div className="mt-2">
                <p className="text-3xl font-black text-slate-900 dark:text-white">฿{totalIncome.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:bg-[#16212b] dark:border-[#223649]">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                  <span className="material-symbols-outlined">shopping_cart</span>
                </div>
                <p className="text-slate-500 dark:text-[#90adcb] text-sm font-bold uppercase tracking-wider">รายจ่ายรวม</p>
              </div>
              <div className="mt-2">
                <p className="text-3xl font-black text-slate-900 dark:text-white">฿{totalExpense.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-3xl border border-primary/30 bg-primary/5 p-6 shadow-sm dark:bg-primary/10">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary text-white">
                  <span className="material-symbols-outlined">account_balance_wallet</span>
                </div>
                <p className="text-primary text-sm font-bold uppercase tracking-wider">คงเหลือสุทธิ</p>
              </div>
              <div className="mt-2">
                <p className="text-primary text-3xl font-black">฿{netBalance.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Transaction Table */}
          <div className="flex flex-col rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden dark:bg-[#16212b] dark:border-[#223649]">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-[#223649]">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">รายการธุรกรรม (Transactions)</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-[#223649]">
                <thead className="bg-slate-50 dark:bg-[#1c2a38]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500 dark:text-slate-400">รายการ</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500 dark:text-slate-400">ลูกค้า / หมายเหตุ</th>
                    <th className="px-6 py-4 text-right text-xs font-bold uppercase text-red-500">รายจ่าย</th>
                    <th className="px-6 py-4 text-right text-xs font-bold uppercase text-green-500">รายรับ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-[#223649]">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((t, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                            {t.desc}
                            {t.roomNo && <span className="ml-2 px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 font-normal">#{t.roomNo}</span>}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                            {t.customerName ? (
                                <div className="flex flex-col">
                                    <span className="font-bold text-slate-900 dark:text-white">{t.customerName}</span>
                                    <span className="text-xs">{t.customerPhone}</span>
                                </div>
                            ) : (
                                t.note || '-'
                            )}
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-bold text-red-400">{t.type === 'expense' ? Math.abs(t.amount).toLocaleString() : '-'}</td>
                        <td className="px-6 py-4 text-right text-sm font-bold text-green-400">{t.type === 'income' ? t.amount.toLocaleString() : '-'}</td>
                        </tr>
                    ))
                  ) : (
                    <tr>
                        <td colSpan="4" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                            ไม่พบรายการธุรกรรมในวันที่เลือก
                        </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DailyReport;
