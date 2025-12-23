import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useHotel();
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('Staff');

  const handleLogin = (e) => {
    e.preventDefault();
    login({ name: username, role });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 font-display">
      <div className="bg-white dark:bg-[#16212b] p-8 rounded-3xl shadow-xl w-full max-w-sm border border-slate-200 dark:border-[#223649]">
        <h1 className="text-2xl font-black text-center mb-6 text-slate-900 dark:text-white">เข้าสู่ระบบ</h1>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1">
                <span className="text-sm font-bold text-slate-500">ชื่อผู้ใช้งาน</span>
                <input required value={username} onChange={e => setUsername(e.target.value)} className="bg-slate-50 dark:bg-[#1c2a38] border-none rounded-xl h-12 px-4" placeholder="ชื่อพนักงาน" />
            </label>

            <label className="flex flex-col gap-1">
                <span className="text-sm font-bold text-slate-500">ตำแหน่ง</span>
                <select value={role} onChange={e => setRole(e.target.value)} className="bg-slate-50 dark:bg-[#1c2a38] border-none rounded-xl h-12 px-4">
                    <option value="Staff">พนักงานทั่วไป (Staff)</option>
                    <option value="Manager">ผู้จัดการ (Manager)</option>
                    <option value="Admin">เจ้าของ/แอดมิน (Admin)</option>
                </select>
            </label>

            <button type="submit" className="h-12 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-blue-600 mt-2">เข้าสู่ระบบ</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
