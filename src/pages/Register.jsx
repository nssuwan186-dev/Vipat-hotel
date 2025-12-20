import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Simulate registration
    alert("ลงทะเบียนสำเร็จ! กรุณาเข้าสู่ระบบ");
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50 dark:bg-background-dark font-display items-center justify-center py-10">
      <div className="flex flex-col w-full max-w-[512px] p-6 bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-[#cfdbe7] dark:border-border-dark">
        <h2 className="text-[#0d141b] dark:text-white tracking-light text-[28px] font-bold leading-tight text-center pb-6">สมัครสมาชิก</h2>
        
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div className="flex gap-4">
                <label className="flex flex-col flex-1">
                    <p className="text-[#0d141b] dark:text-gray-300 text-sm font-medium pb-2">ชื่อจริง</p>
                    <input required className="form-input w-full rounded-lg border border-[#cfdbe7] dark:border-gray-600 bg-slate-50 dark:bg-gray-800 h-12 px-4 dark:text-white" placeholder="สมชาย" />
                </label>
                <label className="flex flex-col flex-1">
                    <p className="text-[#0d141b] dark:text-gray-300 text-sm font-medium pb-2">นามสกุล</p>
                    <input required className="form-input w-full rounded-lg border border-[#cfdbe7] dark:border-gray-600 bg-slate-50 dark:bg-gray-800 h-12 px-4 dark:text-white" placeholder="รักดี" />
                </label>
            </div>

          <label className="flex flex-col">
            <p className="text-[#0d141b] dark:text-gray-300 text-sm font-medium pb-2">อีเมล</p>
            <input required type="email" className="form-input w-full rounded-lg border border-[#cfdbe7] dark:border-gray-600 bg-slate-50 dark:bg-gray-800 h-12 px-4 dark:text-white" placeholder="somchai@example.com" />
          </label>
          
          <label className="flex flex-col">
            <p className="text-[#0d141b] dark:text-gray-300 text-sm font-medium pb-2">รหัสผ่าน</p>
            <input required type="password" className="form-input w-full rounded-lg border border-[#cfdbe7] dark:border-gray-600 bg-slate-50 dark:bg-gray-800 h-12 px-4 dark:text-white" placeholder="ตั้งรหัสผ่านของคุณ" />
          </label>

          <button
            type="submit"
            className="w-full h-12 mt-2 rounded-lg bg-primary text-white text-base font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30"
          >
            ลงทะเบียน
          </button>
        </form>

        <p className="text-[#4c739a] text-sm font-normal text-center mt-6">
          มีบัญชีอยู่แล้ว? <Link to="/login" className="text-primary font-bold hover:underline">เข้าสู่ระบบ</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
