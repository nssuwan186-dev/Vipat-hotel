import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';
import AIChat from '../components/AIChat';

const GuestHome = () => {
  const { rooms } = useHotel();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { title: 'วิพัฒน์กาลจักร', desc: 'สัมผัสบรรยากาศริมแม่น้ำโขง', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASk_XdzJdYBYLxY_HOOo79Gy_aGoVfttJHKKqlCUBAYk-Bgyi5xh9-dwWPKJAMQNRSilfPrUcaKbwesttpvaIwz4oWkfUYen3Argrkkrhm-qvaBp8-fhpDGqfbHm2rJU0N068tpHmRG2lY3NVsFsFOROozB79Uush30YmbvfU6iHMjDC__ZZVpusfIGIx_kwWVt_NN20_Jd5eJfb7Z9lfduQfnkmlHhLav-HKDJ8dK4aCmPcHqrUaOquMOErJvql4G3bgAYZPXocjj' },
    { title: 'โปรพักยาว', desc: 'ลดเพิ่ม 10% สำหรับการเข้าพัก 3 คืนขึ้นไป', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJbVHyGYOEkQpEmdY-P1hFxj1ByMuG5mEoVLtg2_OsnROohmACxm7Jk9DPdDW0mbFm4E0X9tXmjSemXkWYhdHVsyaUzaVOMZMUdTHW0VHd-O1fJEKm0G_DeJ-pQwSg21C9ZpB7Tbu-OqJIv2yn0qpZU2dniR1NslI0P_x7vMZIAa8yQ1Ek7Jokgq9qBelSWW3ov_5SCy429sDmXJPwxvvrpUrYiZMVVEAuf2AhdphN5riOtMaRhv1EXbXrbujOdimq389BaMZLxq8I' }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(s => (s + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const roomTypes = [...new Set(rooms.map(r => r.type))];
  const getRoomTypeInfo = (type) => {
    const roomsOfType = rooms.filter(r => r.type === type);
    const availableCount = roomsOfType.filter(r => r.status === 'Available').length;
    const minPrice = Math.min(...roomsOfType.map(r => r.price));
    let image = type === 'Standard' ? "https://lh3.googleusercontent.com/aida-public/AB6AXuDfoSpnFHftIQUJMNkddLiPu9HJ8phCc956JoN3XgGBB7qCA89H1ZZxd8wk8fNFWrMz2DESIJw9VElbBfZ_rEP-8oc0E-GVfIW68cB2AyUPv4nz70FpGI9n9jxD4gyqoh76VB4xyVelPSMpvIZneyIwRJMPVG2ALnS4cEdshhLzCnhCuPHHGBGjj98iXX65ojsp-gWBm1ef5A2zqoKCD_tiQ2mYtUac09pIUedG08a7QkXSQzthNS-i5FghooBlzen7Eb7T5rStJ7UG" : "https://lh3.googleusercontent.com/aida-public/AB6AXuAS_aGJO9cJsPLgFf6FR0fmQaCE2krrdHv15eme2CKdrwLG3XYYP7xHDJ4nOYmW95J0KZTjwviEKg4CH4AV2GWX1r98KY14sCGuWyMely-KlshuENemt3J1nK8z-NEysklr0N9vHM_25GbYSqZyR5Vh7SZvEi3mejUu5q6wr3pCiP86EFYeJShJY4vh9Qmxt-NBtsw15PMiDJldew-gZ5m-XG2E0SrfE3LjShW5wTtdERTcNukFKLHdKp6iliLdnK-VDyw1GZOA88F8";
    return { availableCount, minPrice, image };
  };

  return (
    <div className="flex flex-col gap-5">
      {/* 20:9 Aspect Ratio Optimized Banner */}
      <div className="relative h-[260px] md:h-[450px] w-full overflow-hidden shadow-sm">
        {slides.map((slide, idx) => (
            <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`} style={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7)), url("${slide.img}")`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div className="flex flex-col items-start justify-end h-full px-6 pb-12">
                    <h2 className="text-white text-3xl md:text-5xl font-black mb-1 drop-shadow-lg">{slide.title}</h2>
                    <p className="text-gray-200 text-sm md:text-lg opacity-90">{slide.desc}</p>
                </div>
            </div>
        ))}
        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-6 flex gap-1.5">
            {slides.map((_, i) => (
                <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-6 bg-primary' : 'w-1.5 bg-white/40'}`}></div>
            ))}
        </div>
      </div>

      <div className="px-4 md:px-10 max-w-7xl mx-auto w-full flex flex-col gap-8">
        
        {/* Modern Floating Search Bar */}
        <div className="bg-white dark:bg-surface-dark -mt-10 relative z-30 p-2 rounded-[24px] shadow-2xl border border-slate-100 dark:border-[#223649]">
            <div className="flex flex-row items-center gap-1.5">
                <div className="flex-1 flex items-center gap-2.5 bg-slate-50 dark:bg-[#1c2a38] px-4 py-3 rounded-[18px] active:bg-slate-100 dark:active:bg-[#25364a] transition-colors">
                    <span className="material-symbols-outlined text-primary text-[20px]">calendar_today</span>
                    <div className="flex flex-col">
                        <span className="text-[8px] font-bold text-slate-400 uppercase leading-none">วันที่เช็คอิน</span>
                        <span className="text-[11px] font-bold mt-0.5">เลือกวันที่</span>
                    </div>
                </div>
                <div className="flex-1 flex items-center gap-2.5 bg-slate-50 dark:bg-[#1c2a38] px-4 py-3 rounded-[18px] active:bg-slate-100 dark:active:bg-[#25364a] transition-colors">
                    <span className="material-symbols-outlined text-primary text-[20px]">group</span>
                    <div className="flex flex-col">
                        <span className="text-[8px] font-bold text-slate-400 uppercase leading-none">ผู้เข้าพัก</span>
                        <span className="text-[11px] font-bold mt-0.5">2 ท่าน</span>
                    </div>
                </div>
                <button className="bg-primary text-white size-12 rounded-[18px] flex items-center justify-center shadow-lg shadow-primary/30 active:scale-90 transition-transform">
                    <span className="material-symbols-outlined font-bold">search</span>
                </button>
            </div>
        </div>

        {/* Categories / Amenities (Smaller & Sharper) */}
        <div className="grid grid-cols-4 gap-3">
            {[
                { icon: 'wifi', title: 'Free Wi-Fi' },
                { icon: 'near_me', title: 'ใจกลางเมือง' },
                { icon: 'local_parking', title: 'ที่จอดรถ' },
                { icon: 'headset_mic', title: 'บริการ 24 ชม.' }
            ].map((f, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                    <div className="size-12 rounded-2xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-border-dark flex items-center justify-center shadow-sm active:scale-95 transition-all">
                        <span className="material-symbols-outlined text-[22px] text-primary">{f.icon}</span>
                    </div>
                    <span className="font-bold text-[9px] text-slate-500 uppercase tracking-tighter text-center">{f.title}</span>
                </div>
            ))}
        </div>

        {/* Room Grid (Tight 2-column layout) */}
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center px-1">
                <h2 className="text-xl font-black tracking-tight">ห้องพักยอดนิยม</h2>
                <button className="text-primary text-xs font-bold">ดูทั้งหมด</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {roomTypes.map(type => {
                    const info = getRoomTypeInfo(type);
                    return (
                        <div key={type} className="bg-white dark:bg-surface-dark rounded-[28px] overflow-hidden border border-slate-100/50 dark:border-[#223649] shadow-md flex flex-col active:scale-[0.97] transition-all duration-200">
                            <div className="h-36 overflow-hidden relative">
                                <img src={info.image} className="w-full h-full object-cover" />
                                <div className="absolute top-2.5 left-2.5 bg-black/40 backdrop-blur-md text-white text-[9px] font-bold px-2 py-1 rounded-full border border-white/20 uppercase tracking-widest">
                                    ว่าง {info.availableCount}
                                </div>
                            </div>
                            <div className="p-4 flex-1 flex flex-col gap-3">
                                <div>
                                    <h3 className="text-sm font-black truncate">{type}</h3>
                                    <div className="flex items-baseline gap-0.5 mt-1">
                                        <span className="text-[10px] text-slate-400 font-bold">฿</span>
                                        <span className="text-lg font-black text-primary">{info.minPrice}</span>
                                        <span className="text-[9px] text-slate-400 font-medium ml-0.5">/คืน</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => navigate(`/book/${rooms.find(r => r.type === type && r.status === 'Available')?.id}`)} 
                                    className="w-full py-2.5 bg-primary text-white rounded-[14px] text-xs font-bold shadow-lg shadow-primary/20 active:brightness-90 transition-all"
                                >
                                    จองทันที
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
      </div>
      <AIChat />
    </div>
  );
};

export default GuestHome;