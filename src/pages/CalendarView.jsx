import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';

const CalendarView = () => {
  const navigate = useNavigate();
  const { transactions, rooms, updateBooking, cancelBooking } = useHotel();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedBooking, setSelectedBooking] = useState(null); // For Modal

  // Helper: Get days in month
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  // Helper: Check if a booking spans a specific date
  const isBookingOnDate = (booking, date) => {
    if (!booking.checkIn || !booking.checkOut) return false;
    const checkIn = new Date(booking.checkIn);
    checkIn.setHours(0,0,0,0);
    const checkOut = new Date(booking.checkOut);
    checkOut.setHours(0,0,0,0);
    const target = new Date(date);
    target.setHours(0,0,0,0);
    return target >= checkIn && target < checkOut; 
  };

  // Filter only booking transactions
  const bookings = transactions.filter(t => t.checkIn && t.checkOut);

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updates = {
        customerName: formData.get('customerName'),
        customerPhone: formData.get('customerPhone'),
        note: formData.get('note')
    };
    updateBooking(selectedBooking.id, updates);
    setSelectedBooking(null);
  };

  const handleCancel = () => {
    if(confirm('ต้องการยกเลิกการจองนี้ใช่หรือไม่? ห้องพักจะกลับมาว่างทันที')) {
        cancelBooking(selectedBooking.id, selectedBooking.roomNo);
        setSelectedBooking(null);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty slots
    for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="bg-slate-50 dark:bg-[#1c2a38] min-h-[100px] border border-slate-200 dark:border-[#223649]"></div>);
    }

    // Days
    for (let d = 1; d <= daysInMonth; d++) {
        const currentDayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), d);
        const dayBookings = bookings.filter(b => isBookingOnDate(b, currentDayDate));

        days.push(
            <div key={d} className="bg-white dark:bg-[#16212b] min-h-[100px] p-2 border border-slate-200 dark:border-[#223649] flex flex-col gap-1 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <span className={`text-sm font-bold ${d === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() ? 'text-primary bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center' : 'text-slate-500 dark:text-slate-400'}`}>{d}</span>
                
                <div className="flex flex-col gap-1 mt-1 overflow-y-auto max-h-[100px] custom-scrollbar">
                    {dayBookings.map(booking => (
                        <button 
                            key={booking.id}
                            onClick={() => setSelectedBooking(booking)}
                            className="text-[10px] text-left px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold truncate border-l-2 border-blue-500 hover:opacity-80"
                        >
                            {booking.roomNo} - {booking.customerName}
                        </button>
                    ))}
                </div>
            </div>
        );
    }
    return days;
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white p-6 overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-3xl font-black">ปฏิทินการจอง</h1>
            <p className="text-slate-500 dark:text-[#90adcb]">จัดการตารางห้องพักแบบรายเดือน</p>
        </div>
        <div className="flex items-center gap-4 bg-white dark:bg-[#16212b] p-1 rounded-2xl border border-slate-200 dark:border-[#223649] shadow-sm">
            <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl"><span className="material-symbols-outlined">chevron_left</span></button>
            <span className="font-bold text-lg min-w-[150px] text-center">{currentDate.toLocaleDateString('th-TH', { month: 'long', year: 'numeric' })}</span>
            <button onClick={() => changeMonth(1)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl"><span className="material-symbols-outlined">chevron_right</span></button>
        </div>
      </div>

      {/* Calendar Grid Header */}
      <div className="grid grid-cols-7 text-center mb-2">
        {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map(day => (
            <div key={day} className="font-bold text-slate-500 dark:text-[#90adcb] text-sm uppercase">{day}</div>
        ))}
      </div>

      {/* Calendar Grid Body */}
      <div className="grid grid-cols-7 flex-1 overflow-y-auto rounded-xl border border-slate-200 dark:border-[#223649] shadow-sm">
        {renderCalendar()}
      </div>

      {/* Edit Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-[#16212b] w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-[#223649] animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-xl font-black">รายละเอียดการจอง</h3>
                        <p className="text-sm text-slate-500">Transaction ID: {selectedBooking.id}</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => navigate(`/invoice/${selectedBooking.id}`)} className="flex items-center gap-1 text-primary hover:bg-blue-50 px-3 py-1 rounded-lg text-sm font-bold border border-primary/20">
                            <span className="material-symbols-outlined text-[18px]">receipt_long</span> ใบเสร็จ
                        </button>
                        <button onClick={() => setSelectedBooking(null)} className="text-slate-400 hover:text-slate-600"><span className="material-symbols-outlined">close</span></button>
                    </div>
                </div>

                <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <div className="flex-1 p-3 bg-slate-50 dark:bg-[#1c2a38] rounded-xl">
                            <p className="text-xs text-slate-500">ห้องพัก</p>
                            <p className="font-bold text-lg">{selectedBooking.roomNo}</p>
                        </div>
                        <div className="flex-1 p-3 bg-slate-50 dark:bg-[#1c2a38] rounded-xl text-right">
                            <p className="text-xs text-slate-500">ราคารวม</p>
                            <p className="font-bold text-lg text-primary">฿{selectedBooking.amount.toLocaleString()}</p>
                        </div>
                    </div>

                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-bold">ชื่อลูกค้า</span>
                        <input name="customerName" defaultValue={selectedBooking.customerName} className="bg-slate-50 dark:bg-[#1c2a38] border-none rounded-xl h-10 px-4" />
                    </label>
                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-bold">เบอร์โทร</span>
                        <input name="customerPhone" defaultValue={selectedBooking.customerPhone} className="bg-slate-50 dark:bg-[#1c2a38] border-none rounded-xl h-10 px-4" />
                    </label>
                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-bold">หมายเหตุ</span>
                        <textarea name="note" defaultValue={selectedBooking.note} className="bg-slate-50 dark:bg-[#1c2a38] border-none rounded-xl p-3 h-20 resize-none" placeholder="ระบุเพิ่มเติม..." />
                    </label>

                    <div className="flex gap-3 mt-4">
                        <button type="button" onClick={handleCancel} className="flex-1 py-3 rounded-xl bg-red-50 text-red-500 font-bold hover:bg-red-100">ยกเลิกการจอง</button>
                        <button type="submit" className="flex-1 py-3 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:bg-blue-600">บันทึกแก้ไข</button>
                    </div>
                </form>
            </div>
        </div>
      )}

    </div>
  );
};

export default CalendarView;