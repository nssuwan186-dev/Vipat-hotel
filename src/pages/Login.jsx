import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useHotel();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Admin Credentials check
    if (email === 'admin' && password === '1234') {
      login({ 
        name: 'Administrator', 
        email: 'admin', 
        role: 'admin',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAI9_wyN139sGORajtC4muHeqiXvpCn9KFMbgbASXBffVZnmathLhHCt7X818D9KN1bzVKoto-w3eSVjH5WjdIP3sQuhrGD0VwjvxBv_zZNziWXecwwQpLBwJdUxSzcjnGSAzZm8mmzi-8gqnt8VRs5y0utjelif3CFja6Z7iH9ecHcIrA9mV_WSs6yxPg4nCvZ_EhA27TySQA2nKm3nFtQCnMffmzX8SMn7SOwuPZh6N3N9eIB_jG3jIKN8lFq9UBxIbrjunJf5-mo' 
      });
      navigate('/admin'); // พาไปหน้า Admin ทันทีถ้าเป็น admin
    } else if (email && password) {
      // Guest login for any other input
      login({ 
        name: 'Guest User', 
        email: email, 
        role: 'guest',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxbiipzYCeoT4E7jYoun--DG4O2X73OxYverGywcMT4wKf5DCJXZZdY3nLhyZQZxtW90zZa-ErPfnGB3WTiyjyZY92_AYwkr6ty9Cu9EfoyysTrCXQrb62Az5e_b7McSRgtRMRaOMPcpAhtn3I0onj00cnXy3-_KjND6hsf5YbyF09pX02KIGXdUVedG6hs_zcCTThaZqk2unlvg7tfiVrZbxrXkqGgFsRrxqxMLNAx5WsdQmUbFQ2aohZJtQWUo1fqK3BPBrCwtnK' 
      });
      navigate('/');
    } else {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50 dark:bg-background-dark font-display items-center justify-center py-10">
      <div className="flex flex-col w-full max-w-[512px] p-6 bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-slate-200 dark:border-border-dark">
        <h2 className="text-slate-900 dark:text-white tracking-light text-[28px] font-bold leading-tight text-center pb-6">เข้าสู่ระบบ</h2>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <label className="flex flex-col">
            <p className="text-slate-900 dark:text-gray-300 text-base font-medium leading-normal pb-2">อีเมล หรือ เบอร์โทรศัพท์</p>
            <input
              type="text"
              required
              placeholder="กรอกอีเมลของคุณ"
              className="form-input w-full rounded-lg border border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-800 text-slate-900 dark:text-white h-14 px-4 focus:ring-primary focus:border-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          
          <label className="flex flex-col">
            <p className="text-slate-900 dark:text-gray-300 text-base font-medium leading-normal pb-2">รหัสผ่าน</p>
            <input
              type="password"
              required
              placeholder="กรอกรหัสผ่านของคุณ"
              className="form-input w-full rounded-lg border border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-800 text-slate-900 dark:text-white h-14 px-4 focus:ring-primary focus:border-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <a href="#" className="text-slate-500 dark:text-[#4c739a] text-sm font-medium underline text-right">ลืมรหัสผ่าน?</a>

          <button
            type="submit"
            className="w-full h-12 rounded-lg bg-primary text-slate-900 dark:text-white text-base font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30"
          >
            เข้าสู่ระบบ
          </button>
        </form>

        <p className="text-slate-500 dark:text-[#4c739a] text-sm font-normal text-center mt-6">
          ยังไม่มีบัญชีใช่ไหม? <Link to="/register" className="text-primary font-bold hover:underline">สมัครสมาชิก</Link>
        </p>
        <Link to="/" className="text-slate-500 dark:text-text-secondary text-sm text-center mt-2 hover:text-primary">กลับหน้าหลัก</Link>
      </div>
    </div>
  );
};

export default Login;