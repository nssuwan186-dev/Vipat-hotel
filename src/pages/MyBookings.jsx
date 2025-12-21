import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MyBookings = () => {
  const bookings = [
    {
      id: 'BK-88291',
      hotelName: 'โรงแรมวิพัฒน์กาลจักร บึงกาฬ',
      roomType: 'Deluxe King Suite',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJbVHyGYOEkQpEmdY-P1hFxj1ByMuG5mEoVLtg2_OsnROohmACxm7Jk9DPdDW0mbFm4E0X9tXmjSemXkWYhdHVsyaUzaVOMZMUdTHW0VHd-O1fJEKm0G_DeJ-pQwSg21C9ZpB7Tbu-OqJIv2yn0qpZU2dniR1NslI0P_x7vMZIAa8yQ1Ek7Jokgq9qBelSWW3ov_5SCy429sDmXJPwxvvrpUrYiZMVVEAuf2AhdphN5riOtMaRhv1EXbXrbujOdimq389BaMZLxq8I',
      dates: '12 ต.ค. 2566 - 14 ต.ค. 2566 (2 คืน)',
      price: 4500,
      status: 'ยืนยันแล้ว',
      statusClass: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300',
      icon: 'check_circle'
    },
    {
      id: 'BK-88305',
      hotelName: 'โรงแรมวิพัฒน์กาลจักร บึงกาฬ',
      roomType: 'Standard Twin Room',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAS_aGJO9cJsPLgFf6FR0fmQaCE2krrdHv15eme2CKdrwLG3XYYP7xHDJ4nOYmW95J0KZTjwviEKg4CH4AV2GWX1r98KY14sCGuWyMely-KlshuENemt3J1nK8z-NEysklr0N9vHM_25GbYSqZyR5Vh7SZvEi3mejUu5q6wr3pCiP86EFYeJShJY4vh9Qmxt-NBtsw15PMiDJldew-gZ5m-XG2E0SrfE3LjShW5wTtdERTcNukFKLHdKp6iliLdnK-VDyw1GZOA88F8',
      dates: '20 พ.ย. 2566 - 22 พ.ย. 2566 (2 คืน)',
      price: 2800,
      status: 'รอชำระเงิน',
      statusClass: 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300',
      icon: 'pending'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display">
      <Navbar />
      
      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">ประวัติการจอง</h1>
            <p className="text-base text-slate-500 dark:text-text-secondary">จัดการและดูรายละเอียดการเข้าพักของคุณ</p>
          </div>

          {/* Tabs */}
          <div className="border-b border-slate-200 dark:border-border-dark">
            <nav className="-mb-px flex space-x-8">
              <a href="#" className="border-primary text-primary border-b-2 py-4 px-1 text-sm font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">event_upcoming</span> การจองที่กำลังมาถึง
              </a>
              <a href="#" className="border-transparent text-slate-500 dark:text-text-secondary hover:text-slate-700 dark:hover:text-white border-b-2 py-4 px-1 text-sm font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">history</span> ประวัติการจอง
              </a>
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="group relative flex flex-col md:flex-row overflow-hidden rounded-xl bg-white dark:bg-surface-dark shadow-sm border border-slate-200 dark:border-border-dark hover:shadow-md transition-shadow">
                <div className="relative h-48 md:h-auto md:w-64 shrink-0 overflow-hidden">
                  <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{backgroundImage: `url('${booking.image}')`}}></div>
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold shadow-sm backdrop-blur-sm ${booking.statusClass}`}>
                      <span className="material-symbols-outlined text-[14px]">{booking.icon}</span>
                      {booking.status}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-xs font-medium text-slate-500 dark:text-text-secondary tracking-wide uppercase">หมายเลขการจอง #{booking.id}</p>
                      <span className="material-symbols-outlined text-slate-300">more_vert</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight group-hover:text-primary transition-colors">{booking.hotelName}</h3>
                    <p className="text-sm font-medium text-slate-600 dark:text-gray-300">{booking.roomType}</p>
                    <div className="mt-3 flex items-center gap-2 text-sm text-slate-500 dark:text-text-secondary">
                      <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                      <span>{booking.dates}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 dark:border-border-dark pt-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 dark:text-text-secondary">ราคารวม</span>
                      <span className="text-lg font-bold text-primary">฿{booking.price.toLocaleString()}</span>
                    </div>
                    <div className="flex gap-3">
                       <button className="text-sm font-medium text-slate-500 dark:text-gray-400 hover:text-red-500 px-3 py-2 transition-colors">ยกเลิก</button>
                       <button className="flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-bold text-slate-900 dark:text-white shadow-sm hover:bg-blue-600 transition-all">
                         ดูรายละเอียด
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyBookings;