import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';

const ManageFinances = () => {
  const { addTransaction } = useHotel();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    desc: '',
    roomNo: '',
    nights: 1,
    method: 'cash', // cash | transfer
    amount: '',
    deposit: '',
    type: 'income',
    note: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount || 0);
    const deposit = parseFloat(formData.deposit || 0);
    
    let finalAmount = amount;
    let finalNote = formData.note;

    // Logic จัดการมัดจำตาม Flow Chart
    if (formData.method === 'transfer') {
        // โอนเงิน: มัดจำรวมอยู่ในยอดโอน -> หักมัดจำออกเหลือแค่รายรับจริง
        finalAmount = amount - deposit;
        finalNote = `[โอนเงินรวมมัดจำ] หักมัดจำคืน ${deposit} บาท. ${formData.note}`;
    } else {
        // เงินสด: รับมัดจำแยก -> รายรับจริงคือค่าห้อง (มัดจำไม่นับเป็นรายรับ)
        finalAmount = amount;
        finalNote = `[เงินสด] มัดจำแยก ${deposit} บาท. ${formData.note}`;
    }

    if (formData.type === 'expense') finalAmount = -Math.abs(amount);

    addTransaction({
        id: `TRX-${Date.now()}`,
        desc: formData.desc || `ห้อง ${formData.roomNo}`,
        amount: finalAmount,
        type: formData.type,
        date: new Date(formData.date).toLocaleDateString('th-TH'),
        roomNo: formData.roomNo,
        deposit: deposit,
        method: formData.method,
        status: 'Completed',
        note: finalNote
    });

    alert('บันทึกข้อมูลสำเร็จ!');
    setFormData({ ...formData, desc: '', roomNo: '', amount: '', deposit: '', note: '' });
  };

  return (
    <div className="p-6 md:p-10 max-w-[800px] mx-auto flex flex-col gap-8 text-slate-900 dark:text-white">
      <div>
        <h1 className="text-3xl font-black">จัดการรายรับ-รายจ่าย</h1>
        <p className="text-slate-500 dark:text-[#90adcb]">บันทึกรายการประจำวันและจัดการค่ามัดจำ</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#16212b] p-8 rounded-3xl border border-slate-200 dark:border-[#223649] flex flex-col gap-6 shadow-2xl">
        <div className="flex gap-4 p-1 bg-slate-100 dark:bg-[#1c2a38] rounded-2xl">
            <button type="button" onClick={() => setFormData({...formData, type: 'income'})} className={`flex-1 py-3 rounded-xl font-bold transition-all ${formData.type === 'income' ? 'bg-green-500 text-white shadow-lg' : 'text-slate-500'}`}>รายรับ</button>
            <button type="button" onClick={() => setFormData({...formData, type: 'expense'})} className={`flex-1 py-3 rounded-xl font-bold transition-all ${formData.type === 'expense' ? 'bg-red-500 text-white shadow-lg' : 'text-slate-500'}`}>รายจ่าย</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">วันที่</span>
                <input type="date" className="bg-slate-50 dark:bg-[#1c2a38] border-slate-200 dark:border-transparent rounded-xl h-12 px-4 focus:ring-2 focus:ring-primary" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
            </label>
            <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">วิธีการชำระ</span>
                <select className="bg-slate-50 dark:bg-[#1c2a38] border-slate-200 dark:border-transparent rounded-xl h-12 px-4 focus:ring-2 focus:ring-primary" value={formData.method} onChange={e => setFormData({...formData, method: e.target.value})}>
                    <option value="cash">เงินสด</option>
                    <option value="transfer">โอนเงิน</option>
                </select>
            </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">หมายเลขห้อง / ชื่อรายการ</span>
                <input required type="text" className="bg-slate-50 dark:bg-[#1c2a38] border-slate-200 dark:border-transparent rounded-xl h-12 px-4 focus:ring-2 focus:ring-primary" value={formData.roomNo} onChange={e => setFormData({...formData, roomNo: e.target.value})} placeholder="เช่น A101" />
            </label>
            <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">จำนวนเงินทั้งหมด (฿)</span>
                <input required type="number" className="bg-slate-50 dark:bg-[#1c2a38] border-slate-200 dark:border-transparent rounded-xl h-12 px-4 focus:ring-2 focus:ring-primary" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} placeholder="0.00" />
            </label>
        </div>

        {formData.type === 'income' && (
            <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">มัดจำ (ที่รวมอยู่ในยอดด้านบน)</span>
                <input type="number" className="bg-slate-50 dark:bg-[#1c2a38] border-slate-200 dark:border-transparent rounded-xl h-12 px-4 focus:ring-2 focus:ring-primary" value={formData.deposit} onChange={e => setFormData({...formData, deposit: e.target.value})} placeholder="หักมัดจำคืนเมื่อเช็คเอาท์" />
            </label>
        )}

        <label className="flex flex-col gap-2">
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">หมายเหตุ</span>
            <textarea className="bg-slate-50 dark:bg-[#1c2a38] border-slate-200 dark:border-transparent rounded-xl p-4 h-24 resize-none focus:ring-2 focus:ring-primary" value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} placeholder="ระบุข้อมูลเพิ่มเติม..."></textarea>
        </label>

        <button type="submit" className="w-full py-4 mt-2 bg-primary text-slate-900 dark:text-white font-black text-lg rounded-2xl shadow-xl shadow-primary/20 hover:bg-blue-600 transition-all active:scale-[0.98]">
            บันทึกรายการ
        </button>
      </form>
    </div>
  );
};

export default ManageFinances;