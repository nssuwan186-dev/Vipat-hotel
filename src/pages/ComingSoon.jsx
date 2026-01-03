import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ComingSoon = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display flex flex-col items-center justify-center text-center p-6">
      <Navbar />
      <span className="material-symbols-outlined text-6xl text-primary mb-4">construction</span>
      <h1 className="text-3xl font-black text-slate-900 dark:text-white">กำลังพัฒนาครับ</h1>
      <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">ฟีเจอร์นี้กำลังอยู่ในระหว่างการพัฒนาโดยทีมงาน</p>
      <button onClick={() => navigate(-1)} className="px-6 py-2 bg-primary text-slate-900 dark:text-white rounded-lg font-bold hover:bg-blue-600 transition-all">
        ย้อนกลับ
      </button>
    </div>
  );
};

export default ComingSoon;