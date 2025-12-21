import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useHotel } from '../context/HotelContext';

const DailyReport = () => {
  const { transactions } = useHotel();
  const [selectedDate, setSelectedDate] = useState('5 ตุลาคม 2566');

  // Calculate totals from transactions context
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpense = Math.abs(transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0));

  const netBalance = totalIncome - totalExpense;

  return (
    <div className="flex min-h-screen flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
      <Navbar />
      
      <main className="flex flex-1 flex-col gap-6 p-6 lg:flex-row lg:px-12 xl:px-24">
        {/* Sidebar: Calendar Selection */}
        <aside className="flex w-full flex-col gap-4 lg:w-80 lg:shrink-0">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:bg-surface-dark dark:border-border-dark">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between p-1 pb-4 border-b border-gray-100 dark:border-border-dark">
                <button className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
                <p className="text-base font-bold leading-tight">ตุลาคม 2566</p>
                <button className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
              <div className="grid grid-cols-7 pt-2">
                {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map(day => (
                  <p key={day} className="text-slate-500 dark:text-[#4c739a] text-[12px] font-bold text-center pb-2">{day}</p>
                ))}
                <div className="col-start-1 h-9 w-full"></div>
                <div className="h-9 w-full"></div>
                <div className="h-9 w-full"></div>
                {[1, 2, 3, 4].map(d => (
                  <button key={d} className="h-9 w-full text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full">{d}</button>
                ))}
                <button className="h-9 w-full text-white text-sm font-bold leading-normal">
                  <div className="flex size-full items-center justify-center rounded-full bg-primary shadow-md shadow-blue-200">5</div>
                </button>
                {[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(d => (
                  <button key={d} className="h-9 w-full text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full">{d}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden flex-col gap-2 lg:flex">
            <p className="px-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#4c739a]">เมนูด่วน</p>
            <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
              <span className="material-symbols-outlined text-[20px] text-primary">calendar_today</span>
              วันนี้ (5 ต.ค.)
            </button>
            <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
              <span className="material-symbols-outlined text-[20px] text-gray-500">history</span>
              เมื่อวาน (4 ต.ค.)
            </button>
          </div>
        </aside>

        {/* Main Dashboard Area */}
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-black leading-tight tracking-[-0.033em]">รายงานประจำวัน</h1>
              <p className="text-slate-500 dark:text-[#4c739a] text-base font-normal leading-normal dark:text-text-secondary">สรุปยอดเงินและรายละเอียดการทำธุรกรรม ประจำวันที่ {selectedDate}</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center justify-center gap-2 rounded-lg bg-white border border-slate-200 px-4 py-2.5 text-sm font-bold dark:bg-surface-dark dark:border-border-dark hover:bg-gray-50">
                <span className="material-symbols-outlined text-[18px]">file_upload</span>
                <span>ส่งออก CSV</span>
              </button>
              <button className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-slate-900 dark:text-white text-sm font-bold shadow-sm shadow-blue-200 hover:bg-blue-600">
                <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                <span>ส่งออก PDF</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:bg-surface-dark dark:border-border-dark">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-green-50 text-[#078838]">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <p className="text-slate-500 dark:text-[#4c739a] text-sm font-bold uppercase tracking-wider">รายรับรวม</p>
              </div>
              <div className="mt-2">
                <p className="text-3xl font-black">฿{totalIncome.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:bg-surface-dark dark:border-border-dark">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-red-50 text-[#e73908]">
                  <span className="material-symbols-outlined">shopping_cart</span>
                </div>
                <p className="text-slate-500 dark:text-[#4c739a] text-sm font-bold uppercase tracking-wider">รายจ่ายรวม</p>
              </div>
              <div className="mt-2">
                <p className="text-3xl font-black">฿{totalExpense.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-xl border border-primary/20 bg-primary/5 p-6 shadow-sm dark:bg-primary/10">
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
          <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden dark:bg-surface-dark dark:border-border-dark">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-border-dark">
              <h3 className="text-lg font-bold">รายการธุรกรรม (Transactions)</h3>
              <div className="relative">
                <input className="h-9 rounded-lg border border-gray-300 bg-white px-3 pl-9 text-sm focus:border-primary focus:ring-1 focus:ring-primary dark:bg-gray-800 dark:border-gray-600" placeholder="ค้นหา..." type="text"/>
                <span className="material-symbols-outlined absolute left-2.5 top-2 text-[18px] text-gray-400">search</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-border-dark">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase text-gray-500">เวลา</th>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase text-gray-500">รายการ</th>
                    <th className="px-6 py-3 text-right text-xs font-bold uppercase text-red-500">รายจ่าย</th>
                    <th className="px-6 py-3 text-right text-xs font-bold uppercase text-green-600">รายรับ</th>
                    <th className="px-6 py-3 text-right text-xs font-bold uppercase text-gray-900 dark:text-white">รวม</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-border-dark">
                  {transactions.map((t, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-6 py-4 text-sm text-gray-500">09:00</td>
                      <td className="px-6 py-4 text-sm font-medium">{t.desc}</td>
                      <td className="px-6 py-4 text-right text-sm text-red-500">{t.type === 'expense' ? Math.abs(t.amount).toLocaleString() : '-'}</td>
                      <td className="px-6 py-4 text-right text-sm text-green-600">{t.type === 'income' ? t.amount.toLocaleString() : '-'}</td>
                      <td className={`px-6 py-4 text-right text-sm font-bold ${t.amount >= 0 ? 'text-gray-900 dark:text-white' : 'text-red-600'}`}>
                        {t.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DailyReport;