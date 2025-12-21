import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';
import AIChat from '../components/AIChat';

const GuestHome = () => {
  const { rooms } = useHotel();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { title: 'วิพัฒน์กาลจักร', desc: 'พักผ่อนสบาย สไตล์พรีเมียม', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASk_XdzJdYBYLxY_HOOo79Gy_aGoVfttJHKKqlCUBAYk-Bgyi5xh9-dwWPKJAMQNRSilfPrUcaKbwesttpvaIwz4oWkfUYen3Argrkkrhm-qvaBp8-fhpDGqfbHm2rJU0N068tpHmRG2lY3NVsFsFOROozB79Uush30YmbvfU6iHMjDC__ZZVpusfIGIx_kwWVt_NN20_Jd5eJfb7Z9lfduQfnkmlHhLav-HKDJ8dK4aCmPcHqrUaOquMOErJvql4G3bgAYZPXocjj' },
    { title: 'เริ่มต้นเพียง 400.-', desc: 'คุ้มค่าที่สุดในบึงกาฬ', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJbVHyGYOEkQpEmdY-P1hFxj1ByMuG5mEoVLtg2_OsnROohmACxm7Jk9DPdDW0mbFm4E0X9tXmjSemXkWYhdHVsyaUzaVOMZMUdTHW0VHd-O1fJEKm0G_DeJ-pQwSg21C9ZpB7Tbu-OqJIv2yn0qpZU2dniR1NslI0P_x7vMZIAa8yQ1Ek7Jokgq9qBelSWW3ov_5SCy429sDmXJPwxvvrpUrYiZMVVEAuf2AhdphN5riOtMaRhv1EXbXrbujOdimq389BaMZLxq8I' }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(s => (s + 1) % slides.length), 5000);
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
    <div className="flex flex-col gap-4">
      {/* 1. Ultra Compact Banner */}
      <div className="relative h-[240px] md:h-[400px] w-full overflow-hidden">
        {slides.map((slide, idx) => (
            <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`} style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.7)), url("${slide.img}")`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div className="flex flex-col items-start justify-end h-full px-5 pb-10">
                    <h2 className="text-white text-2xl md:text-5xl font-black mb-0.5">{slide.title}</h2>
                    <p className="text-gray-200 text-xs md:text-lg opacity-90">{slide.desc}</p>
                </div>
            </div>
        ))}
      </div>

      <div className="px-3 md:px-10 max-w-7xl mx-auto w-full flex flex-col gap-6">
        
        {/* 2. Floating Quick Search */}
        <div className="bg-white dark:bg-slate-900 -mt-8 relative z-30 p-1.5 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
            <div className="flex flex-row items-center gap-1">
                <div className="flex-1 flex items-center gap-2 bg-slate-50 dark:bg-black/20 px-3 py-2 rounded-xl active:bg-slate-100">
                    <span className="material-symbols-outlined text-primary text-[18px]">calendar_today</span>
                    <span className="text-slate-900 dark:text-white text-[10px] font-black uppercase">เช็คอิน</span>
                </div>
                <button onClick={() => navigate('/booking')} className="bg-primary text-white size-10 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 active:scale-95">
                    <span className="material-symbols-outlined font-black text-[20px]">search</span>
                </button>
            </div>
        </div>

        {/* 3. Room Cards (Clean & Small) */}
        <div className="flex flex-col gap-3">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 px-1">ห้องพักแนะนำ</h3>
            <div className="grid grid-cols-2 gap-3">
                {roomTypes.map(type => {
                    const info = getRoomTypeInfo(type);
                    return (
                        <div key={type} onClick={() => navigate(`/book/${rooms.find(r => r.type === type && r.status === 'Available')?.id}`)} className="bg-white dark:bg-[#111827] rounded-[1.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col active:scale-[0.97] transition-all">
                            <div className="h-28 overflow-hidden relative">
                                <img src={info.image} className="w-full h-full object-cover" />
                                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase">
                                    ว่าง {info.availableCount}
                                </div>
                            </div>
                            <div className="p-3">
                                <h3 className="text-slate-900 dark:text-white text-xs font-black truncate">{type}</h3>
                                <div className="flex items-baseline gap-0.5 mt-1.5">
                                    <span className="text-[8px] text-primary font-black">฿</span>
                                    <span className="text-sm font-black text-primary">{info.minPrice}</span>
                                    <span className="text-[7px] text-slate-400 font-bold ml-0.5">/คืน</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* 4. Amenities (Super Small) */}
        <div className="grid grid-cols-4 gap-2 py-2">
            {['wifi', 'location_on', 'local_parking', 'support_agent'].map(icon => (
                <div key={icon} className="flex flex-col items-center gap-1">
                    <div className="size-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary active:bg-primary active:text-white transition-all">
                        <span className="material-symbols-outlined text-[20px]">{icon}</span>
                    </div>
                </div>
            ))}
        </div>

      </div>
      <AIChat />
    </div>
  );
};

export default GuestHome;
