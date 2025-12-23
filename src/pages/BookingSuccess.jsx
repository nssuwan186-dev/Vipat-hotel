import React from 'react';
import { Link } from 'react-router-dom';

const BookingSuccess = () => {
  return (
    <div className="flex flex-col h-full font-display">
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/30 animate-bounce">
          <span className="material-symbols-outlined text-4xl text-white">check</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">บันทึกการจองสำเร็จ!</h1>
        <p className="text-slate-500 dark:text-text-secondary max-w-md mb-8">
          ระบบได้ทำการบันทึกข้อมูลการจองห้องพักเรียบร้อยแล้ว
        </p>
        <div className="flex gap-4">
            <Link to="/admin" className="px-6 py-3 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark text-slate-900 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors">
                กลับหน้าแดชบอร์ด
            </Link>
            <Link to="/admin/rooms" className="px-6 py-3 rounded-xl bg-primary text-slate-900 dark:text-white font-bold hover:bg-blue-600 transition-colors">
                จัดการห้องพัก
            </Link>
        </div>
      </main>
    </div>
  );
};

export default BookingSuccess;