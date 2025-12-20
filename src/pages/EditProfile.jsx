import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';

const EditProfile = () => {
  const { user, login } = useHotel();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');

  const handleSave = (e) => {
    e.preventDefault();
    login({ ...user, name });
    alert('บันทึกข้อมูลเรียบร้อย');
    navigate('/profile');
  };

  return (
    <div className="p-6 max-w-md mx-auto text-white">
      <h1 className="text-2xl font-black mb-6">แก้ไขข้อมูลส่วนตัว</h1>
      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
            <span className="text-sm font-bold text-slate-400">ชื่อ-นามสกุล</span>
            <input className="bg-[#16212b] border-none rounded-2xl h-12 px-4" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2 opacity-50">
            <span className="text-sm font-bold text-slate-400">อีเมล (แก้ไขไม่ได้)</span>
            <input className="bg-[#16212b] border-none rounded-2xl h-12 px-4" value={user?.email} disabled />
        </div>
        <button type="submit" className="bg-primary py-4 rounded-2xl font-black mt-4 shadow-lg shadow-primary/20">บันทึกข้อมูล</button>
      </form>
    </div>
  );
};

export default EditProfile;
