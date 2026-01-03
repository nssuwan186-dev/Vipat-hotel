import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useHotel } from '../context/HotelContext';

const BookingForm = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { rooms, bookRoom } = useHotel();
  const room = rooms.find(r => r.id === roomId);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: 'cash'
  });

  if (!room) {
    return <div className="text-center py-20 text-slate-900 dark:text-white">Room not found</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we would validate and send data to backend here
    bookRoom(roomId, formData);
    navigate('/booking-success');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display">
      <Navbar />
      
      <main className="flex-1 py-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center gap-2 text-slate-500 dark:text-text-secondary text-sm mb-2">
            <span className="cursor-pointer hover:text-primary" onClick={() => navigate('/')}>หน้าแรก</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-slate-900 dark:text-white font-medium">ข้อมูลผู้เข้าพัก</span>
          </div>
          <h1 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight">แบบฟอร์มข้อมูลผู้เข้าพัก</h1>
          <p className="text-slate-500 dark:text-text-secondary text-base">กรุณากรอกข้อมูลส่วนตัวและข้อมูลการชำระเงินสำหรับการจองห้อง {room.id} ({room.type})</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Forms */}
          <div className="flex-1 flex flex-col gap-6">
            
            {/* Personal Info Section */}
            <section className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-border-dark overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-border-dark flex items-center gap-3">
                <span className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-[20px]">person</span>
                </span>
                <h3 className="text-slate-900 dark:text-white text-lg font-bold">ข้อมูลส่วนตัว</h3>
              </div>
              <div className="p-6 flex flex-col gap-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <label className="flex flex-col flex-1">
                    <span className="text-slate-700 dark:text-gray-300 text-sm font-medium pb-2">ชื่อจริง <span className="text-red-500">*</span></span>
                    <input required name="firstName" onChange={handleChange} className="w-full rounded-lg border-slate-300 dark:border-gray-600 bg-slate-50 dark:bg-gray-800 text-slate-900 dark:text-white h-12 px-4 focus:border-primary focus:ring-1 focus:ring-primary" placeholder="สมชาย" />
                  </label>
                  <label className="flex flex-col flex-1">
                    <span className="text-slate-700 dark:text-gray-300 text-sm font-medium pb-2">นามสกุล <span className="text-red-500">*</span></span>
                    <input required name="lastName" onChange={handleChange} className="w-full rounded-lg border-slate-300 dark:border-gray-600 bg-slate-50 dark:bg-gray-800 text-slate-900 dark:text-white h-12 px-4 focus:border-primary focus:ring-1 focus:ring-primary" placeholder="รักดี" />
                  </label>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <label className="flex flex-col flex-1">
                    <span className="text-slate-700 dark:text-gray-300 text-sm font-medium pb-2">เบอร์โทรศัพท์ <span className="text-red-500">*</span></span>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                        <span className="material-symbols-outlined text-[20px]">call</span>
                      </span>
                      <input required name="phone" onChange={handleChange} className="w-full rounded-lg border-slate-300 dark:border-gray-600 bg-slate-50 dark:bg-gray-800 text-slate-900 dark:text-white h-12 pl-10 pr-4 focus:border-primary focus:ring-1 focus:ring-primary" placeholder="08x-xxx-xxxx" type="tel"/>
                    </div>
                  </label>
                  <label className="flex flex-col flex-1">
                    <span className="text-slate-700 dark:text-gray-300 text-sm font-medium pb-2">อีเมล</span>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                        <span className="material-symbols-outlined text-[20px]">mail</span>
                      </span>
                      <input name="email" onChange={handleChange} className="w-full rounded-lg border-slate-300 dark:border-gray-600 bg-slate-50 dark:bg-gray-800 text-slate-900 dark:text-white h-12 pl-10 pr-4 focus:border-primary focus:ring-1 focus:ring-primary" placeholder="email@example.com" type="email"/>
                    </div>
                  </label>
                </div>
              </div>
            </section>

            {/* Payment Info Section */}
            <section className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-border-dark overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-border-dark flex items-center gap-3">
                <span className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-[20px]">payments</span>
                </span>
                <h3 className="text-slate-900 dark:text-white text-lg font-bold">วิธีการชำระเงิน</h3>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <label className="flex items-center gap-3 p-4 border border-slate-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-gray-800">
                  <input type="radio" name="paymentMethod" value="credit_card" checked={formData.paymentMethod === 'credit_card'} onChange={handleChange} className="text-primary focus:ring-primary w-5 h-5" />
                  <span className="flex-1 font-medium text-slate-900 dark:text-white">บัตรเครดิต / เดบิต</span>
                  <span className="material-symbols-outlined text-slate-500">credit_card</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-slate-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-gray-800">
                  <input type="radio" name="paymentMethod" value="cash" checked={formData.paymentMethod === 'cash'} onChange={handleChange} className="text-primary focus:ring-primary w-5 h-5" />
                  <span className="flex-1 font-medium text-slate-900 dark:text-white">ชำระเงินที่หน้าเคาน์เตอร์ (เงินสด)</span>
                  <span className="material-symbols-outlined text-slate-500">payments</span>
                </label>
              </div>
            </section>
          </div>

          {/* Right Column: Summary */}
          <div className="lg:w-96 flex flex-col gap-6">
            <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-border-dark overflow-hidden sticky top-24">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-border-dark">
                <h3 className="text-slate-900 dark:text-white text-lg font-bold">สรุปการจอง</h3>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-text-secondary text-sm">ประเภทห้อง</span>
                  <span className="text-slate-900 dark:text-white font-medium text-right">{room.type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-text-secondary text-sm">หมายเลขห้อง</span>
                  <span className="text-slate-900 dark:text-white font-medium">#{room.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-text-secondary text-sm">เช็คอิน</span>
                  <span className="text-slate-900 dark:text-white font-medium">24 ต.ค. 2566</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-text-secondary text-sm">เช็คเอาท์</span>
                  <span className="text-slate-900 dark:text-white font-medium">25 ต.ค. 2566</span>
                </div>
                <hr className="border-slate-200 dark:border-gray-700 my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-slate-900 dark:text-white font-bold">ราคารวม</span>
                  <span className="text-primary text-xl font-black">฿{room.price.toLocaleString()}</span>
                </div>
                <button type="submit" className="w-full py-3 mt-4 rounded-xl bg-primary text-slate-900 dark:text-white font-bold hover:bg-blue-600 shadow-lg shadow-blue-500/30 transition-all">
                  ยืนยันการจอง
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default BookingForm;