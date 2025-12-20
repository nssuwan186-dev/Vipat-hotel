import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';

const AdminNotifications = () => {
  const { notifications, setNotifications } = useHotel();
  const [activeTab, setActiveTab] = useState('list'); // list | settings

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    if(confirm('ต้องการล้างการแจ้งเตือนทั้งหมดหรือไม่?')) {
        setNotifications([]);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-[1000px] mx-auto flex flex-col gap-8">
      <div className="flex justify-between items-end">
        <div>
            <h1 className="text-3xl font-black">การแจ้งเตือน</h1>
            <p className="text-[#90adcb]">ติดตามกิจกรรมสำคัญของโรงแรม</p>
        </div>
        <div className="flex bg-[#1c2a38] p-1 rounded-xl">
            <button onClick={() => setActiveTab('list')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'list' ? 'bg-primary text-white shadow-lg' : 'text-slate-400'}`}>รายการ</button>
            <button onClick={() => setActiveTab('settings')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'settings' ? 'bg-primary text-white shadow-lg' : 'text-slate-400'}`}>ตั้งค่า</button>
        </div>
      </div>

      {activeTab === 'list' ? (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center px-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">ตามลำดับเวลา</p>
                <div className="flex gap-4">
                    <button onClick={markAllAsRead} className="text-xs text-primary font-bold hover:underline">ทำเป็นอ่านแล้วทั้งหมด</button>
                    <button onClick={clearAll} className="text-xs text-red-400 font-bold hover:underline">ล้างทั้งหมด</button>
                </div>
            </div>
            {notifications.length === 0 ? (
                <div className="py-20 text-center text-slate-500 bg-[#16212b] rounded-2xl border border-[#223649]">ไม่มีการแจ้งเตือนในขณะนี้</div>
            ) : (
                notifications.map(n => (
                    <div key={n.id} className={`p-5 rounded-2xl border flex gap-4 transition-all ${n.read ? 'bg-[#16212b]/50 border-[#223649] opacity-60' : 'bg-[#16212b] border-primary/30 shadow-lg shadow-primary/5'}`}>
                        <div className={`size-10 rounded-full flex items-center justify-center shrink-0 ${n.read ? 'bg-slate-700 text-slate-400' : 'bg-primary/20 text-primary'}`}>
                            <span className="material-symbols-outlined">{n.title === 'การจองใหม่' ? 'event_available' : 'payments'}</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-white">{n.title}</h3>
                                <span className="text-[10px] text-slate-500">{n.time}</span>
                            </div>
                            <p className="text-sm text-slate-400 mt-1">{n.message}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
            <section className="bg-[#16212b] p-6 rounded-2xl border border-[#223649]">
                <h3 className="font-bold mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">toggle_on</span> เปิด/ปิด การแจ้งเตือน</h3>
                <div className="flex flex-col gap-4">
                    {[
                        { label: 'แจ้งเตือนเมื่อเช็คอิน/เช็คเอาท์', desc: 'เตือนล่วงหน้า 30 นาทีก่อนแขกมาถึง' },
                        { label: 'แจ้งเตือนเมื่อมีการจองใหม่', desc: 'ส่งการแจ้งเตือนทันทีที่มีลูกค้าจอง' },
                        { label: 'สรุปรายได้รายวัน', desc: 'ส่งรายงานสรุปเงินเมื่อจบวัน' }
                    ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 border-b border-[#223649] last:border-0">
                            <div>
                                <p className="font-bold text-sm text-white">{item.label}</p>
                                <p className="text-xs text-slate-500">{item.desc}</p>
                            </div>
                            <div className="size-10 bg-primary/20 rounded-full flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-white transition-all"><span className="material-symbols-outlined">check</span></div>
                        </div>
                    ))}
                </div>
            </section>
            <section className="bg-[#16212b] p-6 rounded-2xl border border-[#223649]">
                <h3 className="font-bold mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">mail</span> ช่องทางการแจ้งเตือน</h3>
                <div className="flex flex-col gap-3">
                    {['In-App Push Notification', 'SMS Notification', 'Email Notification'].map(label => (
                        <label key={label} className="flex items-center gap-3 p-3 bg-[#1c2a38] rounded-xl cursor-pointer">
                            <input type="checkbox" defaultChecked className="rounded border-[#223649] text-primary focus:ring-primary" />
                            <span className="text-sm">{label}</span>
                        </label>
                    ))}
                </div>
            </section>
        </div>
      )}
    </div>
  );
};

export default AdminNotifications;
