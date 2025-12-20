import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';

const ManageFinances = () => {
  const { addTransaction } = useHotel();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    desc: '',
    amount: '',
    type: 'income', // income | expense
    note: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const amountVal = parseFloat(formData.amount);
    const finalAmount = formData.type === 'expense' ? -Math.abs(amountVal) : Math.abs(amountVal);
    
    const newTrx = {
        id: `#TRX-${Math.floor(Math.random() * 10000)}`,
        desc: formData.desc,
        date: new Date(formData.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        amount: finalAmount,
        type: formData.type,
        status: 'Completed' // Default status
    };

    addTransaction(newTrx);
    alert('Transaction recorded successfully!');
    setFormData({ ...formData, desc: '', amount: '', note: '' });
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e7edf3] dark:border-gray-800 bg-white dark:bg-[#1a2634] px-6 py-3 shadow-sm">
        <div className="flex items-center gap-4">
            <Link to="/admin" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <h2 className="text-lg font-bold">Manage Finances</h2>
        </div>
      </header>

      <div className="p-6 md:px-12 lg:px-20 max-w-[800px] mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-black">บันทึกรายการรายรับ-รายจ่าย</h1>
            <p className="text-gray-500 dark:text-gray-400">เพิ่มรายการบัญชีประจำวันด้วยตนเอง</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1a2634] p-6 rounded-xl shadow-sm border border-[#cfdbe7] dark:border-border-dark flex flex-col gap-6">
            {/* Transaction Type */}
            <div className="flex gap-4">
                <label className={`flex-1 cursor-pointer border rounded-xl p-4 flex items-center gap-3 transition-all ${formData.type === 'income' ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700' : 'border-gray-200 dark:border-gray-700'}`}>
                    <input type="radio" name="type" value="income" checked={formData.type === 'income'} onChange={() => setFormData({...formData, type: 'income'})} className="hidden" />
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formData.type === 'income' ? 'bg-green-500 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>
                        <span className="material-symbols-outlined">arrow_downward</span>
                    </div>
                    <div>
                        <span className="block font-bold">รายรับ (Income)</span>
                        <span className="text-xs opacity-70">ค่าห้อง, ค่าบริการ ฯลฯ</span>
                    </div>
                </label>
                <label className={`flex-1 cursor-pointer border rounded-xl p-4 flex items-center gap-3 transition-all ${formData.type === 'expense' ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700' : 'border-gray-200 dark:border-gray-700'}`}>
                    <input type="radio" name="type" value="expense" checked={formData.type === 'expense'} onChange={() => setFormData({...formData, type: 'expense'})} className="hidden" />
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formData.type === 'expense' ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>
                        <span className="material-symbols-outlined">arrow_upward</span>
                    </div>
                    <div>
                        <span className="block font-bold">รายจ่าย (Expense)</span>
                        <span className="text-xs opacity-70">ค่าน้ำไฟ, ของใช้ ฯลฯ</span>
                    </div>
                </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium">วันที่</span>
                    <input type="date" required className="form-input rounded-lg dark:bg-gray-800 dark:border-gray-600" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                </label>
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium">จำนวนเงิน (฿)</span>
                    <input type="number" required min="0" className="form-input rounded-lg dark:bg-gray-800 dark:border-gray-600" placeholder="0.00" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
                </label>
            </div>

            <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">รายการ</span>
                <input type="text" required className="form-input rounded-lg dark:bg-gray-800 dark:border-gray-600" placeholder="เช่น ค่าห้องพัก 101, ซื้อน้ำยาทำความสะอาด" value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} />
            </label>

            <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">หมายเหตุ (ถ้ามี)</span>
                <textarea className="form-textarea rounded-lg dark:bg-gray-800 dark:border-gray-600 h-24 resize-none" placeholder="รายละเอียดเพิ่มเติม..." value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})}></textarea>
            </label>

            <button type="submit" className="w-full py-3 rounded-xl bg-primary text-white font-bold hover:bg-blue-600 shadow-lg shadow-blue-500/30 transition-all mt-2">
                บันทึกรายการ
            </button>
        </form>
      </div>
    </div>
  );
};

export default ManageFinances;
