import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';

const AdminSettings = () => {
  const { theme, toggleTheme } = useHotel();
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e7edf3] dark:border-gray-800 bg-white dark:bg-[#1a2634] px-6 py-3 shadow-sm">
        <div className="flex items-center gap-4">
            <Link to="/admin" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <h2 className="text-lg font-bold">ตั้งค่าระบบ</h2>
        </div>
      </header>

      <div className="p-6 md:px-12 lg:px-20 max-w-[800px] mx-auto flex flex-col gap-8">
        <div>
            <h1 className="text-3xl font-black">ตั้งค่าข้อมูลโรงแรม</h1>
            <p className="text-gray-500 dark:text-gray-400">จัดการข้อมูลโรงแรมและบัญชีธนาคาร</p>
        </div>

        <section className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-border-dark overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-gray-700">
                <h3 className="font-bold">ข้อมูลทั่วไป</h3>
            </div>
            <div className="p-6 flex flex-col gap-4">
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium">ชื่อโรงแรม</span>
                    <input className="form-input rounded-lg dark:bg-gray-800 dark:border-gray-600" defaultValue="โรงแรมวิพัฒน์กาลจักร บึงกาฬ" />
                </label>
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium">เบอร์โทรศัพท์</span>
                    <input className="form-input rounded-lg dark:bg-gray-800 dark:border-gray-600" defaultValue="081-XXX-XXXX" />
                </label>
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium">ที่อยู่</span>
                    <textarea className="form-textarea rounded-lg dark:bg-gray-800 dark:border-gray-600 h-24">123 ถนนแม่น้ำโขง อำเภอเมือง จังหวัดบึงกาฬ 38000</textarea>
                </label>
                <button className="bg-primary text-white py-2.5 rounded-lg font-bold hover:bg-blue-600 transition-all mt-2">บันทึกการเปลี่ยนแปลง</button>
            </div>
        </section>

        <section className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-border-dark overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-gray-700">
                <h3 className="font-bold">การแสดงผล</h3>
            </div>
            <div className="p-6 flex items-center justify-between">
                <div>
                    <h4 className="font-bold">โหมดมืด</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">เปิดใช้งานธีมสีเข้ม</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={theme === 'dark'}
                        onChange={toggleTheme}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
            </div>
        </section>

        <section className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-border-dark overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-gray-700">
                <h3 className="font-bold">บัญชีธนาคาร (สำหรับรับโอน)</h3>
            </div>
            <div className="p-6 flex flex-col gap-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-600 rounded flex items-center justify-center text-white font-bold text-xs">KBANK</div>
                        <div>
                            <p className="text-sm font-bold">ธนาคารกสิกรไทย</p>
                            <p className="text-xs text-gray-500">123-4-56789-0</p>
                        </div>
                    </div>
                    <button className="text-red-500"><span className="material-symbols-outlined">delete</span></button>
                </div>
                <button className="text-primary text-sm font-bold flex items-center gap-2 mt-2">
                    <span className="material-symbols-outlined">add</span> เพิ่มบัญชีใหม่
                </button>
            </div>
        </section>
      </div>
    </div>
  );
};

export default AdminSettings;